import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signOut } from "@/hooks/authProvider"
import { Button } from "@/components/ui/button"
import { HiOutlineLogout } from "react-icons/hi";
import { insertItem } from "@/hooks/storageProvider"

export default function Home() {

    const [file, setFile] = useState<File | null>(null)
    const [fileUrl, setFileUrl] = useState('')

    useEffect(() => {
        if (file)
            setFileUrl(URL.createObjectURL(file))
    }, [file])

    return (<div className="p-4">

        <Button variant='ghost' className="rotate-180" size='icon' onClick={signOut}><HiOutlineLogout/></Button>

        <div className="flex flex-col items-center gap-4">
            <Label className="w-[168px] h-[128px] border-white cursor-pointer border-2 border-dashed rounded-2xl relative 
            flex items-center justify-center hover:border-white/50 hover:text-white/50 transition duration-150"
                htmlFor="fileInput">
                <img src={fileUrl} className={`w-full h-full p-2 rounded-2xl object-cover ${fileUrl ? '' : 'hidden'}`} alt="" />
                <p className={` ${fileUrl ? 'hidden' : ''}`} >Upload Photo</p>

            </Label>
            <Input type="file" id="fileInput" className="hidden" onChange={(e) => {
                setFile(e.target.files ? e.target.files[0] : null)
            }} />


        </div>

    </div>)
}