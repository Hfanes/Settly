import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

export default function UploadPage() {
  const handleClick = async () => {
    const file = await open({
      multiple: false,
      filters: [
        { name: "Images", extensions: ["jpg", "png", "jpeg", "gif"] },
        { name: "All Files", extensions: ["*"] },
      ],
    });
    if (!file || typeof file !== "string") return;

    try {
      await invoke("copy_file_from_state", {
        filePath: file,
      });
      console.log("File uploaded successfully");
    } catch (err) {
      console.error("Error copying file:", err);
    }
  };

  return (
    <div className="w-full mx:auto">
      <div className="flex flex-col justify-center items-start space-y-6 mb-8">
        <h1 className="text-3xl font-bold">Upload Files</h1>
        <p>Add new documents to your collection</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full ">
          <Card>
            <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Upload Documents</CardTitle>
              <CardDescription>
                Select files and categorize them properly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed p-4 flex flex-col items-center gap-4">
                <Upload />
                <Button onClick={handleClick}>Choose Files</Button>
                <p className="text-xs">or drag and drop files here</p>
                <p className="text-xs">
                  Supports PDF, JPG, PNG up to 10MB each
                </p>
              </div>
              <div>Selected Files</div>
              <Card>
                <CardContent className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText />
                    <div className="flex flex-col">
                      <div>passport-scan.pdf</div>
                      <div className="text-xs">2.4 MB</div>
                    </div>
                  </div>
                  <X />
                </CardContent>
              </Card>
              <div>Category</div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="identification">Identification</SelectItem>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Document Name
              </label>
              <Input type="text" placeholder="Enter document name" required />
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description (Optional)
              </label>
              <Textarea placeholder="Type your message here." />
              <div>Tags</div>
              <div className="flex">
                <div className="border rounded-2xl px-3 py-0.5 ">Important</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Upload Documents
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Document Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div>Identification</div>
                  <div className="px-1.5 py-0.5 border rounded-3xl">0</div>
                </div>
                <div className="flex justify-between">
                  <div>Contracts</div>
                  <div className="px-1.5 py-0.5 border rounded-3xl">0</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
