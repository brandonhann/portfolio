import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { BlogPost } from './Blog';

const firestore = getFirestore();

type Post = {
    title: string;
    date: string;
    text: string;
    image: string;
};

const BlogPostPage = () => {
    const { title: encodedTitle } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (encodedTitle) {
                const title = decodeURIComponent(encodedTitle).replace(/-/g, ' ');
                const postsCollection = collection(firestore, 'posts');
                const postsQuery = query(postsCollection, where('title', '==', title));
                const postsSnapshot = await getDocs(postsQuery);
                if (!postsSnapshot.empty) {
                    const post = postsSnapshot.docs[0];
                    setPost(post.data() as Post);
                } else {
                    console.log(`No post found with title: ${title}`);
                }
            } else {
                console.log('No encoded title provided');
            }
        };

        fetchPost().catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [encodedTitle]);


    if (!post) {
        return (
            <div className='flex justify-center'>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <BlogPost {...post} delay={0} />
    );
};

export default BlogPostPage;
