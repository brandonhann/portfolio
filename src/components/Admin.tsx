import React, { useState, useEffect } from 'react';
import '../firebase';
import { getFirestore, collection, getDocs, addDoc, query, orderBy, startAfter, limit, QueryDocumentSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

const firestore = getFirestore();
const auth = getAuth();

type Image = string;

type Post = {
    id?: string;
    title: string;
    date: string;
    image: Image;
    text: string;
};

function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString();
}

const Admin = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [newPost, setNewPost] = useState<Omit<Post, 'id'>>({ title: '', date: '', image: '', text: '' });
    const [newText, setNewText] = useState('');
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoad, setInitialLoad] = useState(false);

    const fetchPosts = async (lastDoc: QueryDocumentSnapshot | null) => {
        const postsCollection = collection(firestore, 'posts');
        let postsQuery = query(postsCollection, orderBy('date', 'desc'), limit(5));

        if (lastDoc) {
            postsQuery = query(postsCollection, orderBy('date', 'desc'), startAfter(lastDoc), limit(5));
        }

        const postsSnapshot = await getDocs(postsQuery);
        const newPosts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Post, 'id'>) }));

        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setLastDoc(postsSnapshot.docs[postsSnapshot.docs.length - 1]);
        setHasMore(postsSnapshot.docs.length === 5);
        setInitialLoad(true);
    };

    const handleSignIn = async () => {
        const email = prompt('Enter your email');
        const password = prompt('Enter your password');
        if (email && password) {
            await signInWithEmailAndPassword(auth, email, password);
        }
    };

    const handleSignOut = async () => {
        if (user) {
            await signOut(auth);
        }
    };

    const handleNewPostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPost({
            ...newPost,
            [event.target.name]: event.target.value
        });
    };

    const handleNewImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPost({
                    ...newPost,
                    image: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNewPostSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const postsCollection = collection(firestore, 'posts');
        const currentDate = new Date();
        await addDoc(postsCollection, { ...newPost, text: newText, date: currentDate.toISOString() });
        setNewPost({ title: '', date: '', image: '', text: '' });
        setNewText('');
        fetchPosts(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            if (user) {
                fetchPosts(null);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <div className="container mx-auto px-4 overflow-y-hidden">
            {user ? (
                <div>
                    <div className='flex items-center justify-center my-4'>
                        <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
                    </div>
                    <form onSubmit={handleNewPostSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Title:
                                <input type="text" name="title" value={newPost.title} onChange={handleNewPostChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Image:
                                <input type="file" accept="image/*" onChange={handleNewImageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Text:
                                <textarea
                                    name="text"
                                    value={newText}
                                    onChange={e => setNewText(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </label>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </form>
                    {posts.map(post => (
                        <article className="w-full md:w-3/4 m-auto rounded-lg border border-gray-300 p-4 bg-gray-100 mb-8">
                            <header className='flex flex-col items-start'>
                                <h2 className="text-xl font-semibold mt-4">{post.title}</h2>
                                <time dateTime={post.date} className="text-sm text-gray-500 mt-1">{formatDate(post.date)}</time>
                            </header>
                            <div className="my-4">
                                {post.image &&
                                    <figure className="float-none md:float-left mx-auto md:mx-0 mb-4 md:mb-2 md:mr-4">
                                        <img className="w-full h-80 md:w-80 md:h-80 object-cover rounded-md border border-gray-300" src={post.image} alt={post.title} />
                                        <figcaption className="hidden">{post.title}</figcaption>
                                    </figure>}
                                <p className="text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>{post.text}</p>
                            </div>
                        </article>
                    ))}
                    {initialLoad && hasMore && <button onClick={() => fetchPosts(lastDoc)} className="bg-blue-500 text-white rounded px-4 py-2">Load More</button>}
                </div>
            ) : (
                <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
            )}
        </div>
    );
};

export default Admin;