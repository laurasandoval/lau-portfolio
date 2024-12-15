import { getAllSectors, getPostsBySector } from '@/lib/posts'
import { normalizeForUrl } from '@/lib/formatters'
import ProjectCollection from '@/components/ProjectCollection/ProjectCollection'

export default function SectorPage({ type, posts, server }) {
    const _normalizedSectorName = () => {
        const cleanedSectorName = type.replaceAll("-", " ");
        const words = cleanedSectorName.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(" ");
    }

    const _sectorDisplayName = () => {
        if (!posts[0].clientSector) {
            return _normalizedSectorName()
        }

        const matchingSector = posts[0].clientSector.find(sector =>
            normalizeForUrl(sector) === type
        );

        return matchingSector || _normalizedSectorName();
    }

    return (
        <ProjectCollection
            title={_sectorDisplayName()}
            posts={posts}
            server={server}
            description={`${_sectorDisplayName()} projects by Laura Sandoval.`}
        />
    )
}

export async function getStaticProps({ params }) {
    const { type } = params;
    const posts = getPostsBySector(type);

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
    const sectors = getAllSectors();

    const paths = sectors.map(type => ({
        params: { type }
    }));

    return {
        paths,
        fallback: false
    }
}