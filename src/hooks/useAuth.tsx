
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name: string | null;
  role: 'admin' | 'facilitator' | 'participant' | 'guest';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            console.log('Fetching profile for user:', session.user.id);
            
            // First check if user exists in profiles table
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (profileError && profileError.code === 'PGRST116') {
              // User doesn't exist in profiles, check user_roles table
              console.log('User not found in profiles, checking user_roles table');
              const { data: userRoleData, error: userRoleError } = await supabase
                .from('user_roles')
                .select('*')
                .eq('email', session.user.email)
                .single();
              
              if (userRoleData && !userRoleError) {
                console.log('Found user in user_roles:', userRoleData);
                // Create profile from user_roles data
                const { error: insertError } = await supabase
                  .from('profiles')
                  .insert([{
                    id: session.user.id,
                    full_name: userRoleData.name,
                    role: userRoleData.role
                  }]);
                
                if (!insertError) {
                  setProfile({
                    id: session.user.id,
                    full_name: userRoleData.name,
                    role: userRoleData.role as 'admin' | 'facilitator' | 'participant' | 'guest',
                    created_at: userRoleData.created_at,
                    updated_at: userRoleData.updated_at || userRoleData.created_at
                  });
                }
              }
            } else if (profileData) {
              console.log('Profile data:', profileData);
              // Type cast the role to ensure it matches our Profile interface
              setProfile({
                ...profileData,
                role: profileData.role as 'admin' | 'facilitator' | 'participant' | 'guest'
              });
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName
        }
      }
    });

    // If signup is successful, add user to user_roles table with participant role
    // NOTE: Do NOT set last_active - this will be set when admin approves
    if (!error) {
      console.log('Adding user to user_roles table for approval:', { name: fullName, email });
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{
          name: fullName,
          email: email,
          password: password,
          role: 'participant',
          permissions: ['view_content']
          // Explicitly NOT setting last_active - this indicates pending approval
        }]);
      
      if (roleError) {
        console.error('Error adding user to roles table:', roleError);
      } else {
        console.log('User added to roles table successfully - pending admin approval');
      }
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = profile?.role === 'admin';

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
