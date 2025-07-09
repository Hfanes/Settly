import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";

function App() {
  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const navWidth = isCollapsed ? "w-20" : "w-38"; // width classes
  const mainMargin = isCollapsed ? "ml-20" : "ml-38"; // margin-left classes

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

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <Navbar
        isCollapsed={isCollapsed}
        toggleMenu={toggleMenu}
        navWidth={navWidth}
      />
      <main
        className={`flex-1 ${mainMargin} px-6 sm:px-24 pt-10 transition-all duration-300`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default App;
