import { NextSeo } from 'next-seo';
import './index.scss'
import PhotographyPageHeader from './PhotographyPageHeader/PhotographyPageHeader';

export default function Photography({ photographyWorkData, server }) {
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

            <PhotographyPageHeader />

            <div className="photography_page">
                {
                    photographyWorkData.map((image, index) => {
                        return (
                            <div className="slide" key={index}>
                                <div
                                    className="image"
                                    style={{
                                        backgroundImage: `url(/assets/photography-work/${image.src})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat"
                                    }}
                                />
                                <div className="caption_container">
                                    <p className="caption">{image.place}, {image.year}</p>
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