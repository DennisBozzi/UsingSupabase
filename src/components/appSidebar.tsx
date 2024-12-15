import { Home, LogOut, Package, Settings } from "lucide-react"
import { RiSupabaseFill } from "react-icons/ri";
import { signOut } from "@/hooks/authProvider";
import { Link, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Storage",
    url: "/storage",
    icon: Package,
  }
]

export function AppSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const markedClass = 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8';
  const notMarkedClass = 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8';
  const isMarked = (path: string) => pathname === path ? markedClass : notMarkedClass;

  return (
    <>
      <aside className="h-lvh sm:flex inset-y-0 left-0 z-10 flex-col border-r bg-background hidden">
        
        {/* Body */}
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link to='/home' className="group flex h-9 w-9 shrink-0 items-center justify-center 
          gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 
          md:w-8 md:text-base">
            <RiSupabaseFill className="h-5 w-5" />
          </Link>

          {items.map((item, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <Link to={item.url} className={isMarked(item.url)} >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {/* Footer */}
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to={'#'} className={isMarked('')} onClick={() => ('')}>
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Link to={''} className={isMarked('')}>
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Exit</span>
                  </Link>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Exit</DialogTitle>
                    <DialogDescription>
                      Do you really want to leave?
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button onClick={signOut}>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </>
  )
}
