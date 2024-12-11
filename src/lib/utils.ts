import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"
import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://toadqdstdkrpfrjldpid.supabase.co', import.meta.env.VITE_API_KEY)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function supabaseInstance() { return supabase }

export function undoToast(title: string, description: string) {
  return toast(title, { description, action: { label: "undo", onClick: () => { } } })
}

export function successToast(title: string, description: string) {
  return toast.success(title, { description, action: { label: "undo", onClick: () => { } } })
}

export function warningToast(title: string, description: string) {
  return toast.warning(title, { description, action: { label: "undo", onClick: () => { } } })
}

const originalError = console.error;
export function consoleError() {
  console.error = (...args) => {
    if (/Function components cannot be given refs/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  }
}