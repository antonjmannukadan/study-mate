import { useState, useRef, useEffect } from "react";
import { showConfirmDialog, showErrorDialog } from "../components/Dialog";
import { showSuccessToast, showErrorToast } from "../components/Toast";

export default function HomeScreen({
  subjectsList,
  activeSubjectIndex,
  setActiveSubjectIndex,
  setScreen,
  theme,
  setTheme,
  showSettings,
  setShowSettings,
  progress,
  toggleStudied,
  handleDeleteSubject,
  importSubjectJson,
  handleResetCache,
  apiKey,
  handleSaveApiKey
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [longPressActive, setLongPressActive] = useState(null);
  const pressTimer = useRef(null);

  // Default bundled category
  const categories = [
    {
      id: "ignou-mca",
      label: "IGNOU MCA",
      subjectCodes: ["MCS-231"]
    }
  ];

  // Group subjects by category. Uncategorized ones can go in a general category.
  const uncategorizedSubjects = subjectsList.filter(sub => {
    return !categories.some(cat => cat.subjectCodes.includes(sub.subjectCode));
  });

  const handleStartPress = (index) => {
    pressTimer.current = setTimeout(() => {
      setLongPressActive(index);
      if (subjectsList.length > 1) {
        showConfirmDialog(`Delete "${subjectsList[index].subjectName}"?`, () => {
          handleDeleteSubject({ stopPropagation: () => {} }, index);
        });
      }
    }, 600);
  };

  const handleCancelPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  const getStudiedCount = (sub) => {
    const subProgress = progress[sub.subjectCode] || {};
    return sub.questions.filter(q => subProgress[q.n]).length;
  };

  const renderSubjectCard = (sub, idx) => {
    const studiedCount = getStudiedCount(sub);
    const totalQuestions = sub.questions.length;
    const progressPercent = totalQuestions > 0 ? (studiedCount / totalQuestions) * 100 : 0;
    const hotCount = sub.questions.filter(q => q.hot).length;

    return (
      <div
        key={sub.subjectCode + "-" + idx}
        className="glass-card"
        onTouchStart={() => handleStartPress(idx)}
        onTouchEnd={handleCancelPress}
        onMouseDown={() => handleStartPress(idx)}
        onMouseUp={handleCancelPress}
        onMouseLeave={handleCancelPress}
        onClick={() => {
          setActiveSubjectIndex(idx);
          setScreen("subject");
        }}
        style={{
          background: "var(--color-background-primary)",
          border: "1px solid var(--color-border-secondary)",
          borderRadius: "16px",
          padding: "18px",
          position: "relative",
          cursor: "pointer",
          marginBottom: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: "var(--color-shadow)"
        }}
      >
        {/* Delete (X) icon in top-right */}
        {subjectsList.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              showConfirmDialog(`Delete "${sub.subjectName}"?`, () => {
                handleDeleteSubject(e, idx);
              });
            }}
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "none",
              background: "var(--color-background-secondary)",
              color: "var(--color-text-tertiary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              cursor: "pointer",
              zIndex: 5
            }}
          >
            ×
          </button>
        )}

        {/* Top row with code and title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingRight: subjectsList.length > 1 ? "24px" : "0" }}>
          <span
            style={{
              background: "var(--color-accent-soft)",
              color: "var(--color-accent)",
              padding: "4px 8px",
              borderRadius: "8px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.05em"
            }}
          >
            {sub.subjectCode}
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {sub.subjectName}
          </span>
        </div>

        {/* Subject Title */}
        <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "-4px" }}>
          {sub.subjectTitle}
        </div>

        {/* Progress bar and label */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--color-text-tertiary)" }}>
            <span>Progress</span>
            <span style={{ fontWeight: 600 }}>{studiedCount}/{totalQuestions} Studied ({Math.round(progressPercent)}%)</span>
          </div>
          <div style={{ width: "100%", height: "5px", background: "var(--color-background-secondary)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "var(--color-accent)", borderRadius: "10px", transition: "width 0.3s ease" }}></div>
          </div>
        </div>

        {/* Bottom row: High priority badges */}
        {hotCount > 0 && (
          <div style={{ display: "flex", marginTop: "4px" }}>
            <span
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "12px",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              🔥 {hotCount} high priority
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--color-bg-body)" }}>
      {/* Header Bar */}
      <header
        style={{
          height: "56px",
          background: "var(--color-header-gradient)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <h1 style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "0.02em" }}>StudyMate</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button
            onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: "18px",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: "18px",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Main content scroll area */}
      <main className="scroll-container" style={{ flex: 1, padding: "20px" }}>
        {/* Categories Section */}
        {categories.map(cat => {
          const matchingSubjects = subjectsList.filter(sub => cat.subjectCodes.includes(sub.subjectCode));
          if (matchingSubjects.length === 0) return null;

          return (
            <div key={cat.id} style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "var(--color-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                  paddingLeft: "4px"
                }}
              >
                {cat.label}
              </h3>
              {matchingSubjects.map(sub => {
                const globalIndex = subjectsList.findIndex(s => s.subjectCode === sub.subjectCode);
                return renderSubjectCard(sub, globalIndex);
              })}
            </div>
          );
        })}

        {/* Custom Uncategorized Subjects */}
        {uncategorizedSubjects.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "12px",
                paddingLeft: "4px"
              }}
            >
              Custom Subjects
            </h3>
            {uncategorizedSubjects.map(sub => {
              const globalIndex = subjectsList.findIndex(s => s.subjectCode === sub.subjectCode);
              return renderSubjectCard(sub, globalIndex);
            })}
          </div>
        )}

        {/* Buttons section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px", marginBottom: "32px" }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "12px",
              border: "2px dashed var(--color-border-tertiary)",
              background: "transparent",
              color: "var(--color-text-secondary)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
          >
            ➕ Add Subject
          </button>

          <button
            onClick={() => setScreen("builder")}
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "12px",
              border: "1px solid var(--color-border-secondary)",
              background: "var(--color-accent-soft)",
              color: "var(--color-accent)",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
          >
            ✨ AI Subject Builder
          </button>
        </div>
      </main>

      {/* Add Subject Choice Modal (Bottom Sheet style) */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(11, 15, 25, 0.6)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 1500,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            animation: "fadeIn 0.2s ease"
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              backgroundColor: "var(--color-background-primary)",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              padding: "24px",
              boxShadow: "0 -8px 24px rgba(0,0,0,0.15)",
              animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-primary)" }}>Add New Subject</h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  color: "var(--color-text-tertiary)",
                  cursor: "pointer"
                }}
              >
                ×
              </button>
            </div>

            <button
              onClick={() => {
                setShowAddModal(false);
                importSubjectJson();
              }}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid var(--color-border-secondary)",
                background: "var(--color-background-secondary)",
                color: "var(--color-text-primary)",
                fontSize: "14px",
                fontWeight: 600,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
            >
              📥 Import JSON File
            </button>

            <button
              onClick={() => {
                setShowAddModal(false);
                setScreen("builder");
              }}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid var(--color-border-secondary)",
                background: "var(--color-background-secondary)",
                color: "var(--color-text-primary)",
                fontSize: "14px",
                fontWeight: 600,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
            >
              ✨ Generate with AI Subject Builder
            </button>
          </div>
        </div>
      )}

      {/* Global Settings Panel Modal */}
      {showSettings && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(11, 15, 25, 0.6)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 1600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease"
          }}
          onClick={() => setShowSettings(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "360px",
              backgroundColor: "var(--color-background-primary)",
              border: "1px solid var(--color-border-secondary)",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
              animation: "scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-primary)" }}>Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  color: "var(--color-text-tertiary)",
                  cursor: "pointer"
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase" }}>Groq API Key</label>
              <input
                type="password"
                defaultValue={apiKey}
                placeholder="Enter Groq API Key"
                onBlur={(e) => handleSaveApiKey(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--color-border-secondary)",
                  background: "var(--color-background-secondary)",
                  color: "var(--color-text-primary)",
                  fontSize: "13px"
                }}
              />
              <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>Used for AI simplification & instant subject builder.</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid var(--color-border-secondary)", paddingTop: "18px" }}>
              <button
                onClick={handleResetCache}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ef4444",
                  background: "rgba(239, 68, 68, 0.05)",
                  color: "#ef4444",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                🗑️ Reset Application Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
