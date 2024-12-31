import { getAllWorkTypes, getPostsByWorkType } from '@/lib/posts'
import ProjectCollection from '@/components/ProjectCollection/ProjectCollection'
import { normalizeForUrl } from '@/lib/formatters';

export default function WorkTypePage({ type, posts, server }) {
    const _normalizedDisciplineName = () => {
        const cleanedDisciplineName = type.replaceAll("-", " ");
        const words = cleanedDisciplineName.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(" ");
    }

    const _disciplineDisplayName = () => {
        if (!posts[0].workType) {
            return _normalizedDisciplineName()
        }

        const matchingDiscipline = posts[0].workType.find(sector =>
            normalizeForUrl(sector) === type
        );

        return matchingDiscipline || _normalizedDisciplineName();
    }

    return (
        <ProjectCollection
            title={_disciplineDisplayName()}
            posts={posts}
            server={server}
            description={`${_disciplineDisplayName()} projects by Laura Sandoval.`}
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
                : 'https://lausandoval.com',
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