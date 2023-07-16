import React, { useState, useEffect } from 'react';
import '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

const firestore = getFirestore();
const auth = getAuth();

type Post = {
    id?: string;
    title: string;
    date: string;
    content: string;
    image: string;
    delay: number;
};

const Admin = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);

    // Fetch posts
    const fetchPosts = async () => {
        const postsCollection = collection(firestore, 'posts');
        const postsSnapshot = await getDocs(postsCollection);
        setPosts(postsSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Post, 'id'>) })));
    };

    // Handle sign in
    const handleSignIn = async () => {
        const email = prompt('Enter your email');
        const password = prompt('Enter your password');
        if (email && password) {
            await signInWithEmailAndPassword(auth, email, password);
        }
    };

    // Handle sign out
    const handleSignOut = async () => {
        if (user) {
            await signOut(auth);
        }
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            if (user) {
                fetchPosts();
            }
        });

        return unsubscribe;
    }, []);

    // Render
    return (
        <div>
            {user ? (
                <div>
                    <button onClick={handleSignOut}>Sign Out</button>
                    {posts.map(post => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.date}</p>
                            <p>{post.content}</p>
                            {/* delete buttons here */}
                        </div>
                    ))}
                    {/* creating new post here */}
                </div>
            ) : (
                <button onClick={handleSignIn}>Sign In</button>
            )}
        </div>
    );
};

export default Admin;