import Link from "next/link"
import Image from "next/image"
import { Clock, FileType2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ContentCardProps {
  id: string
  title: string
  type: "image" | "video" | "webpage"
  duration: string
  createdAt: string
  thumbnail: string
}

export function ContentCard({ id, title, type, duration, createdAt, thumbnail }: ContentCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit content</DropdownMenuItem>
            <DropdownMenuItem>Assign to displays</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete content</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
          <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover rounded-md" />
          <Badge className="absolute top-2 right-2" variant="secondary">
            <FileType2 className="mr-1 h-3 w-3" />
            {type}
          </Badge>
          <Badge className="absolute bottom-2 left-2" variant="outline">
            <Clock className="mr-1 h-3 w-3" />
            {duration}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <span className="text-xs text-muted-foreground">Created: {createdAt}</span>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/content/${id}`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

