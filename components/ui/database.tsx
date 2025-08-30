import type React from "react"
import { DatabaseIcon } from "lucide-react"

export default function Database({ className, ...props }: React.ComponentProps<typeof DatabaseIcon>) {
  return <DatabaseIcon className={className} {...props} />
}
