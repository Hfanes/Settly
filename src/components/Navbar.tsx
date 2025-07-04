import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Theme } from "@tauri-apps/api/window";
import { PanelLeft, House, Archive, FileUp, Search } from "lucide-react";
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
    flex flex-col justify-between`}
    >
      <ul className="flex flex-col justify-between items-center w-full gap-6">
        {props.isCollapsed ? (
          <>
            <li>
              <button
                onClick={props.toggleMenu}
                className="mb-1 cursor-pointer"
              >
                <PanelLeft />
              </button>
            </li>
            <li className="cursor-pointer">
              <Link to="/">
                <House />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/"></Link>
              <Archive />
            </li>
            <li className="cursor-pointer">
              <Link to="/"></Link>
              <FileUp />
            </li>
            <li className="cursor-pointer">
              <Link to="/"></Link>
              <Search />
            </li>
          </>
        ) : (
          <>
            <li className="flex items-start cursor-pointer">
              <button onClick={props.toggleMenu} className="mb-1">
                <PanelLeft />
              </button>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <House />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/files"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Archive />
                My Files
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <FileUp />
                Upload Files
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <Search />
                Search
              </Link>
            </li>
          </>
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
