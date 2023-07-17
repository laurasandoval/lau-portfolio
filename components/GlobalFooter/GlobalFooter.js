import Link from 'next/link'
import './GlobalFooter.scss'
import { Balancer } from 'react-wrap-balancer';

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
                <Balancer>
                    <p className="portfolio_statement">This portfolio website was custom-made in <a href="https://goo.gl/maps/9YY1jQzkETsz5cJ7A" target="_blank">Santiago de Chile</a>. Available on <a href="https://github.com/laurasandoval/lau-portfolio" target="_blank">GitHub</a>.</p>
                </Balancer>
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
                        href="https://linkedin.com/in/laurasideral"
                    >
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer >
    )
}