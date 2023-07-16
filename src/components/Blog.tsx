import React, { useEffect, useState } from 'react';
import '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firestore = getFirestore();

type Post = {
    title: string;
    date: string;
    content: string;
    image: string;
    delay: number;
};

const BlogPost = ({ title, date, content, image, delay }: Post) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`rounded-lg border border-gray-300 p-4 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <img className="w-full h-64 object-cover rounded-md" src={image} alt={title} />
            <h2 className="text-xl font-semibold mt-4">{title}</h2>
            <p className="text-sm text-gray-500">{date}</p>
            <p className="mt-2 text-gray-700">{content}</p>
        </div>
    );
};

const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsCollection = collection(firestore, 'posts');
            const postsSnapshot = await getDocs(postsCollection);
            setPosts(postsSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Post) })));
        };

        fetchPosts();
    }, []);

    return (
        <div className="space-y-4">
            {posts.map((post, index) => (
                <BlogPost key={index} {...post} />
            ))}
        </div>
    );
};

export default Blog;
