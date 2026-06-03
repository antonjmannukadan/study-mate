import { useState, useEffect } from "react";

let dialogListeners = [];

export function showConfirmDialog(message, onConfirm) {
  dialogListeners.forEach(listener => listener({ type: "confirm", message, onConfirm }));
}

export function showErrorDialog(title, message) {
  dialogListeners.forEach(listener => listener({ type: "error", title, message }));
}

export default function Dialog() {
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    const handleDialog = (config) => {
      setDialog(config);
    };

    dialogListeners.push(handleDialog);
    return () => {
      dialogListeners = dialogListeners.filter(l => l !== handleDialog);
    };
  }, []);

  if (!dialog) return null;

  const handleClose = () => {
    setDialog(null);
  };

  const handleConfirm = () => {
    if (dialog.onConfirm) {
      dialog.onConfirm();
    }
    setDialog(null);
  };

  return (
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3000,
        animation: "fadeIn 0.2s ease",
        padding: "20px"
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "340px",
          backgroundColor: "var(--color-background-primary)",
          border: "1px solid var(--color-border-secondary)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
          animation: "scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "10px" }}>
          {dialog.type === "confirm" ? "Confirm Action" : (dialog.title || "Alert")}
        </h4>
        <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.5", marginBottom: "24px" }}>
          {dialog.message}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          {dialog.type === "confirm" ? (
            <>
              <button
                onClick={handleClose}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  color: "var(--color-text-tertiary)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#ef4444",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={handleClose}
              style={{
                padding: "10px 24px",
                borderRadius: "8px",
                border: "none",
                background: "var(--color-accent)",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
