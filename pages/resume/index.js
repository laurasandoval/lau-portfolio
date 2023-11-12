import { NextSeo } from "next-seo"

export default function Resume() {
  return (
    <>
      <NextSeo
        title="Laura Sandoval — Résumé"
        description="Digital Product Designer & Engineer from Santiago, Chile. Featured clients include Uber, Cornershop, among others."
        openGraph={{
          title: "Laura Sandoval — Résumé",
          description: "Digital Product Designer & Engineer from Santiago, Chile. Featured clients include Uber, Cornershop, among others.",
          images: [
            {
              url: "/social-thumbnail.png",
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
            href: "/favicon.ico",
          },
          {
            rel: "apple-touch-icon",
            href: "/logo192.png"
          }
        ]}
        additionalMetaTags={[
          {
            name: "theme-color",
            content: "#000000",
          },
        ]}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
  const url = `${server}/api/latest-resume`
  const res = await fetch(url)
  const latestResume = await res.json()

  if (latestResume.file_name) {
    return {
      redirect: {
        destination: `/resume/${latestResume.file_name}`,
        permanent: false,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}