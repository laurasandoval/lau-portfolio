import Link from 'next/link'
import './GlobalFooter.scss'
import BigParagraph from '../BigParagraph/BigParagraph';

export default function GlobalFooter({
    statement,
}) {
    let year = new Date().getFullYear();

    return (
        <footer
            className="global_footer"
            data-statement={statement ? "true" : "false"}
        >
            {
                statement &&
                <BigParagraph
                    statement={`This portfolio website was custom-made in [Santiago de Chile](https://goo.gl/maps/9YY1jQzkETsz5cJ7A). Available on [GitHub](https://github.com/laurasandoval/lau-portfolio).`}
                    centered={true}
                />
            }
            <div className="boring_stuff">
                <div className="copyright_thingy">
                    <p>© 1998—{year}</p>
                    <p>Laura Sandoval</p>
                </div>
                <div className="socials">
                    <Link
                        className="social_link"
                        href="https://instagram.com/laurasideral"
                    >
                        Instagram
                    </Link>
                    <Link
                        className="social_link"
                        href="https://threads.net/@laurasideral"
                    >
                        Threads
                    </Link>
                    <Link
                        className="social_link"
                        href="https://x.com/laurasideral"
                    >
                        X
                    </Link>
                    <Link
                        className="social_link"
                        href="https://linkedin.com/in/laurasideral"
                    >
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer >
    )
}