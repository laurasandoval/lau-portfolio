import { NextSeo } from 'next-seo';
import SnappingFeed from '@/components/SnappingFeed/SnappingFeed';
import { useEffect, useState } from 'react';
import MobileRedirect from '@/components/MobileRedirect/MobileRedirect';

export default function Photography({ videoWorkData, server }) {
    const [allVideosAreMuted, setAllVideosAreMuted] = useState(true);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 851);
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <NextSeo
                title="Laura Sandoval — Videos"
                description="Selected video works from 2018 onwards."
                openGraph={{
                    title: "Laura Sandoval — Videos",
                    description: "Selected video works from 2018 onwards.",
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
                additionalMetaTags={[
                    {
                        name: "theme-color",
                        content: "#000000",
                    },
                ]}
            />

            {isMobile ? (
                <SnappingFeed>
                    {
                        videoWorkData.map((series, seriesIndex) => {
                            return (
                                <SnappingFeed.Slide
                                    type="video"
                                    key={seriesIndex}
                                    series={series}
                                    lazyLoad={seriesIndex != 0}
                                    allVideosAreMuted={allVideosAreMuted}
                                    setAllVideosAreMuted={setAllVideosAreMuted}
                                    slideIndex={seriesIndex + 1}
                                />
                            )
                        })
                    }
                </SnappingFeed>
            ) : (
                <>
                    <SnappingFeed.GlobalHeader />
                    <MobileRedirect
                        title="Continue on your phone"
                        body="Please continue on your phone for the best experience."
                        url="https://lau.work/videos"
                    />
                </>
            )}
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