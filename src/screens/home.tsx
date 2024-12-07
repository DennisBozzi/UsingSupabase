import { Button } from "@/components/ui/button"
import { signOut } from "@/hooks/authProvider"

export default function Home() {
    return (<>
        <Button variant='ghost' onClick={() => { signOut() }}>Sign Out</Button>
    </>)
}