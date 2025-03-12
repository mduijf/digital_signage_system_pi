"use client"

import { useState, useEffect } from "react"
import { Clock, FlipVerticalIcon as DragVertical, Edit, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ContentItem {
  id: string
  title: string
  type: string
  duration: number
  content: {
    url: string
    alt?: string
  }
}

export function DisplayContentList({ displayId }: { displayId: string }) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this from your API
    const fetchContent = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock data based on display ID
        let mockData: ContentItem[] = []

        if (displayId === "display-1") {
          mockData = [
            {
              id: "content-1",
              title: "Welcome Message",
              type: "image",
              duration: 30000,
              content: {
                url: "/placeholder.svg?height=1080&width=1920",
                alt: "Welcome to our company",
              },
            },
            {
              id: "content-2",
              title: "Company News",
              type: "webpage",
              duration: 60000,
              content: {
                url: "https://example.com/news",
              },
            },
          ]
        } else if (displayId === "display-2") {
          mockData = [
            {
              id: "content-3",
              title: "Menu of the Day",
              type: "image",
              duration: 45000,
              content: {
                url: "/placeholder.svg?height=1080&width=1920",
                alt: "Today's menu",
              },
            },
          ]
        } else {
          mockData = [
            {
              id: "content-1",
              title: "Conference Schedule",
              type: "webpage",
              duration: 120000,
              content: {
                url: "https://example.com/conference-schedule",
              },
            },
          ]
        }

        setContentItems(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch content", error)
        setLoading(false)
      }
    }

    fetchContent()
  }, [displayId])

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-16 bg-muted rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (contentItems.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No content assigned to this display.</p>
          <Button className="mt-4">Assign Content</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {contentItems.map((item, index) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center">
              <div className="p-4 cursor-move">
                <DragVertical className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{item.title}</h3>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.duration / 1000}s</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

