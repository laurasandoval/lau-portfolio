'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import './GlobalFooter.scss'
import BigParagraph from '../BigParagraph/BigParagraph';

export default function GlobalFooter({
    statement,
}) {
    const currentYear = new Date().getFullYear();
    const [startYear, setStartYear] = useState(currentYear);

    useEffect(() => {
        fetch('/api/earliest-year')
            .then(res => res.json())
            .then(data => setStartYear(data.earliestYear))
            .catch(error => console.error('Error fetching earliest year:', error));
    }, []);

    return (
        <footer
            className="global_footer"
            data-statement={statement ? "true" : "false"}
        >
            {
                statement &&
                <BigParagraph
                    statement={`I also designed and coded this portfolio website. You can inspect the code & leave feedback on [GitHub](https://github.com/laurasandoval/lau-portfolio). ◡̈`}
                    centered={true}
                />
            }
            <div className="boring_stuff">
                <div className="copyright_thingy">
                    <p>© {startYear}—{currentYear}</p>
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