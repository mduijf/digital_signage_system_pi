import Link from "next/link"
import { ArrowLeft, Clock, Edit, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DisplayContentList } from "@/components/display-content-list"

interface DisplayPageProps {
  params: {
    id: string
  }
}

export default function DisplayPage({ params }: DisplayPageProps) {
  const { id } = params

  // In a real app, you would fetch this data from your API
  const display = {
    id,
    name: id === "display-1" ? "Lobby Display" : id === "display-2" ? "Cafeteria Display" : "Conference Room",
    location: id === "display-1" ? "Main Entrance" : id === "display-2" ? "Cafeteria" : "Meeting Room A",
    status: id === "display-3" ? "offline" : "online",
    lastSeen: id === "display-3" ? "2 days ago" : id === "display-2" ? "5 minutes ago" : "2 minutes ago",
    currentContent:
      id === "display-1" ? "Welcome Message" : id === "display-2" ? "Menu of the Day" : "Conference Schedule",
    resolution: "1920x1080",
    orientation: "landscape",
    lastPing: id === "display-3" ? "2 days ago" : "Just now",
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">{display.name}</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Edit className="h-3.5 w-3.5" />
              <span>Edit</span>
            </Button>
            <Button variant="destructive" size="sm" className="h-8 gap-1">
              <Trash className="h-3.5 w-3.5" />
              <span>Delete</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Display Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className={`text-sm ${display.status === "online" ? "text-green-500" : "text-gray-500"}`}>
                  {display.status}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Location</span>
                <span className="text-sm">{display.location}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Resolution</span>
                <span className="text-sm">{display.resolution}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Orientation</span>
                <span className="text-sm">{display.orientation}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Ping</span>
                <span className="text-sm">{display.lastPing}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Current Content</CardTitle>
              <CardDescription>Currently displaying: {display.currentContent}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-md border bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="Current content preview"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="absolute bottom-2 right-2">
                  <Button size="sm" variant="secondary" className="gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>30s remaining</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">Content Schedule</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Scheduled Content</h2>
              <Button>Assign Content</Button>
            </div>
            <DisplayContentList displayId={id} />
          </TabsContent>
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Activity Logs</CardTitle>
                <CardDescription>Recent activity for this display</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Display came online</p>
                      <p className="text-xs text-muted-foreground">Today at 9:42 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Content updated</p>
                      <p className="text-xs text-muted-foreground">Today at 9:40 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Display went offline</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 6:12 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Configure display settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Display Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue={display.name}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location
                    </label>
                    <input
                      id="location"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue={display.location}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

