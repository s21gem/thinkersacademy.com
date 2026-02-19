import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// ✅ Robust height sender
const sendHeight = () => {
  const height =
    document.body.scrollHeight ||
    document.documentElement.scrollHeight;

  window.parent.postMessage(
    {
      type: "SET_IFRAME_HEIGHT",
      height: height,
    },
    "*"
  );
};

// Fire multiple times (important)
window.addEventListener("load", sendHeight);
window.addEventListener("resize", sendHeight);

// Delay for fonts/images/animations
setTimeout(sendHeight, 300);
setTimeout(sendHeight, 800);
setTimeout(sendHeight, 1500);
setTimeout(sendHeight, 2500);