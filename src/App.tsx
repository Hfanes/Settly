import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import { Store } from "tauri-plugin-store-api";
import { useSettingsStore } from "./store/useSettingsStore";
import WelcomeScreen from "./pages/WelcomeScreen";

function App() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const navWidth = isCollapsed ? "w-20" : "w-38"; // width classes
  const mainMargin = isCollapsed ? "ml-20" : "ml-38"; // margin-left classes

  const setFolderPath = useSettingsStore((s) => s.setFolderPath);
  const folderPath = useSettingsStore((s) => s.folderPath);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setIsCollapsed((prev) => !prev);
  };

  // TODO: Test CSP
  useEffect(() => {
    try {
      eval("console.log('should not run')");
    } catch (e) {
      console.error("Eval blocked by CSP:", e);
    }
  }, []);

  useEffect(() => {
    const loadFolder = async () => {
      const folder: string | null = await invoke("get_folder_path");
      if (folder) {
        setFolderPath(folder);
      }
      setLoading(false);
    };
    loadFolder();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!folderPath) {
    return <WelcomeScreen />;
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <Navbar
        isCollapsed={isCollapsed}
        toggleMenu={toggleMenu}
        navWidth={navWidth}
      />
      <main
        className={`flex-1 ${mainMargin} px-6 sm:px-12 pt-10 transition-all duration-300`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default App;
