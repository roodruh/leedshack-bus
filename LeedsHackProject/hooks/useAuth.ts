import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'; 
import { FIREBASE_AUTH } from '../firebase';

export function useUserAuth() { 
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('Got user:', user);
            if (user) { 
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsub(); 
    }, []);

    return { user }; 
}