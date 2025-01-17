import './[...project].scss'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import { NextSeo } from 'next-seo'
import Button from '@/components/Button/Button'
import parse from 'html-react-parser';
import { getAllPostIds, getPostData, getSortedPostsData, getPostsByFolder, getAllFolders } from '../../lib/posts'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter'
import NextProjectPeek from '@/components/NextProjectPeek/NextProjectPeek'
import { ProjectArticleHeader } from '@/components/ProjectArticleHeader/ProjectArticleHeader'
import ProjectArticleAsset from '@/components/ProjectArticleAsset/ProjectArticleAsset'
import { formatYears, normalizeForUrl } from '@/lib/formatters'
import FolderPage from './folder-page'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function Project({ isFolder, folderAvailable, folderUrl, folderName, posts, currentPostData, nextPostData, server }) {
    const [headerDistance, setHeaderDistance] = useState(0);
    const [fadeIn, setFadeIn] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const headerRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (isTransitioning) {
            setFadeIn(false);
        } else if (router.query.ref === 'peek') {
            setFadeIn(true);
        }
    }, [isTransitioning, router.query]);

    useEffect(() => {
        if (!nextPostData && isTransitioning) {
            // If there's no next project but we're transitioning (came from a peek),
            // we need to handle the transition completion ourselves
            setIsTransitioning(false);
            requestAnimationFrame(() => {
                window.scrollTo(0, 0);
            });
        }
    }, [nextPostData, isTransitioning]);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderDistance(headerRef.current.offsetTop);
        }
    }, []);

    if (isFolder) {
        return (
            <FolderPage
                folderName={folderName}
                posts={posts}
                server={server}
            />
        );
    }

    const getColorLuminance = (color) => {
        const hex = color.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return luminance;
    }

    const renderContent = (htmlString) => {
        const options = {
            replace: (domNode) => {
                // Check if the current node is a <p> tag containing only an <img> tag
                if (domNode.name === 'p' && domNode.children.length === 1 && domNode.children[0].name === 'img') {
                    const { src, alt } = domNode.children[0].attribs; // Get src and alt from the img tag
                    return (
                        <ProjectArticleAsset
                            src={src}
                            caption={alt}
                        />
                    );
                }
            },
        };

        return parse(htmlString, options);
    };

    const projectThemeColor = currentPostData.customThemeColorHex ?? "#000000";
    const luminance = getColorLuminance(projectThemeColor);
    const textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";

    return (
        <>
            <NextSeo
                title={`${currentPostData.title} — Laura Sandoval`}
                description={`${currentPostData.excerpt}`}
                openGraph={{
                    title: `${currentPostData.title} — Laura Sandoval`,
                    description: `${currentPostData.excerpt}`,
                    images: [
                        {
                            url: `${server}${currentPostData.ogImage}`,
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
            // additionalMetaTags={[
            //   {
            //     name: "theme-color",
            //     content: projectThemeColor,
            //   },
            // ]}
            />

            <GlobalHeader fadeIn={fadeIn} fadeInDelay={0.5} isTransitioning={isTransitioning} />

            <style>
                {`
          ::selection {
              background: ${projectThemeColor}!important;
              color: ${textColor}!important;
          }
        `}
            </style>

            <article
                className="design_project_article"
                data-name={currentPostData?.title}
                data-transitioning={isTransitioning}
            >
                <ProjectArticleHeader ref={headerRef} postData={currentPostData} fadeInUnderlines={fadeIn} />
                <div
                    className="design_project_article_body"
                    data-fade-in={fadeIn}
                    key={currentPostData?.project}
                    style={{
                        "--fade-in-delay": "0.5s"
                    }}
                >
                    <div className="content">
                        {renderContent(currentPostData.contentHtml)}
                        {currentPostData?.cta && (
                            <div className="ctas">
                                {currentPostData?.cta.map((cta, i) => {
                                    return (
                                        <Button
                                            type="secondary"
                                            key={i}
                                            link={true}
                                            href={cta.url}
                                            label={cta.title}
                                        />
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <div className="credits">
                        {(currentPostData.startYear || currentPostData.endYear) &&
                            <div className="item">
                                <h3>Period</h3>
                                <p>{formatYears(currentPostData.startYear, currentPostData.endYear)}</p>
                            </div>
                        }
                        {currentPostData.client &&
                            <div className="item">
                                <h3>Client</h3>
                                {folderAvailable ? (
                                    <Link href={folderUrl}><p>{currentPostData.client}</p></Link>
                                ) : (
                                    <p>{currentPostData.client}</p>
                                )}
                            </div>
                        }
                        {currentPostData.clientSector &&
                            <div className="item">
                                <h3>Sector</h3>
                                {currentPostData.clientSector.map((clientSector, i) => {
                                    return (
                                        <Link href={`/work/sector/${normalizeForUrl(clientSector)}`} key={i}>
                                            <p>{clientSector}</p>
                                        </Link>
                                    )
                                })}
                            </div>
                        }
                        {currentPostData.workType &&
                            <div className="item">
                                <h3>Discipline</h3>
                                {currentPostData.workType.map((workType, i) => {
                                    return (
                                        <Link href={`/work/discipline/${normalizeForUrl(workType)}`} key={i}>
                                            <p>{workType}</p>
                                        </Link>
                                    )
                                })}
                            </div>
                        }
                        {currentPostData.team && Object.entries(currentPostData.team).map(([teamName, members]) => (
                            <div className="item" key={teamName}>
                                <h3>{teamName}</h3>
                                {members.map((member, index) => (
                                    <p key={index}>{member}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </article>

            <GlobalFooter />

            {
                nextPostData != null &&
                <NextProjectPeek
                    nextPostData={nextPostData}
                    headerDistance={headerDistance}
                    isTransitioning={isTransitioning}
                    setIsTransitioning={setIsTransitioning}
                    fadeIn={fadeIn}
                    fadeInDelay={0.5}
                />
            }
        </>
    )
}

export async function getStaticPaths() {
    const postPaths = getAllPostIds();
    const folderPaths = getAllFolders();

    return {
        paths: [...postPaths, ...folderPaths],
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const dev = process.env.NODE_ENV !== 'production'
    const server = dev ? `http://localhost:3000` : `https://lausandoval.com`
    const folderPaths = getAllFolders();

    // Get the current path without the last segment (file name)
    const currentPath = params.project.slice(0, -1).join('/');

    // Check if folder exists and get its URL
    const folderAvailable = folderPaths.some(path => path.params.project[0] === currentPath);
    const folderUrl = folderAvailable ? `${server}/work/${currentPath}` : null;

    const isFolder = params.project.length === 1 && folderPaths.some(path =>
        path.params.project.join('/') === params.project.join('/')
    );

    if (isFolder) {
        const folderPosts = getPostsByFolder(params.project[0]);
        return {
            props: {
                isFolder: true,
                folderName: params.project[0],
                posts: folderPosts,
                server
            }
        };
    }

    // Existing logic for individual posts
    const allPosts = getSortedPostsData();
    const currentPostIndex = allPosts.findIndex(post => post.id === params.project.join('/'));
    const currentPostData = await getPostData(params.project.join('/'));

    let nextPostData = null;
    if (currentPostIndex !== -1 && currentPostIndex < allPosts.length - 1) {
        const nextPost = allPosts[currentPostIndex + 1];
        nextPostData = await getPostData(nextPost.id);
    }

    return {
        props: {
            isFolder: false,
            folderAvailable,
            folderUrl,
            currentPostData,
            nextPostData,
            server
        },
    };
}
