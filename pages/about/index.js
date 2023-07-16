import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import GenericContainer from '@/components/GenericContainer/GenericContainer'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { NextSeo } from 'next-seo';
import './index.scss'
import { useEffect, useState } from 'react';

export default function About({ server }) {
    const [age, setAge] = useState('');

    useEffect(() => {
        const calculateAge = (dob) => {
            const diff_ms = Date.now() - dob.getTime();
            const age_dt = new Date(diff_ms);

            return Math.abs(age_dt.getUTCFullYear() - 1970);
        };

        const dob = new Date(1998, 6, 5);
        setAge(calculateAge(dob));
    }, []);

    return (
        <>
            <NextSeo
                title="Laura Sandoval — About"
                description="I strive to design wonderful and accessible digital products that go unnoticed in day-to-day life, while staying true to their intended meaning."
                openGraph={{
                    title: "Laura Sandoval — About",
                    description: "I strive to design wonderful and accessible digital products that go unnoticed in day-to-day life, while staying true to their intended meaning.",
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

            <GlobalHeader sticky />
            <GenericContainer className="about_page">
                <h2>
                    <AccessibilityLabel>
                        About — Laura Sandoval
                    </AccessibilityLabel>
                </h2>
                <figure className="hearts_animation" role="img">
                    <span
                        className="heart"
                        aria-hidden="true"
                        role="img"
                        aria-label="Floating Heart"
                    >
                        ❤️
                    </span>
                    <span
                        className="heart"
                        aria-hidden="true"
                        role="img"
                        aria-label="Floating Heart"
                    >
                        ❤️
                    </span>
                    <span
                        className="heart"
                        aria-hidden="true"
                        role="img"
                        aria-label="Floating Heart"
                    >
                        ❤️
                    </span>
                    <AccessibilityLabel as="figcaption">
                        Animation of floating hearts.
                    </AccessibilityLabel>
                </figure>
                <h3 className="big_statement">
                    I like building digital products that people love—without them even
                    noticing it.
                </h3>
                <p className="big_statement_subtitle">(Hopefully at least)</p>
                <div className="about_me_paragraphs">
                    <p role="text">
                        Born in Peru {age} years ago. Moved to Chile a year after that. Then
                        back to Peru in 2014. And back to Chile again two years later. So
                        here I am.
                    </p>
                    <p>
                        I strive to design wonderful and accessible digital products that go
                        unnoticed in day-to-day life, while staying true to their intended
                        meaning. Currently doing that at Uber.
                    </p>
                    <p role="text">
                        Taught myself to code, studied Design at Pontificia Universidad Católica de Chile, and you
                        know how it goes. Find more of that on my{" "}
                        <a
                            href="/resume"
                            rel="noopener noreferrer"
                        >
                            Résumé
                        </a>
                        {<AccessibilityLabel>.</AccessibilityLabel>} :-)
                    </p>
                    <AccessibilityLabel>
                        <a
                            href="/resume"
                            rel="noopener noreferrer"
                        >
                            Résumé
                        </a>
                    </AccessibilityLabel>
                </div>
            </GenericContainer>
        </>
    )
}

export async function getServerSideProps(context) {
    const dev = process.env.NODE_ENV !== 'production'
    const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
    return { props: { server } }
}