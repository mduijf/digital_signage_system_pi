import { NextResponse } from "next/server"

// This would typically connect to a database
const displays = [
  {
    id: "display-1",
    name: "Lobby Display",
    location: "Main Entrance",
    status: "online",
    lastSeen: new Date().toISOString(),
    currentContent: "Welcome Message",
    resolution: "1920x1080",
    orientation: "landscape",
    lastPing: new Date().toISOString(),
  },
  {
    id: "display-2",
    name: "Cafeteria Display",
    location: "Cafeteria",
    status: "online",
    lastSeen: new Date().toISOString(),
    currentContent: "Menu of the Day",
    resolution: "1920x1080",
    orientation: "landscape",
    lastPing: new Date().toISOString(),
  },
  {
    id: "display-3",
    name: "Conference Room",
    location: "Meeting Room A",
    status: "offline",
    lastSeen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    currentContent: "Conference Schedule",
    resolution: "1920x1080",
    orientation: "landscape",
    lastPing: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(displays)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.location) {
      return NextResponse.json({ error: "Name and location are required" }, { status: 400 })
    }

    // Create a new display
    const newDisplay = {
      id: `display-${displays.length + 1}`,
      name: data.name,
      location: data.location,
      status: "offline",
      lastSeen: new Date().toISOString(),
      currentContent: null,
      resolution: data.resolution || "1920x1080",
      orientation: data.orientation || "landscape",
      lastPing: new Date().toISOString(),
    }

    // In a real app, you would save this to a database
    displays.push(newDisplay)

    return NextResponse.json(newDisplay, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create display" }, { status: 500 })
  }
}

