import { useState, useEffect } from "react";

let toastListeners = [];

export function showSuccessToast(message) {
  toastListeners.forEach(listener => listener(message, "success"));
}

export function showErrorToast(message) {
  toastListeners.forEach(listener => listener(message, "error"));
}

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;
    const handleToast = (message, type) => {
      if (timer) clearTimeout(timer);
      setToast({ message, type });
      timer = setTimeout(() => {
        setToast(null);
      }, 2500);
    };

    toastListeners.push(handleToast);
    return () => {
      toastListeners = toastListeners.filter(l => l !== handleToast);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!toast) return null;

  const bg = toast.type === "error" ? "#ef4444" : "#10b981";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        background: bg,
        color: "#ffffff",
        padding: "12px 20px",
        borderRadius: "24px",
        fontSize: "13px",
        fontWeight: 600,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
        zIndex: 2000,
        maxWidth: "80%",
        textAlign: "center",
        pointerEvents: "none",
        animation: "slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }}
    >
      {toast.message}
    </div>
  );
}
