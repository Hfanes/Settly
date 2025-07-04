import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "./components/ThemeProvider";
import { HotkeysProvider } from "react-hotkeys-hook";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Files from "./pages/Files";
import Home from "./pages/Home";

// Prevent FOUC by applying theme immediately
// Flash of Unstyled Content
// It's a visual phenomenon that occurs when a web page briefly appears without its CSS styling before the styles are applied.
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const isDark =
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

initializeTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HotkeysProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="files" element={<Files />} />
              {/* <Route path="*" element={}/> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HotkeysProvider>
  </React.StrictMode>
);
