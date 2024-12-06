import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { sign } from 'crypto';

const apiKey = import.meta.env.VITE_API_KEY;
const supabase = createClient('https://toadqdstdkrpfrjldpid.supabase.co', apiKey)

export default function App() {

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function signIn(email: string, password: string) {
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  }

  if (!session) {
    return (
      <button type='button' className='bg-slate-700' onClick={() => signIn('dennisbozzii@gmail.com', 'dennis123')}>
        Login
      </button>)
  } else {
    return (<>
      <div>Logged in!</div>
      <button type="button" onClick={() => { signOut() }}>Logout</button>
    </>)
  }
}