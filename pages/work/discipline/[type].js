import { getAllWorkTypes, getPostsByWorkType } from '@/lib/posts'
import ProjectCollection from '@/components/ProjectCollection/ProjectCollection'

export default function WorkTypePage({ type, posts, server }) {
    const displayTitle = type
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <ProjectCollection
            title={displayTitle}
            posts={posts}
            server={server}
            description={`Projects in ${displayTitle} by Laura Sandoval`}
        />
    )
}

export async function getStaticProps({ params }) {
    const { type } = params;
    const posts = getPostsByWorkType(type);

    if (!posts.length) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            type,
            posts,
            server: process.env.NODE_ENV !== 'production'
                ? 'http://localhost:3000'
                : 'https://lau.work',
        },
        // Revalidate every hour
        revalidate: 3600
    }
}

export async function getStaticPaths() {
    const workTypes = getAllWorkTypes();

    const paths = workTypes.map(type => ({
        params: { type }
    }));

    return {
        paths,
        fallback: false
    }
} 