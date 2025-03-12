import { NextResponse } from "next/server"

// This would typically connect to a database
const displayContent = {
  "display-1": [
    {
      id: "content-1",
      title: "Welcome Message",
      type: "image",
      duration: 30000, // in milliseconds
      content: {
        url: "/placeholder.svg?height=1080&width=1920",
        alt: "Welcome to our company",
      },
    },
    {
      id: "content-2",
      title: "Company News",
      type: "webpage",
      duration: 60000, // in milliseconds
      content: {
        url: "https://example.com/news",
      },
    },
  ],
  "display-2": [
    {
      id: "content-3",
      title: "Menu of the Day",
      type: "image",
      duration: 45000, // in milliseconds
      content: {
        url: "/placeholder.svg?height=1080&width=1920",
        alt: "Today's menu",
      },
    },
  ],
  "display-3": [
    {
      id: "content-1",
      title: "Conference Schedule",
      type: "webpage",
      duration: 120000, // in milliseconds
      content: {
        url: "https://example.com/conference-schedule",
      },
    },
  ],
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const displayId = params.id

  // Check if display exists
  if (!displayContent[displayId]) {
    return NextResponse.json({ error: "Display not found" }, { status: 404 })
  }

  return NextResponse.json(displayContent[displayId])
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const displayId = params.id
    const data = await request.json()

    // Check if display exists
    if (!displayContent[displayId]) {
      return NextResponse.json({ error: "Display not found" }, { status: 404 })
    }

    // Update content for display
    displayContent[displayId] = data

    return NextResponse.json(displayContent[displayId])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update display content" }, { status: 500 })
  }
}

