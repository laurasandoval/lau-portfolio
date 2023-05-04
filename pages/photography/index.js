import { NextSeo } from 'next-seo';
import SnappingFeed from '@/components/SnappingFeed/SnappingFeed';

export default function Photography({ photographyWorkData, server }) {
    return (
        <>
            <NextSeo
                title="Laura Sandoval — Photography"
                description="Selected photography works."
                openGraph={{
                    title: "Laura Sandoval — Photography",
                    description: "Selected photography works.",
                    images: [
                        {
                            url: `${server}/assets/photography-work/social-thumbnail.png`,
                            width: 1200,
                            height: 630,
                            type: "image/png",
                        }
                    ],
                }}
                twitter={{
                    handle: "@laurasideral",
                    cardType: "summary_large_image",
                }}
                additionalLinkTags={[
                    {
                        rel: "icon",
                        href: `${server}/favicon.ico`,
                    },
                    {
                        rel: "apple-touch-icon",
                        href: `${server}/logo192.png`
                    }
                ]}
            />

            <SnappingFeed>
                {
                    photographyWorkData.map((series, seriesIndex) => {
                        return (
                            <SnappingFeed.Slide
                                type="image"
                                key={seriesIndex}
                                series={series}
                                lazyLoad={seriesIndex != 0}
                            />
                        )
                    })
                }
            </SnappingFeed>
        </>
    )
}

export async function getServerSideProps(context) {
    const dev = process.env.NODE_ENV !== 'production'
    const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
    const url = `${server}/api/photography-work`
    const res = await fetch(url)
    const photographyWorkData = await res.json()
    return { props: { photographyWorkData, server } }
}