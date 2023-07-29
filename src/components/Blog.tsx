import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../firebase';
import { getFirestore, collection, query, orderBy, startAfter, limit, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';

const firestore = getFirestore();

type Post = {
    title: string;
    date: string;
    text: string;
    image: string;
};

type BlogPostProps = Post & {
    delay: number;
};

function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString();
}

export const BlogPost = ({ title, date, text, image, delay }: BlogPostProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    const postTitleURL = encodeURIComponent(title.replace(/ /g, '-'));

    return (
        <article className={`w-3/4 m-auto rounded-lg border border-gray-300 p-4 bg-gray-100 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <header>
                <Link to={`/blog/${postTitleURL}`}>
                    <h2 className="text-xl font-semibold mt-4">{title}</h2>
                </Link>
                <time dateTime={date} className="text-sm text-gray-500">{formatDate(date)}</time>
            </header>
            <div className="flex flex-wrap">
                {image &&
                    <figure>
                        <img className="w-48 h-48 object-cover rounded-md mr-4" src={image} alt={title} />
                        <figcaption>{title}</figcaption>
                    </figure>}
                <p className="mt-2 text-gray-700">{text}</p>
            </div>
        </article>
    );
};

const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([]);
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
        const newPosts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Post) }));

        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setLastDoc(postsSnapshot.docs[postsSnapshot.docs.length - 1]);
        setHasMore(postsSnapshot.docs.length === 5);
        setInitialLoad(true);
    };

    useEffect(() => {
        fetchPosts(null);
    }, []);

    const delay = 200;

    return (
        <div className="flex flex-col items-center space-y-4 overflow-y-hidden">
            {posts.map((post, index) => (
                <BlogPost key={index} {...post} delay={delay} />
            ))}
            {initialLoad && hasMore && <button onClick={() => fetchPosts(lastDoc)} className="bg-blue-500 text-white rounded px-4 py-2">Load More</button>}
        </div>
    );
};

export default Blog;