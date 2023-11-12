import GenericContainer from '@/components/GenericContainer/GenericContainer'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import './index.scss'
import Button from '@/components/Button/Button'
import { NextSeo } from 'next-seo'

export default function Custom404() {
    return (
        <>
            <NextSeo
                title={`Page Not Found — Laura Sandoval`}
                description={`The link you followed may be broken, or the page may have been removed.`}
                openGraph={{
                    title: `Page Not Found — Laura Sandoval`,
                    description: `The link you followed may be broken, or the page may have been removed.`,
                    images: [
                        {
                            url: `https://lau.work/social-thumbnail.png`,
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
                        href: `https://lau.work/favicon.ico`,
                    },
                    {
                        rel: "apple-touch-icon",
                        href: `https://lau.work/logo192.png`
                    }
                ]}
                additionalMetaTags={[
                    {
                        name: "theme-color",
                        content: "#000000",
                    },
                ]}
            />

            <GlobalHeader />
            <GenericContainer className="page-container">
                <div className="text-container">
                    <h1 className="title">Page Not Found</h1>
                    <h2 className="subtitle">The link you followed may be broken, or the page may have been removed.</h2>
                    <Button
                        type="primary"
                        link={true}
                        href="/"
                        label="Go Home"
                    />
                </div>
            </GenericContainer>
        </>
    )
}