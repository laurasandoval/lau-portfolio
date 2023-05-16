import { throttle } from 'lodash'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import './GlobalHeader.scss'
import { useRouter } from 'next/router'

export default function GlobalHeader({
    sticky,
    backgroundColor,
    className,
}) {
    const [headerMarginBottom, setHeaderMarginBottom] = useState(null)
    const [navOpen, setNavOpen] = useState(false)
    const [showHeaderBorder, setShowHeaderBorder] = useState(false)
    const headerElementRef = useRef(null)
    const { asPath } = useRouter();
    const cleanPath = asPath.split('#')[0].split('?')[0];

    useEffect(() => {
        const renderedHeaderMarginBottom = window
            .getComputedStyle(headerElementRef.current)
            .getPropertyValue("margin-bottom")
            .replace("px", "")
        setHeaderMarginBottom(renderedHeaderMarginBottom)
        window.addEventListener("scroll", _throttledScrollCheck)

        return () => document.removeEventListener("scroll", _throttledScrollCheck)
    })

    const _throttledScrollCheck = throttle(() => {
        window.scrollY > headerMarginBottom
            ? setShowHeaderBorder(true)
            : setShowHeaderBorder(false)
    }, 250)

    const _toggleNav = () => {
        setNavOpen(!navOpen)
    }

    const links = [
        {
            title: "Design",
            href: "/"
        },
        {
            title: "Photography",
            href: "/photography"
        },
        {
            title: "Videos",
            href: "/videos"
        },
        {
            title: "About",
            href: "/about"
        },
        {
            title: "Résumé",
            href: "/resume"
        },
    ]

    return (
        <header
            className={`global_header${className ? ` ${className}` : ""}`}
            data-sticky={sticky}
            data-show-border={
                showHeaderBorder === true
                    ? sticky
                        ? "true"
                        : "false"
                    : "false"
            }
            data-nav-open={navOpen.toString()}
            style={{
                "--background-color": backgroundColor
            }}
            ref={headerElementRef}
        >
            <div className="header_content">
                <div className="top_bar">
                    <div className="sopaipilla_menu" data-open={navOpen.toString()}>
                        <button
                            className="toggle"
                            onClick={_toggleNav}
                            aria-hidden="true"
                        >
                            <AccessibilityLabel>
                                {navOpen.toString() === true ? "Close menu" : "Open menu"}
                            </AccessibilityLabel>
                        </button>
                        <span className="sopaipilla top">
                            <span className="inner_sopaipilla"></span>
                        </span>
                        <span className="sopaipilla bottom">
                            <span className="inner_sopaipilla"></span>
                        </span>
                    </div>
                    <h1 aria-hidden={navOpen.toString()}>
                        <AccessibilityLabel>Laura Sandoval</AccessibilityLabel>
                        <Link
                            className="nav_item"
                            href="/"
                            aria-hidden="true"
                        >
                            Laura Sandoval
                        </Link>
                    </h1>
                </div>
                <nav data-open={navOpen.toString()}>
                    <ul>
                        {links.map((link, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        className={`nav_item ${cleanPath == link.href ? "active" : (link.title == "Design" && cleanPath.includes("/design/")) ? "active" : ""}`}
                                        href={link.href}
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    )
}