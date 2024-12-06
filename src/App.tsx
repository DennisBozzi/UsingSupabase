import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://toadqdstdkrpfrjldpid.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWRxZHN0ZGtycGZyamxkcGlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzQ1MDY0NCwiZXhwIjoyMDQ5MDI2NjQ0fQ.Xjnepmzm4DNHNh1hpYmGvBZ9RLCp-YpSedMzMOyKpkk')

  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(`API Key: ${apiKey}`);
  
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

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  } else {
    return (<>
      <div>Logged in!</div>
      <button type="button" onClick={() => { signOut() }}>Logout</button>
    </>)
  }
}