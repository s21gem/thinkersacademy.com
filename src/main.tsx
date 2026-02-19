import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// 🔥 Send height to parent (WordPress)
function sendHeight() {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage(
    { type: "SET_IFRAME_HEIGHT", height },
    "*"
  );
}

// Run on load + resize + content change
window.addEventListener("load", sendHeight);
window.addEventListener("resize", sendHeight);

// Optional: slight delay for fonts/images
setTimeout(sendHeight, 500);
setTimeout(sendHeight, 1200);