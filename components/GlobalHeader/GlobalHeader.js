import { throttle } from 'lodash'
import Link from 'next/link'
import { useEffect, useRef, useState, forwardRef } from 'react'
import AccessibilityLabel from '../AccessibilityLabel/AccessibilityLabel'
import './GlobalHeader.scss'
import { useRouter } from 'next/router'
import GlobalFooter from '../GlobalFooter/GlobalFooter'

const GlobalHeader = forwardRef(function GlobalHeader({
    sticky,
    backgroundColor,
    fadeIn,
    fadeInDelay = 0.8,
    className,
    forceBorderHidden,
}, ref) {
    const [headerMarginBottom, setHeaderMarginBottom] = useState(null)
    const [navOpen, setNavOpen] = useState(false)
    const [showHeaderBorder, setShowHeaderBorder] = useState(false)
    const headerElementRef = useRef(null)
    const { asPath } = useRouter();
    const cleanPath = asPath.split('#')[0].split('?')[0];

    const _throttledScrollCheck = throttle(() => {
        window.scrollY > headerMarginBottom
            ? setShowHeaderBorder(true)
            : setShowHeaderBorder(false)
    }, 250)

    useEffect(() => {
        const headerElement = ref?.current || headerElementRef.current;
        if (!headerElement) return;

        const renderedHeaderMarginBottom = window
            .getComputedStyle(headerElement)
            .getPropertyValue("margin-bottom")
            .replace("px", "")

        setHeaderMarginBottom(renderedHeaderMarginBottom)
        window.addEventListener("scroll", _throttledScrollCheck)

        return () => {
            window.removeEventListener("scroll", _throttledScrollCheck)
            _throttledScrollCheck.cancel()
        }
    }, [_throttledScrollCheck, ref])

    const _toggleNav = () => {
        setNavOpen(!navOpen)
    }

    const links = [
        {
            title: "Work",
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
            title: "Résumé",
            href: "/resume"
        },
    ]

    return (
        <header
            className={`global_header${className ? ` ${className}` : ""}`}
            data-sticky={sticky}
            data-fade-in={fadeIn}
            data-show-border={
                !forceBorderHidden && showHeaderBorder === true
                    ? sticky
                        ? "true"
                        : "false"
                    : "false"
            }
            data-nav-open={navOpen.toString()}
            style={{
                "--background-color": backgroundColor,
                "--fade-in-delay": `${fadeInDelay}s`
            }}
            ref={ref || headerElementRef}
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
                    <h1 className="home" aria-hidden={navOpen.toString()}>
                        <AccessibilityLabel>Laura Sandoval. Senior Product Designer at Uber</AccessibilityLabel>
                        <Link
                            className="nav_item home"
                            href="/"
                            aria-hidden="true"
                        >
                            <img className="profile_pic" alt="App Icon" src="/assets/profile-pic.jpg" />
                            <div className="name_and_role">
                                <span className="name">Laura Sandoval</span>
                                <span className="role">Senior Product Designer at Uber</span>
                            </div>
                        </Link>
                    </h1>
                </div>
                <nav data-open={navOpen.toString()}>
                    <ul>
                        {links.map((link, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        className={`nav_item ${cleanPath == link.href ? "active" : (link.title == "Design" && cleanPath.includes("/work/")) ? "active" : ""}`}
                                        href={link.href}
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    <GlobalFooter />
                </nav>
            </div>
        </header>
    )
})

export default GlobalHeader