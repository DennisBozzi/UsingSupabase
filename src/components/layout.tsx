import { AppSidebar } from "@/components/appSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar children={children} />

    </div>
  )
}