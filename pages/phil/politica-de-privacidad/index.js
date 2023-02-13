import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import GenericContainer from '@/components/GenericContainer/GenericContainer'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { NextSeo } from 'next-seo'
import './index.scss'

export default function PhilPrivacyPolicy({ server }) {
    return (
        <>
            <NextSeo
                title="Phil — Política de privacidad"
                description="Phil no recopila ningún tipo de información sobre ti, tus tarjetas, o el uso que le das a la app."
                openGraph={{
                    title: "Phil — Política de privacidad",
                    description: "Phil no recopila ningún tipo de información sobre ti, tus tarjetas, o el uso que le das a la app.",
                    images: [
                        {
                            url: `${server}/phil/social-thumbnail.png`,
                            width: 1200,
                            height: 630,
                            type: "image/png",
                        }
                    ],
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

            <GlobalHeader sticky backgroundColor="#fafafa" />

            <GenericContainer className="balance_privacy_policy">
                <a href="/balance">
                    <img className="app_icon" alt="App Icon" src="/assets/phil/app-icon.png" />
                    <AccessibilityLabel>Phil</AccessibilityLabel>
                </a>

                <h1>Política de privacidad de Phil</h1>
                <p>Phil no recopila ningún tipo de información sobre ti, tus tarjetas, o el uso que le das a la app. Puedes comprobar esto tú misma o tú mismo <a href="https://github.com/laurasandoval/Phil">viendo el código de Phil en GitHub</a></p>
                <p>Si tienes dudas no dudes en contactarme directamente vía <a href="https://twitter.com/laurasideral">Twitter</a>, <a href="https://instagram.com/laurasideral">Instagram</a>, o a mi correo <a href="mailto:hi@lau.work">hi@lau.work</a>.</p>
            </GenericContainer>
        </>
    )
}

export async function getServerSideProps(context) {
    const dev = process.env.NODE_ENV !== 'production'
    const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
    return { props: { server } }
}