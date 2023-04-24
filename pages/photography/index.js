import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { NextSeo } from 'next-seo';
import './index.scss'
import { useEffect } from 'react';

export default function Photography({ photographyWorkData, server }) {

    useEffect(() => {
        document.body.classList.add('photography_page');

        return () => {
            document.body.classList.remove('photography_page');
        }
    }, [])

    return (
        <>
            <NextSeo
                title="Laura Sandoval — Photography"
                description="Selected photography work."
                openGraph={{
                    title: "Laura Sandoval — About",
                    description: "Selected photography work.",
                    images: [
                        {
                            url: `${server}/social-thumbnail.png`,
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

            <GlobalHeader />

            <div className="fullscreen_sticky_scroll">
                {
                    photographyWorkData.map((image, index) => {
                        return (
                            <div className="slide">
                                <div className="image_container" key={index}>
                                    <img className="app_icon" alt={image.alt} src={`/assets/photography-work/${image.src}`} />
                                    <p>{image.place}, {image.year}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
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