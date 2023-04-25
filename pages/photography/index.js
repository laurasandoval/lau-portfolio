import { NextSeo } from 'next-seo';
import './index.scss'
import PhotographyPageHeader from './PhotographyPageHeader/PhotographyPageHeader';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { IconCalendar, IconLocation } from '@tabler/icons-react';
import PhotographyPageSlide from './PhotographyPageSlide/PhotographyPageSlide';

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
                <div className="main_vertical_slider">
                    {
                        photographyWorkData.map((series, index) => {
                            return (
                                <PhotographyPageSlide
                                    key={index}
                                    series={series}
                                />
                            )
                        })
                    }
                </div>
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