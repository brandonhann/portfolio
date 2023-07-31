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
        <article className={`w-full md:w-3/4 m-auto rounded-lg border border-gray-300 p-4 bg-gray-100 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <header className='flex flex-col items-start'>
                <Link to={`/blog/${postTitleURL}`}>
                    <h2 className="text-xl font-semibold mt-4 hover:underline">{title}</h2>
                </Link>
                <h3 className="text-md font-medium  mt-1">By Brandon Hann</h3>
                <time dateTime={date} className="text-sm text-gray-500 mt-1">{formatDate(date)}</time>
            </header>
            <div className="my-4">
                {image &&
                    <figure className="float-none md:float-left mx-auto md:mx-0 mb-4 md:mb-2 md:mr-4">
                        <img className="w-full h-80 md:w-80 md:h-80 object-cover rounded-md border border-gray-300" src={image} alt={title} />
                        <figcaption className="hidden">{title}</figcaption>
                    </figure>}
                <p className="text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
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