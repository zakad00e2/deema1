import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

// Singleton event emitter for the toast system
const listeners: Set<(toast: ToastItem) => void> = new Set();

export const toast = {
  success(message: string) {
    emit({ id: String(Date.now()), type: "success", message });
  },
  error(message: string) {
    emit({ id: String(Date.now()), type: "error", message });
  },
  warning(message: string) {
    emit({ id: String(Date.now()), type: "warning", message });
  },
};

function emit(item: ToastItem) {
  listeners.forEach((fn) => fn(item));
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (item: ToastItem) => {
      setToasts((prev) => [...prev, item]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== item.id));
      }, 4000);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />,
    error: <XCircle className="w-4 h-4 text-red-500 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
  };

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-[#1c1c18] border border-[#2e2e2a] px-4 py-3 shadow-xl pointer-events-auto animate-[toast-in_0.25s_ease]"
        >
          {icons[t.type]}
          <p className="text-white text-sm font-sans flex-1 font-light">{t.message}</p>
          <button
            onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            className="text-[#4a4844] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
