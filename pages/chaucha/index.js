import { NextSeo } from 'next-seo'

export default function Chaucha() {
    return (
        <>
            <NextSeo
                title="Chaucha"
                description="Transfiere más rápido."
                openGraph={{
                    title: "Chaucha",
                    description: "Transfiere más rápido.",
                    images: [
                        {
                            url: "/chaucha/social-thumbnail.png",
                            width: 1200,
                            height: 630,
                            type: "image/png",
                        }
                    ],
                }}
                twitter={{
                    handle: "@chauchaapp",
                    cardType: "summary_large_image",
                }}
                additionalLinkTags={[
                    {
                        rel: "icon",
                        href: "/favicon.ico",
                    },
                    {
                        rel: "apple-touch-icon",
                        href: "/logo192.png"
                    }
                ]}
                additionalMetaTags={[
                    {
                        name: "theme-color",
                        content: "#000000",
                    },
                ]}
            />
        </>
    )
}

export async function getServerSideProps() {
    return {
        redirect: {
            destination: "https://apps.apple.com/cl/app/chaucha-transfiere-m%C3%A1s-r%C3%A1pido/id6477750470",
            permanent: true,
        },
    }
}