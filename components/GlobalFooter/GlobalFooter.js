import Link from 'next/link'
import './GlobalFooter.scss'

export default function GlobalFooter() {
    return (
        <footer className="global_footer">
            <p className="portfolio_statement">This portfolio website was custom-made made in Santiago, Chile. You can explore the code on <a href="https://github.com/laurasandoval/lau-portfolio">GitHub</a>.</p>
            <div className="boring_stuff">
                <div className="copyright_thingy">
                    <p>© 1998—2023</p>
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
                        href="https://linkedin.com/in/laurasideral"
                    >
                        LinkedIn
                    </Link>
                    <Link
                        className="social_link"
                        href="https://threads.net/@laurasideral"
                    >
                        Threads
                    </Link>
                </div>
            </div>
        </footer>
    )
}