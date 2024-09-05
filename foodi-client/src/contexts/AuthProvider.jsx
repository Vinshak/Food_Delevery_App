import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create an account
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign up with Gmail
    const signUpWithGmail = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Login using email and password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout
    const logOut = () => {
        return signOut(auth);
    };

    // Update profile
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
    };

    // Check signed in users
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading, // Include loading in the authInfo object
        createUser,
        signUpWithGmail,
        login,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
