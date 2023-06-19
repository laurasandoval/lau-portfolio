import { NextSeo } from 'next-seo';
import './index.scss'
import { useEffect } from 'react';
import { IconBriefcase, IconBuilding } from '@tabler/icons-react';
import { Balancer } from 'react-wrap-balancer';

export default function Vendo({ server }) {
    useEffect(() => {
        document.body.classList.add("vendo");

        return () => {
            document.body.classList.remove("vendo");
        }
    }, [])

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
                    <p>Me estoy cambiando de casa así que decidí aprovechar de vender/regalar algunas cosas.</p>
                    <p><b>La primera persona en pagar por algo se lo lleva ✨.</b> En esta ocasión no reservaré cosas.</p>
                    <p>Puedes retirar tus compras en mi departamento actual (queda en <a href="/assets/📦/ñuñoa.jpg" target="_blank">Ñuñoa</a>) o, si es algo pequeño y somos colegas, lo puedo llevar a la ofis.</p>
                </header>

                {/* <div className="rules">
                    <span className="emoji" aria-hidden="true">🌈</span>
                    <h2>Reglas claras mantienen la amistad</h2>
                    <ul>
                        <li>La primera persona en pagar por algo se lo lleva. En esta ocasión no reservaré cosas.</li>
                        <li>Puedes retirar tus compras en mi departamento actual (queda en Ñuñoa) o, si es algo pequeño y somos colegas, lo puedo llevar a la ofis.</li>
                    </ul>
                </div> */}

                <article className="item">
                    <div className="image_gallery">
                        <div className="image_container">
                            <img src="/assets/📦/items/escritorio-200-70/1.jpg" />
                        </div>
                        <div className="image_container">
                            <img src="/assets/📦/items/escritorio-200-70/2.jpg" />
                        </div>
                    </div>
                    <div className="metadata">
                        <div>
                            <h2 className="title">Escritorio 200x70 cms</h2>
                            <p className="price">$20.000</p>
                        </div>

                        <div className="features">
                            <div className="feature">
                                <IconBuilding />
                                <Balancer>Retiro a coordinar en mi departamento</Balancer>
                            </div>
                            <div className="feature">
                                <IconBriefcase />
                                <Balancer>Si somos colegas, te lo puedo llevar a la ofi</Balancer>
                            </div>
                        </div>

                        <div className="description">
                            <p>Mi fiel y confiable escritorio. Para ser una puerta sobre un par de caballetes, ha aguantado muy bien.</p>
                            <p>Ensamblado el 2016 y barnizado por mí misma el 2017, este escritorio ha estado conmigo ya 7 años. Si este escritorio hablara, probablemente me vería y diría "oye que estái grande!". En fin.</p>
                            <p>Lo vendo barato porque bueno, digamos, no es un escritorio hecho y derecho, pero estoy segura que estará feliz de aguantar otros 7 años con alguien más.</p>
                            <p>Incluye: Escritorio y caballetes. Todo lo demás se vende por separado.</p>
                        </div>

                        <div className="button_container">
                            <a className="button" href="https://mercadopago.com">Comprar</a>
                            <p className="disclaimer">Compra a través de Mercado Pago. Puedes pagar en cuotas si quieres.</p>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const dev = process.env.NODE_ENV !== 'production'
    const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
    return { props: { server } }
}