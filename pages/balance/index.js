import Head from 'next/head'

export default function Balance() {
    return (
        <>
            <Head>
                <title>Balance</title>
                <meta name="description" content="Agrega tus tarjetas de transporte público y obtén el saldo de tu Bip, viaja en el Metro de Santiago o en las micros Red con tu Bip QR, y más." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="image" content="/site-thumbnail.png" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/logo192.png" />
            </Head>
        </>
    )
}

export async function getServerSideProps() {
    return {
        redirect: {
            destination: "https://apps.apple.com/cl/app/balance-for-your-bip-card/id1532939978",
            permanent: true,
        },
    }
}