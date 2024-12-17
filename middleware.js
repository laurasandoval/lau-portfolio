import { NextResponse } from 'next/server'

export function middleware(request) {
    // Check if the URL starts with /design
    if (request.nextUrl.pathname.startsWith('/design')) {
        // Create new URL with /work instead of /design
        const newUrl = request.nextUrl.clone()
        newUrl.pathname = newUrl.pathname.replace('/design', '/work')

        // 301 redirect to preserve SEO
        return NextResponse.redirect(newUrl, 301)
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/design/:path*'
} 