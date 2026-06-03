import { useState, useEffect, useRef } from "react";
import defaultSubjectData from "./data/mcs231.json";
import { storage } from "./storage";
import HomeScreen from "./screens/HomeScreen";
import SubjectScreen from "./screens/SubjectScreen";
import BuilderScreen from "./screens/BuilderScreen";
import Toast, { showSuccessToast, showErrorToast } from "./components/Toast";
import Dialog, { showConfirmDialog, showErrorDialog } from "./components/Dialog";

export default function App() {
  const [screen, setScreen] = useState("home"); // "home" | "subject" | "builder"
  const [theme, setTheme] = useState("light");
  const [subjectsList, setSubjectsList] = useState([defaultSubjectData]);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  // Load configuration and data on mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        // 1. Theme
        const cachedTheme = await storage.get("studymate_theme");
        if (cachedTheme) {
          setTheme(cachedTheme);
        } else {
          setTheme("light");
        }

        // 2. Groq key
        const cachedApiKey = await storage.get("studymate_groq_key");
        if (cachedApiKey) {
          setApiKey(cachedApiKey);
        }

        // 3. Subjects list
        const cachedSubjects = await storage.get("studymate_subjects_list");
        if (cachedSubjects) {
          setSubjectsList(JSON.parse(cachedSubjects));
        } else {
          // First run: Seed default subject data
          await storage.set("studymate_subjects_list", JSON.stringify([defaultSubjectData]));
          setSubjectsList([defaultSubjectData]);
        }

        // 4. Active subject index
        const cachedIdx = await storage.get("studymate_active_subject_idx");
        if (cachedIdx !== null) {
          setActiveSubjectIndex(parseInt(cachedIdx, 10));
        }

        // 5. Studied progress
        const cachedProgress = await storage.get("studymate_progress");
        if (cachedProgress) {
          setProgress(JSON.parse(cachedProgress));
        }
      } catch (err) {
        console.error("Storage Initialization Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    loadStoredData();
  }, []);

  // Sync theme to document element and storage
  useEffect(() => {
    if (loading) return;
    document.documentElement.setAttribute("data-theme", theme);
    storage.set("studymate_theme", theme);
  }, [theme, loading]);

  // Sync apiKey to storage
  const handleSaveApiKey = (key) => {
    setApiKey(key);
    storage.set("studymate_groq_key", key);
    showSuccessToast("API Key Saved");
  };

  // Sync subjects & active index to storage
  useEffect(() => {
    if (loading) return;
    storage.set("studymate_subjects_list", JSON.stringify(subjectsList));
    storage.set("studymate_active_subject_idx", activeSubjectIndex.toString());
  }, [subjectsList, activeSubjectIndex, loading]);

  // Hardware Back Button lifecycle for Capacitor
  useEffect(() => {
    let backButtonListener = null;

    const setupBackButton = async () => {
      try {
        const { App: CapApp } = await import("@capacitor/app");
        backButtonListener = await CapApp.addListener("backButton", () => {
          if (screen === "subject" || screen === "builder") {
            setScreen("home");
          } else {
            CapApp.exitApp();
          }
        });
      } catch (e) {
        // App plugin not available/loaded (e.g. running in browser)
        console.log("Hardware back button listener skipped: running in browser.");
      }
    };

    setupBackButton();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [screen]);

  // Handle studied toggle
  const toggleStudied = (subjectCode, questionN) => {
    setProgress((prev) => {
      const subj = prev[subjectCode] || {};
      const updated = {
        ...prev,
        [subjectCode]: {
          ...subj,
          [questionN]: !subj[questionN],
        },
      };
      storage.set("studymate_progress", JSON.stringify(updated));
      return updated;
    });
  };

  // Handle subject generation/imports
  const handleSubjectGenerated = (newSubject) => {
    setSubjectsList((prev) => {
      const existsIdx = prev.findIndex((s) => s.subjectCode === newSubject.subjectCode);
      let updated;
      if (existsIdx > -1) {
        updated = [...prev];
        updated[existsIdx] = newSubject;
        setActiveSubjectIndex(existsIdx);
      } else {
        updated = [...prev, newSubject];
        setActiveSubjectIndex(prev.length);
      }
      return updated;
    });
    setScreen("subject");
  };

  // Delete subject
  const handleDeleteSubject = (e, indexToDelete) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (subjectsList.length === 1) {
      showErrorDialog("Delete Subject", "Cannot delete the only subject.");
      return;
    }
    const newList = subjectsList.filter((_, idx) => idx !== indexToDelete);
    setSubjectsList(newList);
    if (activeSubjectIndex >= newList.length) {
      setActiveSubjectIndex(newList.length - 1);
    } else if (activeSubjectIndex === indexToDelete) {
      setActiveSubjectIndex(Math.max(0, indexToDelete - 1));
    }
    showSuccessToast("Subject Deleted");
  };

  // Reset cache settings option
  const handleResetCache = () => {
    showConfirmDialog("Are you sure you want to reset all data?", async () => {
      await storage.clear();
      setSubjectsList([defaultSubjectData]);
      setActiveSubjectIndex(0);
      setTheme("light");
      setApiKey("");
      setProgress({});
      setScreen("home");
      setShowSettings(false);
      showSuccessToast("Application data reset successfully!");
    });
  };

  // Native File Picker JSON Upload (Android WebView compatible)
  const importSubjectJson = async () => {
    try {
      const { FilePicker } = await import("@capawesome/capacitor-file-picker");
      const result = await FilePicker.pickFiles({
        types: ["application/json"],
        multiple: false,
        readData: true,
      });

      if (!result.files || !result.files.length) return;

      const file = result.files[0];
      const jsonString = atob(file.data); // Decode base64 data returned
      const parsed = JSON.parse(jsonString);

      validateAndImport(parsed);
    } catch (err) {
      showErrorToast("Failed to read file: " + err.message);
    }
  };

  const validateAndImport = (parsed) => {
    const errors = [];

    if (!parsed.subjectName) errors.push("Missing 'subjectName'");
    if (!parsed.subjectCode) errors.push("Missing 'subjectCode'");
    if (!parsed.questions || !Array.isArray(parsed.questions)) errors.push("Missing 'questions' array");
    if (parsed.questions?.length === 0) errors.push("'questions' array is empty");

    if (errors.length > 0) {
      showErrorDialog("Invalid JSON Schema", errors.join("\n"));
      return;
    }

    const formatted = {
      subjectCode: parsed.subjectCode || "SUBJ",
      subjectName: parsed.subjectName,
      subjectTitle: parsed.subjectTitle || parsed.subjectName,
      description: parsed.description || "Uploaded Custom Subject Study Guide.",
      stats: parsed.stats || [
        { value: parsed.questions.length.toString(), label: "Questions" },
        { value: "Uploaded", label: "Source" },
      ],
      categories: parsed.categories || [{ id: "all", label: "All" }],
      papers: parsed.papers || [],
      questions: parsed.questions.map((q, idx) => ({
        n: q.n || idx + 1,
        hot: !!q.hot,
        cat: q.cat || "general",
        unit: q.unit || "Core",
        text: q.text || "Untitled Question",
        papers: q.papers || [],
        freq: q.freq || 1,
        answer: q.answer || "",
        diagram: q.diagram || null,
      })),
      quiz: parsed.quiz || [],
    };

    if (!parsed.categories) {
      const units = Array.from(new Set(formatted.questions.map((q) => q.cat)));
      formatted.categories = [
        { id: "all", label: "All" },
        { id: "hot", label: "🔥 High Priority" },
        ...units.map((unit) => ({ id: unit, label: unit.charAt(0).toUpperCase() + unit.slice(1) })),
      ];
    }

    handleSubjectGenerated(formatted);
    showSuccessToast(`Imported: ${formatted.subjectName}`);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flex: 1, height: "100vh", alignItems: "center", justifyContent: "center", background: "var(--color-bg-body)", color: "var(--color-text-secondary)" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span className="spin" style={{ display: "inline-block", fontSize: "20px" }}>⟳</span>
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>Loading StudyMate...</span>
        </div>
      </div>
    );
  }

  const subject = subjectsList[activeSubjectIndex] || defaultSubjectData;

  return (
    <>
      {screen === "home" && (
        <HomeScreen
          subjectsList={subjectsList}
          activeSubjectIndex={activeSubjectIndex}
          setActiveSubjectIndex={setActiveSubjectIndex}
          setScreen={setScreen}
          theme={theme}
          setTheme={setTheme}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          progress={progress}
          toggleStudied={toggleStudied}
          handleDeleteSubject={handleDeleteSubject}
          importSubjectJson={importSubjectJson}
          handleResetCache={handleResetCache}
          apiKey={apiKey}
          handleSaveApiKey={handleSaveApiKey}
        />
      )}

      {screen === "subject" && (
        <SubjectScreen
          subject={subject}
          apiKey={apiKey}
          theme={theme}
          setTheme={setTheme}
          setScreen={setScreen}
          progress={progress}
          toggleStudied={toggleStudied}
          handleSubjectGenerated={handleSubjectGenerated}
        />
      )}

      {screen === "builder" && (
        <BuilderScreen
          apiKey={apiKey}
          onSubjectGenerated={handleSubjectGenerated}
          setScreen={setScreen}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      <Toast />
      <Dialog />
    </>
  );
}
