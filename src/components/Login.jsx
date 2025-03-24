import { useState, useEffect } from 'react';
import { supabase } from '../backend/SupabaseClient';

import "./Login.css"

const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Login failed:', error.message);
  } else {
    console.log('User logged in:', user);
  }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  window.location.reload();
  if (error) {
    console.error('Sign-out error:', error.message);
  } else {
    console.log('User signed out');
  }
};

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <button className='LoginButton' onClick={signOut}>{user.user_metadata.full_name.split(" ")[0] + " " + user.user_metadata.full_name.split(" ")[1].substring(0, 1) + " - Log out"}</button>
        </div>
      ) : (
        <button className='LoginButton' onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </div>
  );
}

export default Login;
