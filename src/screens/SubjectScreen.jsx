import { useState, useMemo, useEffect, useRef } from "react";
import { showErrorDialog } from "../components/Dialog";
import { showSuccessToast, showErrorToast } from "../components/Toast";

/* ── Dynamic Mermaid Diagram Renderer ── */
function MermaidDiagram({ chart, qn, theme }) {
  const [svgContent, setSvgContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    const renderChart = async () => {
      try {
        const { default: mermaid } = await import("https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs");
        
        const themeVariables = theme === "dark" ? {
          background: "#1e293b",
          primaryColor: "#1e293b",
          primaryTextColor: "#f8fafc",
          primaryBorderColor: "#475569",
          lineColor: "#818cf8",
          secondaryColor: "#312e81",
          tertiaryColor: "#1e1b4b",
          nodeBorder: "#475569",
          mainBkg: "#1e293b"
        } : {
          background: "#ffffff",
          primaryColor: "#f8fafc",
          primaryTextColor: "#0f172a",
          primaryBorderColor: "#cbd5e1",
          lineColor: "#6366f1",
          secondaryColor: "#e0e7ff",
          tertiaryColor: "#f1f5f9",
          nodeBorder: "#cbd5e1",
          mainBkg: "#ffffff"
        };

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables,
          fontFamily: "Outfit, sans-serif",
          fontSize: 13,
          securityLevel: "loose",
        });

        const cleanChart = chart.trim();
        const id = `mermaid-chart-q${qn}-${Math.random().toString(36).substring(2, 9)}`;
        
        const { svg } = await mermaid.render(id, cleanChart);
        
        if (isMounted) {
          setSvgContent(svg);
          setLoading(false);
        }
      } catch (err) {
        console.error("Mermaid Render Error:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart, qn, theme]);

  if (error) {
    return (
      <div className="diagram-error" style={{ padding: "12px", border: "1px dashed var(--color-border-tertiary)", borderRadius: "8px", margin: "12px 0", fontSize: "12px", color: "#993c1d" }}>
        ⚠️ Could not render diagram automatically. Diagram source:<br />
        <pre style={{ marginTop: "6px", fontFamily: "monospace", overflowX: "auto", fontSize: "11px" }}>{chart}</pre>
      </div>
    );
  }

  const controlButtonStyle = {
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: 600,
    borderRadius: "20px",
    cursor: "pointer",
    background: "var(--color-background-primary)",
    color: "var(--color-text-primary)",
    border: "1px solid var(--color-border-secondary)",
    transition: "all 0.2s"
  };

  return (
    <>
      <div 
        onClick={() => setIsLightboxOpen(true)}
        title="Click to zoom / view fullscreen"
        className="glass-card"
        style={{ 
          margin: "14px 0", 
          padding: "16px", 
          background: "var(--color-background-primary)", 
          borderRadius: 12, 
          border: "1px solid var(--color-border-secondary)", 
          overflowX: "auto", 
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
          cursor: "zoom-in",
          position: "relative"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>📊 Diagram Visualization</div>
          <div style={{ fontSize: 10, color: "var(--color-accent)", display: "flex", alignItems: "center", gap: 3, fontWeight: 500 }}>
            🔍 Click to Expand
          </div>
        </div>
        
        {loading ? (
          <div style={{ minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span className="spin" style={{ display: "inline-block", fontSize: "16px" }}>⟳</span>
            <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>Rendering diagram...</span>
          </div>
        ) : (
          <div className="mermaid-diagram-svg" dangerouslySetInnerHTML={{ __html: svgContent }} style={{ display: "flex", justifyContent: "center" }} />
        )}
      </div>

      {/* Lightbox Modal overlay */}
      {isLightboxOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(11, 15, 25, 0.8)",
          backdropFilter: "blur(12px)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          {/* Controls Bar */}
          <div className="glass-panel" style={{
            display: "flex",
            gap: 12,
            padding: "10px 20px",
            borderRadius: 30,
            marginBottom: 20,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            zIndex: 1001
          }}>
            <button onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(3, z + 0.2)); }} style={controlButtonStyle}>➕ Zoom In</button>
            <button onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(0.4, z - 0.2)); }} style={controlButtonStyle}>➖ Zoom Out</button>
            <button onClick={(e) => { e.stopPropagation(); setZoom(1); }} style={controlButtonStyle}>🔄 Reset</button>
            <button onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); setZoom(1); }} style={{ ...controlButtonStyle, background: "#ef4444", color: "#fff", border: "none" }}>✖ Close</button>
          </div>

          {/* SVG Frame */}
          <div 
            onClick={() => { setIsLightboxOpen(false); setZoom(1); }}
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
              borderRadius: 16,
              padding: 20,
              background: "var(--color-background-primary)",
              border: "1px solid var(--color-border-secondary)"
            }}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="mermaid-diagram-svg" 
              dangerouslySetInnerHTML={{ __html: svgContent }} 
              style={{ 
                transform: `scale(${zoom})`, 
                transformOrigin: "center", 
                transition: "transform 0.15s ease-out",
                maxHeight: "90%",
                maxWidth: "90%"
              }} 
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ── Plain English Explanation Panel ── */
function PlainEnglishPanel({ data, onClose, loading }) {
  if (loading) return (
    <div style={{ margin: "14px 0", padding: "20px", background: "var(--color-background-info)", borderRadius: 12, border: "1px solid var(--color-border-info)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--color-text-info)", fontSize: 13, fontWeight: 500 }}>
        <span className="spin" style={{ display: "inline-block", fontSize: "16px" }}>⟳</span> Simplifying complex technical terms via AI...
      </div>
    </div>
  );
  if (!data) return null;

  return (
    <div style={{ margin: "14px 0", padding: "20px", background: "var(--color-background-info)", borderRadius: 12, border: "1px solid var(--color-border-info)", position: "relative" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 12, right: 14, fontSize: 20, border: "none", background: "transparent", color: "var(--color-text-info)", cursor: "pointer", lineHeight: 1 }}>&times;</button>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-info)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>✨ Plain English Explanation</div>

      {data.whatItIs && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-info)", marginBottom: 4 }}>What it actually is:</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{data.whatItIs}</div>
        </div>
      )}

      {data.analogy && (
        <div style={{ marginBottom: 14, padding: "10px 14px", background: "rgba(255,255,255,0.4)", borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", fontStyle: "italic", lineHeight: 1.7 }}>
            💡 <strong>Analogy:</strong> {data.analogy}
          </div>
        </div>
      )}

      {data.keyThings && data.keyThings.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-info)", marginBottom: 4 }}>Key insights to grasp:</div>
          {data.keyThings.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 4 }}>
              <span>•</span><span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {data.examPoints && data.examPoints.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-info)", marginBottom: 4 }}>Cheat Sheet for Exams:</div>
          {data.examPoints.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 4 }}>
              <span>📝</span><span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Groq API calls ── */
async function callGroq(apiKey, question, answer) {
  const prompt = `You are a helpful teacher explaining study topics to a student in plain English.
  
Question: "${question}"

Answer (technical): "${answer.slice(0, 1200)}"

Return a JSON object with EXACTLY these keys:
{
  "whatItIs": "2-3 sentence plain English explanation of what this actually is",
  "analogy": "A relatable real-world analogy to help remember it",
  "keyThings": ["key insight 1", "key insight 2", "key insight 3", "key insight 4"],
  "examPoints": ["exam point 1 with specific number/fact", "exam point 2", "exam point 3", "exam point 4"]
}

Be conversational and use simple analogies. Include specific numbers/facts in exam points.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "json_object" }
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Groq API error");
  }
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

async function callGroqToBuildSubject(apiKey, subjectName, subjectCode, syllabusText) {
  const systemPrompt = `You are an expert curriculum builder. Your task is to output a fully populated study guide JSON file for the subject "${subjectName}" (Code: "${subjectCode}").
Generate exactly 5 comprehensive study guide questions and answers based on the syllabus/topics provided, and exactly 5 interactive multiple-choice quiz questions.

The output must be a single raw JSON object matching this schema:
{
  "subjectCode": "String",
  "subjectName": "String",
  "subjectTitle": "String",
  "description": "String description summarizing the content",
  "stats": [
    { "value": "5", "label": "Questions" },
    { "value": "5", "label": "MCQs" }
  ],
  "categories": [
    { "id": "all", "label": "All Topics" },
    { "id": "core", "label": "Core Content" }
  ],
  "papers": ["Mock Exam"],
  "questions": [
    {
      "n": 1,
      "hot": true,
      "cat": "core",
      "unit": "Core Unit",
      "text": "Question title here?",
      "papers": ["Mock Exam"],
      "freq": 3,
      "answer": "Detailed answer in markdown formatting. Clean and formatting-heavy.",
      "diagram": "Mermaid diagram code if applicable (e.g. graph TD) or null"
    }
  ],
  "quiz": [
    {
      "question": "Question statement?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "The exact correct option string verbatim from options",
      "explanation": "Why this option is correct."
    }
  ]
}

Ensure all answers are detailed, clear, and make heavy use of bullet points and bold styling. 
Return ONLY the raw JSON block without backticks or any conversation.`;

  const userPrompt = `Generate a study guide JSON for:
Subject: ${subjectName} (${subjectCode})
Syllabus / Topics to cover:
${syllabusText}`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.6,
      max_tokens: 4000
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Groq API error");
  }
  const data = await res.json();
  const rawText = data.choices[0].message.content.trim();
  const jsonText = rawText.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
  return JSON.parse(jsonText);
}

/* ── Frequency dots indicator ── */
function FreqDots({ freq }) {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginRight: 4 }}>Seen {freq}&times;</span>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= freq ? "var(--color-border-info)" : "var(--color-border-secondary)" }} />
      ))}
    </div>
  );
}

/* ── Rich Formatted Answer ── */
function FormatAnswer({ text }) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**') && !line.slice(2,-2).includes('**')) {
      return <div key={i} style={{ fontWeight: 600, color: "var(--color-text-primary)", marginTop: i > 0 ? 14 : 0, marginBottom: 4, fontSize: 14 }}>{line.replace(/\*\*/g, '')}</div>;
    }
    if (line.match(/^\*\*[^*]+\*\*/)) {
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      return (
        <div key={i} style={{ fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)", marginBottom: 4 }}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{p}</strong> : p)}
        </div>
      );
    }
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const bulletContent = line.trim().substring(2);
      const parts = bulletContent.split(/\*\*([^*]+)\*\*/g);
      return (
        <div key={i} style={{ fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)", paddingLeft: 18, position: "relative", marginBottom: 3 }}>
          <span style={{ position: "absolute", left: 4, color: "var(--color-accent)" }}>•</span>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{p}</strong> : p)}
        </div>
      );
    }
    if (line.match(/^\d+\./)) {
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      return (
        <div key={i} style={{ fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)", paddingLeft: 18, marginBottom: 3 }}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{p}</strong> : p)}
        </div>
      );
    }
    if (line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter((_, index, arr) => index > 0 && index < arr.length - 1);
      if (cells.every(cell => cell.match(/^-+$/))) return null;
      return (
        <div key={i} style={{ display: "grid", gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: 8, padding: "8px 12px", borderBottom: "1px solid var(--color-border-secondary)", background: i % 2 === 0 ? "var(--color-background-secondary)" : "transparent" }}>
          {cells.map((cell, idx) => (
            <div key={idx} style={{ fontSize: 12, fontFamily: "monospace", color: "var(--color-text-secondary)" }}>
              {cell.replace(/\*\*/g, '')}
            </div>
          ))}
        </div>
      );
    }
    return <div key={i} style={{ fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)", marginBottom: 4 }}>{line}</div>;
  });
}

/* ── Question Accordion Item ── */
function QuestionItem({ q, apiKey, openQ, setOpenQ, theme, isStudied, onToggleStudied }) {
  const isOpen = openQ === q.n;
  const [simplifyData, setSimplifyData] = useState(null);
  const [simplifyLoading, setSimplifyLoading] = useState(false);
  const [simplifyError, setSimplifyError] = useState(null);
  const [showSimplify, setShowSimplify] = useState(false);

  const handleSimplify = async (e) => {
    e.stopPropagation();
    if (!apiKey) {
      showErrorDialog("Settings Required", "Please configure your Groq API key in Settings (⚙️ icon) first.");
      return;
    }
    if (simplifyData) {
      setShowSimplify(s => !s);
      return;
    }
    setShowSimplify(true);
    setSimplifyLoading(true);
    setSimplifyError(null);
    try {
      const data = await callGroq(apiKey, q.text, q.answer);
      setSimplifyData(data);
    } catch (err) {
      setSimplifyError(err.message);
    } finally {
      setSimplifyLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden", animation: "fadeIn 0.3s ease" }}>
      <div onClick={() => setOpenQ(isOpen ? null : q.n)} style={{ padding: "1.25rem 1.5rem", cursor: "pointer", display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-accent)", minWidth: 28, flexShrink: 0 }}>Q{q.n}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.5 }}>{q.text}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 12, background: "var(--color-background-secondary)", color: "var(--color-text-secondary)", fontWeight: 500 }}>{q.unit}</span>
            {q.hot && <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 12, background: "rgba(239, 68, 68, 0.12)", color: "#ef4444", fontWeight: 600 }}>🔥 High Priority</span>}
            <FreqDots freq={q.freq} />
          </div>
          {q.papers && q.papers.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
              {q.papers.map(p => (
                <span key={p} style={{ fontSize: 10, padding: "1px 8px", borderRadius: 8, background: "var(--color-background-secondary)", color: "var(--color-text-tertiary)", border: "1px solid var(--color-border-secondary)" }}>{p}</span>
              ))}
            </div>
          )}
        </div>
        
        {/* Studied checkbox and Arrow wrapper */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onToggleStudied(q.n)}
            style={{
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0
            }}
            title={isStudied ? "Mark as Unstudied" : "Mark as Studied"}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: isStudied ? "none" : "2px solid var(--color-border-tertiary)",
                background: isStudied ? "#10b981" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isStudied ? "#ffffff" : "transparent",
                fontSize: "12px",
                fontWeight: "bold",
                transition: "all 0.2s"
              }}
            >
              ✓
            </div>
          </button>
          
          <div 
            onClick={() => setOpenQ(isOpen ? null : q.n)}
            style={{ 
              fontSize: 18, 
              color: "var(--color-text-tertiary)", 
              transition: "transform .25s", 
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            ▾
          </div>
        </div>
      </div>

      {isOpen && (
        <div style={{ borderTop: "1px solid var(--color-border-secondary)", padding: "1.25rem 1.5rem 1.5rem 3.5rem", background: "var(--color-background-secondary)", animation: "fadeIn 0.2s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <button
              onClick={handleSimplify}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 12, padding: "8px 16px", borderRadius: 20,
                background: showSimplify && simplifyData ? "var(--color-background-info)" : "var(--color-accent)",
                color: showSimplify && simplifyData ? "var(--color-text-info)" : "var(--color-accent-text)",
                border: showSimplify && simplifyData ? "1px solid var(--color-border-info)" : "none",
                fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
              }}
            >
              ✨ {showSimplify ? "Hide Explanation" : "Explain in Plain English"}
            </button>
          </div>

          {showSimplify && (
            <PlainEnglishPanel
              data={simplifyData}
              loading={simplifyLoading}
              onClose={() => setShowSimplify(false)}
            />
          )}

          <div style={{ fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
            <FormatAnswer text={q.answer} />
          </div>

          {q.diagram && <MermaidDiagram chart={q.diagram} qn={q.n} theme={theme} />}
        </div>
      )}
    </div>
  );
}

/* ── Quiz Sub-engine (MCQs & 3D Flashcards) ── */
function QuizView({ subject, theme }) {
  const hasMcq = subject.quiz && subject.quiz.length > 0;

  // Flashcards state
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flashcardStatus, setFlashcardStatus] = useState({});

  // MCQ Quiz state
  const [mcqIdx, setMcqIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqScore, setMcqScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const resetMcqQuiz = () => {
    setMcqIdx(0);
    setSelectedOpt(null);
    setMcqSubmitted(false);
    setMcqScore(0);
    setQuizFinished(false);
  };

  const handleMcqSubmit = () => {
    if (selectedOpt === null) return;
    const currentQuizItem = subject.quiz[mcqIdx];
    if (selectedOpt === currentQuizItem.answer) {
      setMcqScore(s => s + 1);
    }
    setMcqSubmitted(true);
  };

  const handleMcqNext = () => {
    if (mcqIdx + 1 < subject.quiz.length) {
      setMcqIdx(idx => idx + 1);
      setSelectedOpt(null);
      setMcqSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleMarkMastered = (n) => {
    setFlashcardStatus(prev => ({ ...prev, [n]: "mastered" }));
    goNextCard();
  };

  const handleMarkReview = (n) => {
    setFlashcardStatus(prev => ({ ...prev, [n]: "review" }));
    goNextCard();
  };

  const goNextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      if (cardIdx + 1 < subject.questions.length) {
        setCardIdx(c => c + 1);
      } else {
        setCardIdx(0);
      }
    }, 200);
  };

  const resetFlashcards = () => {
    setCardIdx(0);
    setFlipped(false);
    setFlashcardStatus({});
  };

  const flashcardStats = useMemo(() => {
    const total = subject.questions.length;
    const mastered = Object.values(flashcardStatus).filter(v => v === "mastered").length;
    const review = Object.values(flashcardStatus).filter(v => v === "review").length;
    return { total, mastered, review, remaining: total - mastered - review };
  }, [subject, flashcardStatus]);

  if (hasMcq) {
    if (quizFinished) {
      return (
        <div className="glass-panel fade-in" style={{ borderRadius: 16, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 12 }}>Quiz Complete! 🎉</h2>
          <div style={{ margin: "24px 0" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: "var(--color-accent)" }}>
              {mcqScore} / {subject.quiz.length}
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginTop: 6 }}>
              Percentage Scored: {Math.round((mcqScore / subject.quiz.length) * 100)}%
            </p>
          </div>
          <button onClick={resetMcqQuiz} style={{ padding: "10px 24px", fontSize: 13, background: "var(--color-accent)", color: "var(--color-accent-text)", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
            🔄 Retake Quiz
          </button>
        </div>
      );
    }

    const item = subject.quiz[mcqIdx];
    return (
      <div className="glass-panel fade-in" style={{ borderRadius: 16, padding: "1.5rem", maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
          <span>MCQ Practice</span>
          <span>Question {mcqIdx + 1} of {subject.quiz.length}</span>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.5, marginBottom: 20 }}>
          {item.question}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {item.options.map(opt => {
            let optClass = "quiz-option";
            if (selectedOpt === opt) optClass += " selected";
            if (mcqSubmitted) {
              if (opt === item.answer) optClass += " correct";
              else if (selectedOpt === opt) optClass += " incorrect";
            }

            return (
              <button
                key={opt}
                disabled={mcqSubmitted}
                onClick={() => setSelectedOpt(opt)}
                className={optClass}
              >
                {opt}
                {mcqSubmitted && opt === item.answer && <span style={{ float: "right" }}>✓</span>}
                {mcqSubmitted && selectedOpt === opt && opt !== item.answer && <span style={{ float: "right" }}>&times;</span>}
              </button>
            );
          })}
        </div>

        {mcqSubmitted && (
          <div className="fade-in" style={{ padding: "14px 18px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "1px solid var(--color-border-secondary)", marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 4 }}>
              {selectedOpt === item.answer ? "🎉 Correct!" : "❌ Incorrect"}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              {item.explanation}
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {!mcqSubmitted ? (
            <button
              disabled={selectedOpt === null}
              onClick={handleMcqSubmit}
              style={{
                padding: "10px 20px", fontSize: 13, background: selectedOpt !== null ? "var(--color-accent)" : "var(--color-border-secondary)",
                color: selectedOpt !== null ? "var(--color-accent-text)" : "var(--color-text-tertiary)",
                border: "none", borderRadius: 8, fontWeight: 600, cursor: selectedOpt !== null ? "pointer" : "default"
              }}
            >
              Verify Answer
            </button>
          ) : (
            <button
              onClick={handleMcqNext}
              style={{ padding: "10px 20px", fontSize: 13, background: "var(--color-accent)", color: "var(--color-accent-text)", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}
            >
              {mcqIdx + 1 === subject.quiz.length ? "Finish Quiz" : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentCard = subject.questions[cardIdx];
  return (
    <div className="fade-in" style={{ maxWidth: 520, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
        <span>Flashcard Study Mode</span>
        <span>Card {cardIdx + 1} of {subject.questions.length}</span>
      </div>

      <div className="flashcard-container" onClick={() => setFlipped(f => !f)}>
        <div className={`flashcard ${flipped ? "flipped" : ""}`}>
          <div className="flashcard-face flashcard-front">
            <span style={{ fontSize: 11, color: "var(--color-accent)", fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Question (Q{currentCard.n})</span>
            <h3 style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.6 }}>{currentCard.text}</h3>
            <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 24 }}>🖱️ Click card to reveal answer</span>
          </div>
          <div className="flashcard-face flashcard-back">
            <span style={{ fontSize: 11, color: "var(--color-border-info)", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Answer</span>
            <div style={{ flex: 1, overflowY: "auto", width: "100%", padding: "4px 8px", textAlign: "left", fontSize: "12px", lineHeight: 1.6 }}>
              <FormatAnswer text={currentCard.answer} />
            </div>
            <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 10 }}>Click card to flip back</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16, marginBottom: 24 }}>
        <button
          onClick={() => handleMarkReview(currentCard.n)}
          style={{ padding: "10px 18px", border: "1px solid var(--color-border-secondary)", borderRadius: 8, fontSize: 13, background: "var(--color-background-primary)", color: "#ef4444", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
        >
          ❌ Review Later
        </button>
        <button
          onClick={() => handleMarkMastered(currentCard.n)}
          style={{ padding: "10px 18px", border: "none", borderRadius: 8, fontSize: 13, background: "var(--color-border-info)", color: "var(--color-background-primary)", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
        >
          ✅ Mastered
        </button>
      </div>

      <div className="glass-panel" style={{ borderRadius: 12, padding: "14px 18px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)" }}>{flashcardStats.mastered}</div>
          <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", textTransform: "uppercase" }}>Mastered</div>
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#ef4444" }}>{flashcardStats.review}</div>
          <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", textTransform: "uppercase" }}>To Review</div>
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-tertiary)" }}>{flashcardStats.remaining}</div>
          <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", textTransform: "uppercase" }}>Unread</div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <button onClick={resetFlashcards} style={{ border: "none", background: "none", fontSize: 12, color: "var(--color-accent)", textDecoration: "underline", cursor: "pointer" }}>Reset Progress</button>
      </div>
    </div>
  );
}

/* ── AI Prompt Builder & Generator View ── */
function AiBuilderView({ apiKey, onSubjectGenerated }) {
  const [subjName, setSubjName] = useState("Distributed Systems");
  const [subjCode, setSubjCode] = useState("MCS-232");
  const [syllabus, setSyllabus] = useState("Unit 1: Introduction to Distributed Systems, Resource sharing, Challenges\nUnit 2: System Models, Architectural & Fundamental Models\nUnit 3: Interprocess Communication, APIs, Multicast communication");
  
  const [promptCopied, setPromptCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const systemPromptTemplate = useMemo(() => {
    return `You are a professional curriculum builder. Create a study guide JSON for the subject "${subjName}" (Code: "${subjCode}").
Integrate this syllabus:
"${syllabus}"

Provide exactly 5 highly comprehensive study guide questions/answers covering these topics, and exactly 5 interactive multiple-choice questions for practice.

Return ONLY a valid JSON object matching the StudyMate schema below:
{
  "subjectCode": "${subjCode}",
  "subjectName": "${subjName}",
  "subjectTitle": "Syllabus Study Guide",
  "description": "Interactive study guide generated by AI.",
  "stats": [
    { "value": "5", "label": "Questions" },
    { "value": "5", "label": "MCQs" }
  ],
  "categories": [
    { "id": "all", "label": "All Topics" },
    { "id": "core", "label": "Core Content" }
  ],
  "papers": ["Mock Test"],
  "questions": [
    {
      "n": 1,
      "hot": true,
      "cat": "core",
      "unit": "Core Unit",
      "text": "Question text here?",
      "papers": ["Mock Test"],
      "freq": 3,
      "answer": "Detailed answer in markdown. Heavy list formatting and bold titles.",
      "diagram": "Mermaid diagram code if applicable (e.g. graph TD) or null"
    }
  ],
  "quiz": [
    {
      "question": "Question statement?",
      "options": ["A", "B", "C", "D"],
      "answer": "Verbatim correct option string",
      "explanation": "Why this option is correct."
    }
  ]
}

No conversations, no markdown code block surrounding the JSON (e.g. no \`\`\`json block), just pure raw JSON.`;
  }, [subjName, subjCode, syllabus]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(systemPromptTemplate);
    setPromptCopied(true);
    showSuccessToast("Prompt Copied to Clipboard!");
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const handleDirectGenerate = async () => {
    if (!apiKey) {
      showErrorDialog("API Key Required", "Please set your Groq API key in Settings (⚙️ icon) first.");
      return;
    }
    setGenerating(true);
    setError("");
    try {
      const parsedJson = await callGroqToBuildSubject(apiKey, subjName, subjCode, syllabus);
      onSubjectGenerated(parsedJson);
      showSuccessToast(`Generated: ${parsedJson.subjectName}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate subject JSON.");
      showErrorToast("Generation Failed");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="glass-panel fade-in" style={{ borderRadius: 16, padding: "1.5rem", maxWidth: 640, margin: "0 auto" }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8 }}>✨ AI Subject Builder</h2>
      <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 20 }}>
        Create dynamic study guides and quizzes for any subject. Build a copyable LLM prompt or generate it directly inside the app using Groq.
      </p>

      {error && (
        <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.08)", border: "1px solid #ef4444", borderRadius: 8, color: "#ef4444", fontSize: 12, marginBottom: 16 }}>
          ⚠️ Generation Error: {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", marginBottom: 6 }}>Subject Name</label>
          <input
            type="text"
            value={subjName}
            onChange={e => setSubjName(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: 8, fontSize: 13, background: "var(--color-background-secondary)", color: "var(--color-text-primary)", border: "1px solid var(--color-border-secondary)", outline: "none" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", marginBottom: 6 }}>Subject Code</label>
          <input
            type="text"
            value={subjCode}
            onChange={e => setSubjCode(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: 8, fontSize: 13, background: "var(--color-background-secondary)", color: "var(--color-text-primary)", border: "1px solid var(--color-border-secondary)", outline: "none" }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", marginBottom: 6 }}>Topics / Syllabus</label>
        <textarea
          rows={5}
          value={syllabus}
          onChange={e => setSyllabus(e.target.value)}
          placeholder="List units, chapters, or specific topics to include..."
          style={{ width: "100%", padding: "10px", borderRadius: 8, fontSize: 13, background: "var(--color-background-secondary)", color: "var(--color-text-primary)", border: "1px solid var(--color-border-secondary)", outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
        />
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
        <button
          onClick={handleCopyPrompt}
          style={{
            padding: "11px 20px", fontSize: 13, borderRadius: 8, fontWeight: 600, cursor: "pointer",
            background: "var(--color-background-secondary)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border-secondary)"
          }}
        >
          {promptCopied ? "✓ Prompt Copied!" : "📋 Copy Prompt for LLM"}
        </button>
        <button
          onClick={handleDirectGenerate}
          disabled={generating}
          style={{
            padding: "11px 20px", fontSize: 13, borderRadius: 8, fontWeight: 600, cursor: "pointer",
            background: "var(--color-accent)", color: "var(--color-accent-text)", border: "none",
            display: "flex", alignItems: "center", gap: 6
          }}
        >
          {generating ? (
            <>
              <span className="spin">⟳</span> Generating study guide...
            </>
          ) : (
            "✨ Generate with Groq"
          )}
        </button>
      </div>

      {generating && (
        <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 12, textAlign: "right" }}>
          Llama 3 is crunching the topics. This might take up to 20 seconds.
        </p>
      )}
    </div>
  );
}

/* ── Main SubjectScreen Component ── */
export default function SubjectScreen({
  subject,
  apiKey,
  theme,
  setTheme,
  setScreen,
  progress,
  toggleStudied,
  handleSubjectGenerated
}) {
  const [view, setView] = useState("study"); // "study" | "quiz" | "builder"
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openQ, setOpenQ] = useState(null);

  // Reset page layout states when subject changes
  useEffect(() => {
    setSearch("");
    setFilter("all");
    setOpenQ(null);
  }, [subject]);

  const studiedCount = useMemo(() => {
    const subProgress = progress[subject.subjectCode] || {};
    return subject.questions.filter(q => subProgress[q.n]).length;
  }, [subject, progress]);

  const dynamicCategories = useMemo(() => {
    const base = subject.categories || [{ id: "all", label: "All" }];
    const hasHot = base.some(c => c.id === "hot");
    const hasAll = base.some(c => c.id === "all");
    
    let result = [...base];
    if (!hasAll) result.unshift({ id: "all", label: "All" });
    if (!hasHot && subject.questions.some(q => q.hot)) {
      result.splice(1, 0, { id: "hot", label: "🔥 High Priority" });
    }
    return result;
  }, [subject]);

  const filteredQuestions = useMemo(() => {
    let list = subject.questions || [];
    if (filter === "hot") {
      list = list.filter(q => q.hot);
    } else if (filter !== "all") {
      list = list.filter(q => q.cat === filter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(item => 
        item.text.toLowerCase().includes(q) || 
        item.unit.toLowerCase().includes(q) || 
        item.answer.toLowerCase().includes(q)
      );
    }
    return list;
  }, [subject, filter, search]);

  const isQuestionStudied = (n) => {
    const subProgress = progress[subject.subjectCode] || {};
    return !!subProgress[n];
  };

  const handleToggleStudied = (n) => {
    toggleStudied(subject.subjectCode, n);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--color-bg-body)" }}>
      {/* Header bar */}
      <header style={{
        background: "var(--color-header-gradient)",
        color: "#ffffff",
        padding: "16px 16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Back navigation button */}
        <button
          onClick={() => setScreen("home")}
          style={{
            background: "transparent",
            border: "none",
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px 8px",
            minWidth: "44px",
            minHeight: "44px"
          }}
        >
          ←
        </button>

        <div style={{ flex: 1, textAlign: "center", overflow: "hidden", padding: "0 8px" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, opacity: 0.9 }}>
            {subject.subjectCode}
          </div>
          <div style={{ fontSize: "12px", opacity: 0.8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {subject.subjectTitle}
          </div>
        </div>

        <button
          onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
          style={{
            background: "transparent",
            border: "none",
            color: "#ffffff",
            fontSize: "18px",
            cursor: "pointer",
            padding: "8px",
            minWidth: "44px",
            minHeight: "44px"
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Tabs bar */}
      <section style={{ 
        position: "sticky", 
        top: "56px", 
        zIndex: 10,
        background: "var(--color-bg-body)", 
        borderBottom: "1px solid var(--color-border-secondary)", 
        padding: "10px 16px" 
      }}>
        <div className="glass-panel" style={{ display: "flex", justifyContent: "space-around", padding: "8px", borderRadius: "12px" }}>
          <button
            onClick={() => setView("study")}
            className={`nav-tab ${view === "study" ? "active" : ""}`}
            style={{ border: "none", background: "none", fontSize: 13, fontWeight: 600, color: "var(--color-text-secondary)", cursor: "pointer", padding: "8px" }}
          >
            📖 Study Guide
          </button>
          <button
            onClick={() => setView("quiz")}
            className={`nav-tab ${view === "quiz" ? "active" : ""}`}
            style={{ border: "none", background: "none", fontSize: 13, fontWeight: 600, color: "var(--color-text-secondary)", cursor: "pointer", padding: "8px" }}
          >
            ✏️ Practice Quiz
          </button>
          <button
            onClick={() => setView("builder")}
            className={`nav-tab ${view === "builder" ? "active" : ""}`}
            style={{ border: "none", background: "none", fontSize: 13, fontWeight: 600, color: "var(--color-text-secondary)", cursor: "pointer", padding: "8px" }}
          >
            ✨ Builder
          </button>
        </div>
      </section>

      {/* Workspace Area */}
      <main style={{ flex: 1, padding: "16px" }}>
        {view === "study" && (
          <div className="fade-in">
            {/* Dynamic Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 10, marginBottom: "16px" }}>
              <div className="glass-panel" style={{ borderRadius: "var(--border-radius-md)", padding: "12px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text-primary)" }}>{studiedCount}/{subject.questions.length}</div>
                <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginTop: 4 }}>Studied</div>
              </div>
              {subject.stats && subject.stats.map(stat => (
                <div key={stat.label} className="glass-panel" style={{ borderRadius: "var(--border-radius-md)", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text-primary)" }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search Input Card */}
            <div className="glass-panel" style={{ borderRadius: "var(--border-radius-lg)", padding: "8px 12px", marginBottom: "16px" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", width: "100%" }}>
                <span style={{ fontSize: 14 }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search questions or answers..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: "100%", padding: "6px 2px", border: "none", fontSize: 13, fontFamily: "inherit", background: "transparent", color: "var(--color-text-primary)", outline: "none" }}
                />
              </div>
            </div>

            {/* Dynamic filter pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "16px" }}>
              {dynamicCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  style={{
                    fontSize: 10, padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontWeight: 600, transition: "all 0.2s",
                    border: filter === cat.id ? "1px solid var(--color-border-info)" : "1px solid var(--color-border-secondary)",
                    background: filter === cat.id ? "var(--color-background-info)" : "var(--color-background-primary)",
                    color: filter === cat.id ? "var(--color-text-info)" : "var(--color-text-secondary)",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Questions Accordion List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filteredQuestions.map(q => (
                <QuestionItem 
                  key={q.n} 
                  q={q} 
                  apiKey={apiKey} 
                  openQ={openQ} 
                  setOpenQ={setOpenQ} 
                  theme={theme}
                  isStudied={isQuestionStudied(q.n)}
                  onToggleStudied={handleToggleStudied}
                />
              ))}

              {filteredQuestions.length === 0 && (
                <div className="glass-panel" style={{ textAlign: "center", padding: "2.5rem 1.5rem", borderRadius: "var(--border-radius-lg)", color: "var(--color-text-tertiary)", fontSize: 13 }}>
                  💡 No questions match your search or filter criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {view === "quiz" && (
          <QuizView subject={subject} theme={theme} />
        )}

        {view === "builder" && (
          <AiBuilderView apiKey={apiKey} onSubjectGenerated={handleSubjectGenerated} />
        )}
      </main>
    </div>
  );
}
