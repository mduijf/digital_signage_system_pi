"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, FileImage, FileVideo, Globe, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewContentPage() {
  const [contentType, setContentType] = useState("image")

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
          <h1 className="text-xl font-semibold">Add New Content</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>Enter the details for your new content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter content title" />
              </div>

              <div className="grid gap-2">
                <Label>Content Type</Label>
                <RadioGroup defaultValue="image" onValueChange={setContentType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <Label htmlFor="image" className="flex items-center gap-2 cursor-pointer">
                      <FileImage className="h-4 w-4" />
                      Image
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="flex items-center gap-2 cursor-pointer">
                      <FileVideo className="h-4 w-4" />
                      Video
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="webpage" id="webpage" />
                    <Label htmlFor="webpage" className="flex items-center gap-2 cursor-pointer">
                      <Globe className="h-4 w-4" />
                      Web Page
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Input id="duration" type="number" min="5" defaultValue="30" />
              </div>

              <Separator />

              <Tabs defaultValue={contentType} value={contentType} onValueChange={setContentType}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="webpage">Web Page</TabsTrigger>
                </TabsList>
                <TabsContent value="image" className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Upload Image</Label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer hover:bg-muted/50">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Drag and drop an image or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG or GIF, max 10MB</p>
                      <Input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="alt-text">Alt Text</Label>
                    <Input id="alt-text" placeholder="Describe the image for accessibility" />
                  </div>
                </TabsContent>
                <TabsContent value="video" className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Upload Video</Label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer hover:bg-muted/50">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Drag and drop a video or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-1">MP4, WebM or AVI, max 100MB</p>
                      <Input type="file" className="hidden" accept="video/*" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="webpage" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="url">Web Page URL</Label>
                    <Input id="url" placeholder="https://example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="refresh-rate">Refresh Rate (seconds)</Label>
                    <Input id="refresh-rate" type="number" min="0" defaultValue="0" />
                    <p className="text-xs text-muted-foreground">Set to 0 for no refresh</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button>Create Content</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How your content will appear</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-md border bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  {contentType === "image" && <FileImage className="h-12 w-12 text-muted-foreground" />}
                  {contentType === "video" && <FileVideo className="h-12 w-12 text-muted-foreground" />}
                  {contentType === "webpage" && <Globe className="h-12 w-12 text-muted-foreground" />}
                </div>
                <div className="absolute bottom-2 right-2">
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    <span>30s</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

