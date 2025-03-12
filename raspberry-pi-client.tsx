"use client"

// This file would be used on the Raspberry Pi device
// It's a simple React application that displays content from the server

import { useEffect, useState, useRef } from "react"

interface ContentItem {
  id: string
  title: string
  type: "image" | "video" | "webpage"
  duration: number // in milliseconds
  content: {
    url: string
    alt?: string
  }
}

const API_URL = "https://your-signage-server.com/api"
const DISPLAY_ID = "display-1" // This would be configured on the device

function RaspberryPiClient() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Fetch content from the server
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/displays/${DISPLAY_ID}/content`)

        if (!response.ok) {
          throw new Error("Failed to fetch content")
        }

        const data = await response.json()
        setContentItems(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load content. Please check your connection.")
        setLoading(false)
        console.error("Error fetching content:", err)
      }
    }

    fetchContent()

    // Set up a periodic refresh (every 5 minutes)
    const intervalId = setInterval(fetchContent, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Handle content rotation
  useEffect(() => {
    if (contentItems.length === 0) return

    const currentItem = contentItems[currentIndex]
    const timeoutId = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length)
    }, currentItem.duration)

    return () => clearTimeout(timeoutId)
  }, [currentIndex, contentItems])

  // Ping the server to update the display's status
  useEffect(() => {
    const pingServer = async () => {
      try {
        await fetch(`${API_URL}/displays/${DISPLAY_ID}/ping`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "online",
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (err) {
        console.error("Error pinging server:", err)
      }
    }

    pingServer()

    // Ping the server every minute
    const intervalId = setInterval(pingServer, 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading content...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-screen">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    )
  }

  if (contentItems.length === 0) {
    return (
      <div className="empty-screen">
        <h1>No Content Available</h1>
        <p>Please assign content to this display from the dashboard.</p>
      </div>
    )
  }

  const currentItem = contentItems[currentIndex]

  return (
    <div className="fullscreen-container">
      {currentItem.type === "image" && (
        <img
          src={currentItem.content.url || "/placeholder.svg"}
          alt={currentItem.content.alt || currentItem.title}
          className="fullscreen-content"
        />
      )}

      {currentItem.type === "video" && (
        <video src={currentItem.content.url} autoPlay muted className="fullscreen-content" />
      )}

      {currentItem.type === "webpage" && (
        <iframe
          ref={iframeRef}
          src={currentItem.content.url}
          title={currentItem.title}
          className="fullscreen-content"
          sandbox="allow-scripts allow-same-origin"
        />
      )}
    </div>
  )
}

export default RaspberryPiClient

