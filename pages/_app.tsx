import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  // Only load Plausible in production
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <>
      <Head>
        {isProduction && (
          <>
            <script 
              defer 
              data-domain="llms.rthulabs.com" 
              src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
            />
            <script 
              dangerouslySetInnerHTML={{
                __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`
              }}
            />
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  )
} 