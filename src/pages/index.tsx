import Head from 'next/head'
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>Canvas animation - Next.js</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <div>
                <h1>canvas-animation-nextjs</h1>
                <ul>
                    <li><Link href='/examples/01-getting-started'>01 Getting Started</Link></li>
                </ul>
            </div>
        </>
    )
}
