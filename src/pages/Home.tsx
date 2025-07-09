import React from "react";
import {
  Shield,
  CheckCircle,
  FileText,
  Clock,
  HardDrive,
  Upload,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <div className="w-full mx:auto">
      <div className="flex flex-col justify-center items-start space-y-6 mb-8">
        <h1 className="text-3xl font-bold">Welcome to Settly</h1>
        <p>
          Your offline document manager for new arrival documentation - all data
          stored securely on your computer
        </p>

        <Card className="border-green-200 bg-green-50/50 w-full">
          <CardContent className="flex items-center gap-4 p-4">
            <Shield className="h-8 w-8 text-green-600" />
            <div className="flex-1">
              <h3 className="font-medium text-green-900">Secure & Private</h3>
              <p className="text-sm text-green-700">
                All documents encrypted and stored locally on your Windows PC
              </p>
            </div>
            <div className="p-2 rounded-full bg-green-100 text-green-800">
              Offline Mode
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Documents Stored</CardTitle>
              <CardAction>
                <FileText className="h-4 w-4" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs mt-2">+2 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Tasks Completed</CardTitle>
              <CheckCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8/15</div>
              <Progress value={33} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs mt-2">Next: Tax Registration</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Storage Used</CardTitle>
              <HardDrive className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.8 MB</div>
              <p className="text-xs mt-2">Local storage</p>
            </CardContent>
          </Card>
        </div>
        <Card className="w-full">
          <CardHeader className="flex flex-col items-start space-y-0">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-xs mt-2">
              Common tasks to get you started
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Button className="h-auto w-auto flex-col gap-2 p-4">
              <Upload className="h-6 w-6" />
              <span>Add Documents</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto w-auto flex-col gap-2 p-4"
            >
              <CheckCircle className="h-6 w-6" />
              <span>View Tasks</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto w-auto flex-col gap-2 p-4"
            >
              <Calendar className="h-6 w-6" />
              <span>Check Calendar</span>
            </Button>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <Card>
            <CardHeader className="flex flex-col items-start">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription className="text-xs mt-2">
                Common tasks to get you started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 w-full">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <div className="flex flex-col">
                    <div>Passport scanned and encrypted</div>
                    <p className="text-sm">2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div>
                  <div className="flex flex-col">
                    <div>Bank account task completed</div>
                    <p className="text-sm">1 day ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <div>
                  <div className="flex flex-col">
                    <div>Insurance documents added</div>
                    <p className="text-sm">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-start">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span>
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                </span>
                Urgent Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex flex-col">
                  <div>Tax Registration</div>
                  <div>Due in 3 days</div>
                </div>
                <div className="bg-red-500 px-4 py-0.5 rounded-full">
                  Urgent
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex flex-col">
                  <div>Health Insurance</div>
                  <div>Due in 1 week</div>
                </div>
                <div className="bg-gray-400 px-4 py-0.5 rounded-full">
                  Important
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex flex-col">
                  <div>Address Registration</div>
                  <div>Due in 2 weeks</div>
                </div>
                <div className="bg-gray-400 px-4 py-0.5 rounded-full">
                  Pending
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="w-full">
          <CardHeader className="flex flex-col items-start">
            <CardTitle className="text-xl">System Status</CardTitle>
            <CardDescription className="text-xs mt-2">
              Local storage and security information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start space-y-4">
            <div className="flex justify-between gap-4 w-full">
              <div className="flex items-center gap-4">
                <Shield className="h-6 w-6 text-green-500" />
                <p>Encryption Status</p>
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-0.5 rounded-full">
                Active (AES-256)
              </div>
            </div>
            <div className="flex justify-between gap-4 w-full">
              <div className="flex items-center gap-4">
                <HardDrive className="h-6 w-6 text-blue-500" />
                <p>Data Location</p>
              </div>
              <div className="text-sm">C:\Users\hfa\Documents\Settly</div>
            </div>
            <div className="flex justify-between gap-4 w-full">
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-orange-500" />
                <p>Encryption Status</p>
              </div>
              <div className="text-sm">Today, 2:30 PM</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
