import { NextSeo } from 'next-seo';
import './index.scss'
import { useEffect } from 'react';
import { IconBrandWhatsapp, IconBuilding } from '@tabler/icons-react';

export default function Vendo({ itemsForSaleData, server }) {
    useEffect(() => {
        document.body.classList.add("vendo");

        return () => {
            document.body.classList.remove("vendo");
        }
    }, [])

    const availableItems = itemsForSaleData.filter(itemForSale => {
        return itemForSale.sold == false
    })
    const unavailableItems = itemsForSaleData.filter(itemForSale => {
        return itemForSale.sold == true
    })
    const orderedItemList = availableItems.concat(unavailableItems)

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
                            url: `${server}/assets/📦/social-thumbnail.png`,
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

            <div className="📦" lang="es">
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
                            <source
                                src="/assets/📦/intro-video.webm"
                                type="video/webm"
                            />
                        </video>
                    </div>
                    <img src="/assets/📦/highest-quality.png" lang="en" alt="Highest quality!" />
                    <img src="/assets/📦/special-offer.png" lang="en" alt="Special offer!" />
                </div>

                <header>
                    <h1>¡Hola!</h1>
                    <p>Me estoy cambiando de casa así que decidí aprovechar de vender/regalar algunas cosas.</p>
                    <p><b>La primera persona en pagar por algo se lo lleva.</b> En esta ocasión no reservaré cosas.</p>
                    <p>Puedes retirar tus compras en mi departamento actual (queda en <a href="/assets/📦/ñuñoa.jpg" target="_blank">Ñuñoa</a>) o, si es algo pequeño y somos colegas, lo puedo llevar a la ofis.</p>
                </header>

                {
                    orderedItemList.map((item, itemIndex) => {
                        return (
                            <article className="item" key={itemIndex} data-sold={item.sold}>
                                <div className="image_gallery">
                                    {
                                        item.images_src.map((itemImageSrc, imageIndex) => {
                                            return (
                                                <div className="image_container" key={imageIndex} data-sold={item.sold}>
                                                    <img src={itemImageSrc} loading="lazy" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="item_info">
                                    <h2 className="title">{item.title}</h2>

                                    <div className="features">
                                        <div className="feature">
                                            <IconBuilding />
                                            <p><b>Retiro</b> en mi departamento en Ñuñoa</p>
                                        </div>
                                    </div>

                                    <div className="price_container">
                                        {
                                            item.original_price &&
                                            <p className="original_price">Precio original: {item.original_price}</p>
                                        }
                                        <p className="price">{item.price}</p>
                                    </div>

                                    <div className="button_container">
                                        <a
                                            className="button"
                                            href={`https://wa.me/${encodeURIComponent(+56968640535)}?text=${encodeURIComponent(`Hola! Quiero comprar tu \"${item.title}\"`)}`}
                                            target="_blank"
                                            data-disabled={item.sold}
                                            aria-disabled={item.sold}
                                        >
                                            <IconBrandWhatsapp /> Comprar
                                        </a>
                                        <p className="disclaimer">Si somos colegas, puedes hablarme por Slack también si prefieres.</p>
                                    </div>

                                    {
                                        (item.brand || item.model_name) &&
                                        <div className="metadata_container">
                                            {
                                                item.brand &&
                                                <div className="metadata">
                                                    <h3>Marca</h3>
                                                    <p>{item.brand}</p>
                                                </div>
                                            }
                                            {
                                                item.model_name &&
                                                <div className="metadata">
                                                    <h3>Modelo</h3>
                                                    <p>{item.model_name}</p>
                                                </div>
                                            }
                                        </div>
                                    }

                                    <div className="description">
                                        {
                                            item.description.map((paragraph, paragraphIndex) => {
                                                return <p key={paragraphIndex}>{paragraph}</p>
                                            })
                                        }
                                    </div>
                                </div>

                                {
                                    item.sold &&
                                    <img className="sold_stamp" src="/assets/📦/vendido.png" alt="Vendido" />
                                }
                            </article>
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
    const url = `${server}/api/mudanza`
    const res = await fetch(url)
    const itemsForSaleData = await res.json()
    return { props: { itemsForSaleData, server } }
}