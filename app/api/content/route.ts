import { NextResponse } from "next/server"

// This would typically connect to a database
const contentItems = [
  {
    id: "content-1",
    title: "Welcome Message",
    type: "image",
    duration: "30 seconds",
    createdAt: "2023-06-01",
    updatedAt: "2023-06-01",
    thumbnail: "/placeholder.svg?height=200&width=300",
    content: {
      url: "/placeholder.svg?height=1080&width=1920",
      alt: "Welcome to our company",
    },
  },
  {
    id: "content-2",
    title: "Company News",
    type: "webpage",
    duration: "1 minute",
    createdAt: "2023-06-05",
    updatedAt: "2023-06-05",
    thumbnail: "/placeholder.svg?height=200&width=300",
    content: {
      url: "https://example.com/news",
    },
  },
  {
    id: "content-3",
    title: "Product Showcase",
    type: "video",
    duration: "2 minutes",
    createdAt: "2023-06-10",
    updatedAt: "2023-06-10",
    thumbnail: "/placeholder.svg?height=200&width=300",
    content: {
      url: "https://example.com/video.mp4",
    },
  },
]

export async function GET() {
  return NextResponse.json(contentItems)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.type) {
      return NextResponse.json({ error: "Title and type are required" }, { status: 400 })
    }

    // Create a new content item
    const newContent = {
      id: `content-${contentItems.length + 1}`,
      title: data.title,
      type: data.type,
      duration: data.duration || "30 seconds",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      thumbnail: data.thumbnail || "/placeholder.svg?height=200&width=300",
      content: data.content || {},
    }

    // In a real app, you would save this to a database
    contentItems.push(newContent)

    return NextResponse.json(newContent, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 })
  }
}

