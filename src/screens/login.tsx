import { useState } from "react"
import { undoToast } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signIn, signUp } from "@/hooks/authProvider"
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
        console.log(register)


        if (register.error)
            return undoToast("Failed to Register", register.error.message)


        undoToast("Registered!", "You are now connected to the project.")
    }


    return (<div className="flex flex-col gap-8 items-center justify-center h-screen">

        <h1 className="text-3xl">Using Supabase</h1>

        <Tabs defaultValue="login" className="w-[400px]">
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
                    <CardFooter>
                        <Button onClick={login}>Confirm</Button>
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
                    <CardFooter>
                        <Button onClick={register}>Register</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

        </Tabs>

    </div>)
}