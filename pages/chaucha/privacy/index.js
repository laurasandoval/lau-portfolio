import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import GenericContainer from '@/components/GenericContainer/GenericContainer'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { NextSeo } from 'next-seo'
import './index.scss'

export default function BalancePrivacyPolicy({ server }) {
    return (
        <>
            <NextSeo
                title="Chaucha — Política de privacidad"
                description="Transfiere más rápido."
                openGraph={{
                    title: "Chaucha — Política de privacidad",
                    description: "Transfiere más rápido.",
                    images: [
                        {
                            url: `${server}/chaucha/social-thumbnail.png`,
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
                        href: `${server}/favicon.ico`,
                    },
                    {
                        rel: "apple-touch-icon",
                        href: `${server}/logo192.png`
                    }
                ]}
            />

            <GlobalHeader sticky backgroundColor="#fafafa" />

            <GenericContainer className="chaucha_privacy_policy">
                <a href="/chaucha">
                    <img className="app_icon" alt="App Icon" src="/assets/chaucha/app-icon.png" />
                    <AccessibilityLabel>Chaucha</AccessibilityLabel>
                </a>

                <h1>Política de privacidad de Chaucha</h1>
                <p>Chaucha no recopila absolutamente ningún dato.</p>
                <p>Todo lo que hace Chaucha ocurre localmente en tu dispositivo.</p>
                <p>Tal vez, sólo tal vez, en algún momento empiece a registrar eventos con fines analíticos, como analizar cuántas personas usan Chaucha, qué datos son los que más fallan, etc. Pero ese no es el caso hoy.</p>
                <h2>Sobre Chaucha</h2>
                <p>Chaucha es una aplicación independiente creada por Laura Sandoval para transformar datos bancarios en fotos, o mal formateados, a datos amigables para tu app del banco. Chaucha no tiene ninguna relación con ningún banco ni entidad bancaria de Chile o del mundo.</p>
                <p>Si tienes cualquier pregunta, por favor escríbeme vía <a href="https://twitter.com/laurasideral">Twitter</a>, <a href="https://instagram.com/laurasideral">Instagram</a>, o por mail a <a href="mailto:hi@lausandoval.com">hi@lausandoval.com</a>. ¡Gracias!</p>
            </GenericContainer>
        </>
    )
}

export async function getServerSideProps(context) {
    const dev = process.env.NODE_ENV !== 'production'
    const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
    return { props: { server } }
}