import Link from "next/link"
import { ArrowRight, LayoutGrid, Monitor, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DisplayCard } from "@/components/display-card"
import { ContentCard } from "@/components/content-card"
import { StatsCards } from "@/components/stats-cards"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/displays/new">
                <Plus className="mr-2 h-4 w-4" />
                New Display
              </Link>
            </Button>
            <Button asChild>
              <Link href="/content/new">
                <Plus className="mr-2 h-4 w-4" />
                New Content
              </Link>
            </Button>
          </div>
        </div>

        <StatsCards />

        <Tabs defaultValue="displays" className="space-y-4">
          <TabsList>
            <TabsTrigger value="displays" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Displays
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Content
            </TabsTrigger>
          </TabsList>
          <TabsContent value="displays" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <DisplayCard
                id="display-1"
                name="Lobby Display"
                location="Main Entrance"
                status="online"
                lastSeen="2 minutes ago"
                currentContent="Welcome Message"
              />
              <DisplayCard
                id="display-2"
                name="Cafeteria Display"
                location="Cafeteria"
                status="online"
                lastSeen="5 minutes ago"
                currentContent="Menu of the Day"
              />
              <DisplayCard
                id="display-3"
                name="Conference Room"
                location="Meeting Room A"
                status="offline"
                lastSeen="2 days ago"
                currentContent="Conference Schedule"
              />
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Add Display</CardTitle>
                </CardHeader>
                <CardContent className="flex h-40 flex-col items-center justify-center">
                  <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <Link href="/displays/new">
                      <Plus className="h-6 w-6" />
                      <span className="sr-only">Add new display</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex items-center justify-end">
              <Button variant="outline" size="sm" asChild>
                <Link href="/displays">
                  View All Displays
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="content" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ContentCard
                id="content-1"
                title="Welcome Message"
                type="image"
                duration="30 seconds"
                createdAt="2023-06-01"
                thumbnail="/placeholder.svg?height=200&width=300"
              />
              <ContentCard
                id="content-2"
                title="Company News"
                type="webpage"
                duration="1 minute"
                createdAt="2023-06-05"
                thumbnail="/placeholder.svg?height=200&width=300"
              />
              <ContentCard
                id="content-3"
                title="Product Showcase"
                type="video"
                duration="2 minutes"
                createdAt="2023-06-10"
                thumbnail="/placeholder.svg?height=200&width=300"
              />
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Add Content</CardTitle>
                </CardHeader>
                <CardContent className="flex h-40 flex-col items-center justify-center">
                  <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <Link href="/content/new">
                      <Plus className="h-6 w-6" />
                      <span className="sr-only">Add new content</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex items-center justify-end">
              <Button variant="outline" size="sm" asChild>
                <Link href="/content">
                  View All Content
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

