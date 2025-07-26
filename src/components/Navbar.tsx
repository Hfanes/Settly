import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Theme } from "@tauri-apps/api/window";
import {
  PanelLeft,
  House,
  Archive,
  FileUp,
  Search,
  SquareCheckBig,
  Calendar1,
  Mail,
  Info,
  Settings,
} from "lucide-react";
import { Link } from "react-router";
import { useHotkeys } from "react-hotkeys-hook";

interface NavbarProps {
  isCollapsed: boolean;
  toggleMenu: () => void;
  navWidth: string;
}

export default function Navbar(props: NavbarProps) {
  const { theme, setTheme } = useTheme();

  useHotkeys("ctrl+b", () => props.toggleMenu());

  return (
    <nav
      className={`top-0 left-0 fixed h-full border ${props.navWidth} break-words px-4 py-2 z-50
    flex flex-col justify-between text-sm`}
    >
      <ul className="flex flex-col justify-between items-center w-full gap-6">
        {props.isCollapsed ? (
          <>
            <li>
              <button
                onClick={props.toggleMenu}
                className="mb-1 cursor-pointer"
              >
                <PanelLeft size={20} />
              </button>
            </li>
            <li className="cursor-pointer">
              <Link to="/">
                <House size={20} />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/files">
                <Archive size={20} />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/upload">
                <FileUp size={20} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <Search size={20} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <SquareCheckBig size={20} />
              </Link>
            </li>
            <li>
              <Link to="/files">
                <Calendar1 size={20} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <Mail size={20} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <Info size={20} />
              </Link>
            </li>
            <li>
              <Link to="/files">
                <Settings size={20} />
              </Link>
            </li>
          </>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            <li className="cursor-pointer">
              <button onClick={props.toggleMenu} className="mb-1">
                <PanelLeft size={20} />
              </button>
            </li>
            <div className="flex flex-col justify-start items-start gap-4 w-full">
              Main
              <li>
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                  <House size={22} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/files"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Archive size={22} />
                  My Files
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FileUp size={22} />
                  Upload Files
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                  <Search size={22} />
                  Search
                </Link>
              </li>
            </div>
            <div className="flex flex-col justify-start items-start gap-4 w-full">
              Tools
              <li>
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                  <SquareCheckBig size={22} />
                  Task Checklist
                </Link>
              </li>
              <li>
                <Link
                  to="/files"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Calendar1 size={22} />
                  Calendar
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                  <Mail size={22} />
                  Email Templates
                </Link>
              </li>
            </div>
            <div className="flex flex-col justify-start items-start gap-4 w-full">
              Support
              <li>
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                  <Info size={22} />
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/files"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Settings size={22} />
                  Settings
                </Link>
              </li>
            </div>
          </div>
        )}
      </ul>
      <select
        name="theme"
        value={theme}
        onChange={(e) => {
          console.log("navbar select", e.target.value);
          setTheme(e.target.value as Theme);
        }}
        className="dark:bg-blacktheme"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </nav>
  );
}
