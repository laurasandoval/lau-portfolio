import { NextSeo } from 'next-seo';
import './index.scss'
import SnappingFeed from '@/components/SnappingFeed/SnappingFeed';

export default function Photography({ videoWorkData, server }) {
    return (
        <>
            <NextSeo
                title="Laura Sandoval — Videos"
                description="Selected video works."
                openGraph={{
                    title: "Laura Sandoval — Videos",
                    description: "Selected video works.",
                    images: [
                        {
                            url: `${server}/assets/video-work/social-thumbnail.png`,
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
                    videoWorkData.map((series, seriesIndex) => {
                        return (
                            <SnappingFeed.Slide
                                type="video"
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
    const url = `${server}/api/video-work`
    const res = await fetch(url)
    const videoWorkData = await res.json()
    return { props: { videoWorkData, server } }
}