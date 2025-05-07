'use client'

import { useState } from 'react';
import { supabase } from '@/app/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (!error) router.push('/chat');
    else alert(error.message);
  };

  return (
    <div className="p-8 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">{isSignUp ? 'Sign Up' : 'Log In'}</h1>
      <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="input mt-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn mt-4 w-full" onClick={handleAuth}>{isSignUp ? 'Sign Up' : 'Log In'}</button>
      <p className="mt-2 text-sm cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
      </p>
    </div>
  );
}
