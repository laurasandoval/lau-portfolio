import { NextSeo } from 'next-seo';
import './index.scss'

export default function Vendo({ server }) {
    return (
        <>
            <NextSeo
                title="Laura Sandoval — 📦"
                description="¡Hola! Me estoy mudando así que decidí aprovechar de vender/regalar algunas cosas. Encuentra todo lo que estoy vendiendo y regalando acá ✨"
                openGraph={{
                    title: "Laura Sandoval — 📦",
                    description: "¡Hola! Me estoy mudando así que decidí aprovechar de vender/regalar algunas cosas. Encuentra todo lo que estoy vendiendo y regalando acá ✨",
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

            <div className="📦">
                <div className="intro_video_container">
                    <div className="intro_video_inner_container">
                        <video
                            className="intro_video"
                            playsInline
                            muted
                            autoPlay
                            loop
                        >
                            <source
                                src="/assets/📦/intro-video.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                    <img src="/assets/📦/highest-quality.png" lang="en" alt="Highest quality!" />
                    <img src="/assets/📦/special-offer.png" lang="en" alt="Special offer!" />
                </div>

                <header>
                    <h1>¡Hola!</h1>
                    <p>Me estoy cambiando de casa y estoy aprovechando de vender/regalar algunas cosas.</p>
                </header>

                <div className="rules">
                    <span className="emoji" aria-hidden="true">🌈</span>
                    <h2>Reglas claras mantienen la amistad</h2>
                    <ul>
                        <li>La primera persona en comprarlo por acá se lo lleva. En esta ocasión no reservaré cosas.</li>
                        <li>Puedes retirar tus compras en mi departamento actual (queda en Ñuñoa) o, si es algo pequeño y somos colegas, lo puedo llevar a la ofis.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const dev = process.env.NODE_ENV !== 'production'
    const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
    return { props: { server } }
}