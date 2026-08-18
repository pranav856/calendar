import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function useAdmin() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Check whether a Supabase Auth session already exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setIsAdminLoggedIn(!!session);
      }
    });

    // Keep React state synchronized with Supabase Auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setIsAdminLoggedIn(!!session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  };

  return {
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    login,
    logout,
  };
}