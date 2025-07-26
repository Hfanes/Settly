import { open } from "@tauri-apps/plugin-dialog";
import { Store } from "tauri-plugin-store-api";
import { useSettingsStore } from "../store/useSettingsStore";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button";
import { FolderInput } from "lucide-react";

export default function WelcomeScreen() {
  const setFolderPath = useSettingsStore((s) => s.setFolderPath);

  const pickFolder = async () => {
    const folder = await open({
      directory: true,
      multiple: false,
    });
    if (!folder || typeof folder !== "string") return;
    await invoke("set_folder_path", { folder });
    setFolderPath(folder);
    console.log("Selected folder:", folder);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <div className="rounded-2xl shadow-lg p-8 w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Settly</h1>
        <h2>IMG</h2>
        <p>
          Your all-in-one app for managing your move abroad. Organize essential
          documents, track deadlines, create checklists, and set reminders — all
          in one secure, offline-friendly space.
        </p>
        <p className="mb-4 text-gray-600">
          Choose a folder to securely store your documents.
        </p>
        <Button onClick={pickFolder} className="cursor-pointer">
          <FolderInput />
          Select Folder
        </Button>
      </div>
    </div>
  );
}
