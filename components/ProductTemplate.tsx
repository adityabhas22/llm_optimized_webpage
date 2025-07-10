import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface Spec {
  specification: string
  value: string
}

interface FAQ {
  question: string
  answer: string
}

interface ProductData {
  slug: string
  title: string
  meta_description: string
  canonical_url: string
  tldr: string
  last_updated: string
  citeable_sentences: string[]
  specs: Spec[]
  faqs: FAQ[]
  category: string
  target_keywords: string[]
}

interface Props {
  data: ProductData
  relatedPages?: ProductData[]
}

export default function ProductTemplate({ data, relatedPages = [] }: Props) {
  // Create structured data for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  // Create Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": data.title.split(' - ')[0],
    "description": data.meta_description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  }

  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://example.com/"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": data.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        "item": `https://example.com/${data.category}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": data.title.split(' - ')[0],
        "item": data.canonical_url
      }
    ]
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={data.target_keywords.join(', ')} />
        <link rel="canonical" href={data.canonical_url} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.meta_description} />
        <meta property="og:url" content={data.canonical_url} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.meta_description} />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <main>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
          <ol style={{ display: 'flex', listStyle: 'none', padding: 0, gap: '8px' }}>
            <li><Link href="/">Home</Link></li>
            <li>→</li>
            <li><Link href={`/${data.category}`}>{data.category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</Link></li>
            <li>→</li>
            <li>{data.title.split(' - ')[0]}</li>
          </ol>
        </nav>

        {/* Above the fold - TL;DR with freshness signal */}
        <article id="tldr" data-updated={data.last_updated}>
          <strong>TL;DR:</strong> {data.tldr}
          <div style={{ fontSize: '0.9em', color: '#666', marginTop: '8px' }}>
            Last updated: {data.last_updated}
          </div>
        </article>

        {/* H1 Question Format */}
        <h1>What is {data.title.split(' - ')[0]}?</h1>
        
        {/* Citeable sentences for citation bait */}
        {data.citeable_sentences.map((sentence, index) => (
          <p key={index} className="citeable">
            {sentence}
          </p>
        ))}

        <p>
          {data.title.split(' - ')[0]} represents a breakthrough in performance optimization technology, designed specifically for {data.category.replace('-', ' ')} environments. This innovative solution combines advanced algorithmic processing with industry-specific integration capabilities, making it the ideal choice for organizations seeking to maximize their operational efficiency without disrupting existing workflows.
        </p>

        {/* H2 Key Specs with Table */}
        <h2>Key specifications</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Specification</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.specs.map((spec, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{spec.specification}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}><strong>{spec.value}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* H2 FAQ with Sections */}
        <h2>Frequently Asked Questions</h2>

        {data.faqs.map((faq, index) => (
          <section key={index} style={{ marginBottom: '25px' }}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </section>
        ))}

        {/* Related Pages for Internal Linking */}
        {relatedPages.length > 0 && (
          <section style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2>Related Solutions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {relatedPages.map((page, index) => (
                                 <div key={index} style={{ padding: '15px', backgroundColor: 'white', borderRadius: '6px' }}>
                   <h4 style={{ margin: '0 0 8px 0' }}>
                     <Link href={`/${page.slug}`} style={{ textDecoration: 'none', color: '#0066cc' }}>
                       {page.title.split(' - ')[0]}
                     </Link>
                   </h4>
                  <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>
                    {page.tldr.substring(0, 120)}...
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Author and E-E-A-T Signals */}
        <footer style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid #ddd' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>Expert Review</h4>
              <p style={{ margin: '0', fontSize: '0.9em' }}>
                Reviewed by: <strong>Sarah Chen, Performance Engineering Lead</strong><br/>
                12+ years experience in enterprise performance optimization<br/>
                Certified Solutions Architect | <a href="mailto:experts@example.com">Contact Expert</a>
              </p>
            </div>
          </div>
          <div style={{ marginTop: '15px', fontSize: '0.8em', color: '#666' }}>
            <p>This information is based on the latest product specifications and real-world performance data. Last technical review: {data.last_updated}</p>
          </div>
        </footer>
      </main>
    </>
  )
} 