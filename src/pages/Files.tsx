import { Button } from "@/components/ui/button";
import {
  Upload,
  Search,
  Filter,
  FileText,
  X,
  Eye,
  Download,
  Trash2,
  Clock,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";
import { Link } from "react-router";
import { useSettingsStore } from "../store/useSettingsStore";
import { invoke } from "@tauri-apps/api/core";

type FileInfo = { name: string; size: number; modified: number };

export default function Files() {
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState<FileInfo[]>([]);
  const folderPath = useSettingsStore((state) => state.folderPath);
  const fileCount = files.length;
  // const [filteredProjects, setFilteredProjects] = useStat(myProjects);
  // const projectsNumber = myProjects.length;

  // useEffect(() => {
  //   const filtered = myProjects.filter((item) =>
  //     item.title.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredProjects(filtered);
  // }, [query, myProjects]);

  useEffect(() => {
    const fetchData = async () => {
      const filesGet = await invoke<FileInfo[]>("list_files_in_folder");
      setFiles(filesGet);
      console.log(filesGet);
    };

    fetchData();
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(2)} ${sizes[i]}`;
  };

  function formatDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); //  seconds to milliseconds
    return date.toLocaleString();
  }

  return (
    <div className="w-full mx:auto">
      <div className="flex flex-col justify-center items-start space-y-6 mb-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">My Files</h1>
            <p>Organize and manage your documents</p>
          </div>
          <Button>
            <Link
              to="/upload"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Upload />
              <div>Upload Files</div>
            </Link>
          </Button>
        </div>
        <p>{folderPath}</p>
        <div className="relative mb-2 flex items-center w-full gap-2">
          <Search className="absolute left-3 pointer-events-non" size={18} />
          <input
            type="text"
            className="border w-full p-2 pl-10
             focus:outline-none focus:ring-1 focus:ring-accentYellow transition-colors rounded-md"
            placeholder="Search projects..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button>
            <Filter />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-4 bg-neutral-100 dark:text-black rounded-md w-full px-2 py-1">
          <div className="bg-white p-2 rounded-md flex items-center justify-between w-full">
            <div>All Files</div>
            <div>{fileCount}</div>
          </div>
          <div className="bg-white p-2 rounded-md flex items-center justify-between w-full">
            <div>Identification</div>
            <div>3</div>
          </div>
          <div className="bg-white p-2 rounded-md flex items-center justify-between w-full">
            <div>Contracts</div>
            <div>2</div>
          </div>
        </div>
        {files.map((file) => (
          <Card className="w-full">
            <CardContent className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText />
                <div className="flex flex-col">
                  <div>{file.name}</div>
                  <div className="text-xs">
                    <span>Identification</span>
                    <span> • {formatBytes(file.size)}</span>
                    <span> • {formatDate(file.modified)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="px-2 py-0.5 rounded-xl bg-black text-white text-xs">
                  verified
                </div>
                <Eye className="h-4 w-4" />
                <Download className="h-4 w-4" />
                <Trash2 className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>Track your document storage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <span>Used: 24.8 MB</span>
              <span>Available: 975.2 MB</span>
            </div>
            <div className="h-2 rounded-full bg-muted mt-2">
              <div className="h-2 w-[2.5%] rounded-full bg-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
