import { NextSeo } from 'next-seo'

export default function Balance() {
    return (
        <>
            <NextSeo
                title="Balance"
                description="Agrega tus tarjetas de transporte público y obtén el saldo de tu Bip, viaja en el Metro de Santiago o en las micros Red con tu Bip QR, y más."
                openGraph={{
                    title: "Balance",
                    description: "Agrega tus tarjetas de transporte público y obtén el saldo de tu Bip, viaja en el Metro de Santiago o en las micros Red con tu Bip QR, y más.",
                    images: [
                        {
                            url: "/balance/social-thumbnail.png",
                            width: 1200,
                            height: 630,
                            type: "image/png",
                        }
                    ],
                }}
                twitter={{
                    handle: "@balanceappcl",
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
            />
        </>
    )
}

export async function getServerSideProps() {
    return {
        redirect: {
            destination: "https://apps.apple.com/cl/app/balance-for-your-bip-card/id1532939978",
            permanent: true,
        },
    }
}