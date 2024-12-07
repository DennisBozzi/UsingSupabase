import { useState } from "react"
import { undoToast } from "@/lib/utils"
import { FcGoogle } from "react-icons/fc"
import { GrGithub } from "react-icons/gr"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signIn, signUp, signInGoogle, signInGitHub } from "@/hooks/authProvider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const login = async () => {
        const login = await signIn(email, password);

        if (login.error)
            return undoToast("Failed to Connect", login.error.message)

        undoToast("Connected!", "You are now connected to the project.")
    }

    const register = async () => {
        const register = await signUp(newEmail, newPassword);

        if (register.error)
            return undoToast("Failed to Register", register.error.message)

        undoToast("Registered!", "Check your email to confirm your account.")
    }

    return (<div className="w-screen h-screen flex items-center justify-center relative">

        <Tabs defaultValue="login" className="w-[400px] relative px-1">
            <div className="flex gap-4 items-center text-3xl absolute -top-24 right-16">
                <img src="supabase-logo-icon.png" alt="Supabase" className="w-16 h-16" />
                Using Supabase
            </div>

            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Enter your credentials to access the project.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" placeholder="login@email.com"
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="••••••••"
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className='w-full' onClick={login}>Confirm</Button>
                        <p>or</p>
                        <Button className='w-full mb-2' variant='outline' onClick={signInGoogle}> <FcGoogle /> Log In with Google</Button>
                        <Button className='w-full' variant='outline' onClick={signInGitHub}> <GrGithub /> Log In with GitHub</Button>

                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Create your account here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="newEmail">E-mail</Label>
                            <Input id="newEmail" placeholder="register@email.com"
                                onChange={(e) => { setNewEmail(e.target.value) }} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="newPassword">Password</Label>
                            <Input id="newPassword" type="password" placeholder="••••••••"
                                onChange={(e) => { setNewPassword(e.target.value) }} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className='w-full' onClick={register}>Register</Button>
                        <p>or</p>
                        <Button className='w-full mb-2' variant='outline' onClick={signInGoogle}> <FcGoogle /> Register with Google</Button>
                        <Button className='w-full' variant='outline' onClick={signInGitHub}> <GrGithub /> Register with GitHub</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

        </Tabs>

    </div>)
}