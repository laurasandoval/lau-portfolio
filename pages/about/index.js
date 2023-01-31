import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'
import GenericContainer from '@/components/GenericContainer/GenericContainer'
import { GlobalHeader } from '@/components/GlobalHeader/GlobalHeader'
import './index.scss'

export default function About() {
    const Age = "24";

    return (
        <>
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
                        🤍
                    </span>
                    <span
                        className="heart"
                        aria-hidden="true"
                        role="img"
                        aria-label="Floating Heart"
                    >
                        🤍
                    </span>
                    <span
                        className="heart"
                        aria-hidden="true"
                        role="img"
                        aria-label="Floating Heart"
                    >
                        🤍
                    </span>
                    <AccessibilityLabel as="figcaption">
                        Animation of floating yellow hearts.
                    </AccessibilityLabel>
                </figure>
                <h3 className="big_statement">
                    I like building digital products that people love—without them even
                    noticing it.
                </h3>
                <p className="big_statement_subtitle">(Hopefully at least)</p>
                <div className="about_me_paragraphs">
                    <p role="text">
                        Born in Peru {Age} years ago. Moved to Chile a year after that. Then
                        back to Peru in 2014. And back to Chile again two years later. So
                        here I am.
                    </p>
                    <p>
                        I strive to design wonderful and accessible digital products that go
                        unnoticed in day-to-day life, while staying true to their intended
                        meaning. Currently doing that at Cornershop, an Uber-owned grocery
                        delivery service that offers world-class digital products powered by
                        software and design.
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