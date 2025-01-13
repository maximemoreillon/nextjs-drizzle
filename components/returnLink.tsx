import { MoveLeft } from "lucide-react"
import Link from "next/link"

export default function ReturnLink() {
  return (
    <Link href="/items" className="flex items-center gap-2">
      <MoveLeft />
      <span>Return to items list</span>
    </Link>
  )
}
