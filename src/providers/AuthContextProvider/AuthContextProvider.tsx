import React, { createContext, useContext, useEffect, useState } from "react";

import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "~/utils/supabase-client";

export const AuthContext = createContext<{
    user: User | null;
    session: Session | null;
    isLoading: boolean;
}>({
    user: null,
    session: null,
    isLoading: true,
});

export const AuthContextProvider = (props: any) => {
    const [userSession, setUserSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        void supabase.auth.getSession().then(({ data: { session } }) => {
            setUserSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log(`Supabase auth event: ${event}`);
                setUserSession(session);
                setUser(session?.user ?? null);
                setIsLoading(false);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const value = {
        userSession,
        user,
        isLoading,
    };
    return <AuthContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a AuthContextProvider.");
    }
    return context;
};
