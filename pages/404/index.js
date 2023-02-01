import GenericContainer from '@/components/GenericContainer/GenericContainer'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import Link from 'next/link'
import './index.scss'

export default function Custom404() {
    return (
        <>
            <GlobalHeader />
            <GenericContainer className="page-container">
                <div className="text-container">
                    <h1 className="title">Page Not Found</h1>
                    <h2 className="subtitle">The link you followed may be broken, or the page may have been removed. <Link href="/">Go back to lau.work</Link>.</h2>
                </div>
            </GenericContainer>
        </>
    )
}