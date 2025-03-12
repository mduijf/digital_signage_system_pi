import Link from "next/link"
import { Circle, MoreHorizontal } from "lucide-react"

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

interface DisplayCardProps {
  id: string
  name: string
  location: string
  status: "online" | "offline"
  lastSeen: string
  currentContent: string
}

export function DisplayCard({ id, name, location, status, lastSeen, currentContent }: DisplayCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
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
            <DropdownMenuItem>Edit display</DropdownMenuItem>
            <DropdownMenuItem>Assign content</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete display</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <Badge variant={status === "online" ? "default" : "secondary"} className="mr-2">
              <Circle
                className={`mr-1 h-2 w-2 fill-current ${status === "online" ? "text-green-400" : "text-gray-400"}`}
              />
              {status === "online" ? "Online" : "Offline"}
            </Badge>
            <span className="text-xs text-muted-foreground">Last seen: {lastSeen}</span>
          </div>
          <p className="text-xs text-muted-foreground">Location: {location}</p>
          <p className="text-xs text-muted-foreground">Current content: {currentContent}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/displays/${id}`}>Manage</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

