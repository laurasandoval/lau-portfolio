import { throttle } from 'lodash';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel';
import styles from './GlobalHeader.module.scss'

export function GlobalHeader({
    sticky,
    backgroundColor,
}) {
    const [headerMarginBottom, setHeaderMarginBottom] = useState(null)
    const [navOpen, setNavOpen] = useState(false)
    const [showHeaderBorder, setShowHeaderBorder] = useState(false)
    const headerElementRef = useRef(null)

    useEffect(() => {
        const renderedHeaderMarginBottom = window
            .getComputedStyle(headerElementRef.current)
            .getPropertyValue("margin-bottom")
            .replace("px", "");
        setHeaderMarginBottom(renderedHeaderMarginBottom)
        window.addEventListener("scroll", _throttledScrollCheck)

        return () => document.removeEventListener("scroll", _throttledScrollCheck)
    })

    const _throttledScrollCheck = throttle(() => {
        window.scrollY > headerMarginBottom
            ? setShowHeaderBorder(true)
            : setShowHeaderBorder(false);
    }, 250);

    const _toggleNav = () => {
        if (navOpen === false && showHeaderBorder === false) {
            setShowHeaderBorder(true)

            setTimeout(() => {
                setNavOpen(true)
            }, 300);
        } else {
            setNavOpen((prevState) => ({
                navOpen: !prevState.navOpen,
            }));
        }
    }

    return (
        <header
            className={styles.global_header}
            data-sticky={sticky}
            data-show-border={
                showHeaderBorder === true
                    ? sticky
                        ? "true"
                        : "false"
                    : "false"
            }
            style={{
                "--background-color": backgroundColor
            }}
            ref={headerElementRef}
        >
            <div className={styles.header_content}>
                <div className={styles.top_bar}>
                    <div className={styles.sopaipilla_menu} data-open={navOpen}>
                        <button
                            className={styles.toggle}
                            onClick={_toggleNav}
                            aria-hidden="true"
                        >
                            <AccessibilityLabel>
                                {navOpen === true ? "Close" : "Open"} menu
                            </AccessibilityLabel>
                        </button>
                        <span className={`${styles.sopaipilla} ${styles.top}`}>
                            <span className={styles.inner_sopaipilla}></span>
                        </span>
                        <span className={`${styles.sopaipilla} ${styles.bottom}`}>
                            <span className={styles.inner_sopaipilla}></span>
                        </span>
                    </div>
                    <h1 aria-hidden={navOpen}>
                        <AccessibilityLabel>Laura Sandoval</AccessibilityLabel>
                        <Link
                            className={styles.nav_item}
                            href="/"
                            aria-hidden="true"
                        >
                            Laura Sandoval
                        </Link>
                    </h1>
                </div>
                <nav data-open={navOpen}>
                    <ul>
                        <li>
                            <Link
                                className={styles.nav_item}
                                href="/"
                            >
                                Work
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={styles.nav_item}
                                href="/about"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <a
                                className={styles.nav_item}
                                href="/resume"
                            >
                                Résumé
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}