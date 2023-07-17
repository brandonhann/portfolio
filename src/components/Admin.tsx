import React, { useState, useEffect } from 'react';
import '../firebase';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
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
    const [newPost, setNewPost] = useState<Omit<Post, 'id'>>({ title: '', date: '', content: '', image: '', delay: 0 });

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

    // Handle new post form change
    const handleNewPostChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPost({
            ...newPost,
            [event.target.name]: event.target.value
        });
    };

    // Handle new post form submit
    const handleNewPostSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const postsCollection = collection(firestore, 'posts');
        await addDoc(postsCollection, newPost);
        setNewPost({ title: '', date: '', content: '', image: '', delay: 0 });
        fetchPosts();
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
                    <form onSubmit={handleNewPostSubmit}>
                        <label>
                            Title:
                            <input type="text" name="title" value={newPost.title} onChange={handleNewPostChange} required />
                        </label>
                        <label>
                            Date:
                            <input type="text" name="date" value={newPost.date} onChange={handleNewPostChange} required />
                        </label>
                        <label>
                            Content:
                            <textarea name="content" value={newPost.content} onChange={handleNewPostChange} required />
                        </label>
                        <label>
                            Image URL:
                            <input type="text" name="image" value={newPost.image} onChange={handleNewPostChange} required />
                        </label>
                        <label>
                            Delay:
                            <input type="number" name="delay" value={newPost.delay} onChange={handleNewPostChange} required />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    {posts.map(post => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.date}</p>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <button onClick={handleSignIn}>Sign In</button>
            )}
        </div>
    );
};

export default Admin;