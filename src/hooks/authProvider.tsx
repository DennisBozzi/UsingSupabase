import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabaseInstance } from '@/lib/utils';

const supabase = supabaseInstance();

function useAuth() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const { data: { subscription } } =
            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session)
            })

        return () => {
            if (subscription) {
                subscription.unsubscribe()
            }
        }
    }, [])

    return session
}

async function signOut() {
    await supabase.auth.signOut()
}

async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    return { data, error };
}

async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    return { data, error }
}

async function signInGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })
    return { data, error };
}

async function signInGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
    })
    return { data, error };
}

export {  useAuth, signOut, signIn, signUp, signInGoogle, signInGitHub }