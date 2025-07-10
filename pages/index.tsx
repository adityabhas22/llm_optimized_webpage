import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import seoData from '../data/seo-data.json'

interface ProductData {
  slug: string
  title: string
  meta_description: string
  canonical_url: string
  tldr: string
  last_updated: string
  citeable_sentences: string[]
  specs: Array<{
    specification: string
    value: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  category: string
  target_keywords: string[]
}

interface Props {
  products: ProductData[]
  categories: Array<{
    name: string
    slug: string
    count: number
    products: ProductData[]
  }>
}

export default function HomePage({ products, categories }: Props) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Widget X Performance Solutions",
    "description": "Comprehensive performance optimization tools for enterprise, healthcare, finance, ecommerce, and startup environments.",
    "url": "https://example.com",
    "logo": "https://example.com/logo.png",
    "sameAs": [
      "https://twitter.com/widgetx",
      "https://linkedin.com/company/widgetx"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Performance Optimization Solutions",
      "itemListElement": products.map((product, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "name": product.title.split(' - ')[0],
        "description": product.meta_description,
        "url": product.canonical_url
      }))
    }
  }

  return (
    <>
      <Head>
        <title>Widget X Performance Solutions - Enterprise Optimization Platform</title>
        <meta name="description" content="Comprehensive performance optimization solutions for enterprise, healthcare, finance, ecommerce, and startups. Improve system performance by 200-500% with industry-specific tools." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="performance optimization, enterprise software, system performance, business tools" />
        <link rel="canonical" href="https://example.com/" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Widget X Performance Solutions - Enterprise Optimization Platform" />
        <meta property="og:description" content="Comprehensive performance optimization solutions for enterprise, healthcare, finance, ecommerce, and startups." />
        <meta property="og:url" content="https://example.com/" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Hero Section */}
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#2c3e50' }}>
            Widget X Performance Solutions
          </h1>
          <p style={{ fontSize: '1.3em', color: '#666', maxWidth: '800px', margin: '0 auto 30px' }}>
            Comprehensive performance optimization platform delivering <strong>200-500% improvements</strong> across enterprise, healthcare, finance, ecommerce, and startup environments.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <strong>{products.length}</strong> Solutions
            </div>
            <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <strong>{categories.length}</strong> Industries
            </div>
            <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <strong>500%</strong> Max Performance Gain
            </div>
          </div>
        </header>

        {/* Featured Solutions */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50' }}>
            Industry-Specific Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {products.map((product) => (
              <article key={product.slug} style={{ 
                padding: '25px', 
                border: '1px solid #e1e8ed', 
                borderRadius: '12px',
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease'
              }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>
                  <Link href={`/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {product.title.split(' - ')[0]}
                  </Link>
                </h3>
                <div style={{ 
                  fontSize: '0.9em', 
                  color: '#666', 
                  marginBottom: '15px',
                  textTransform: 'capitalize'
                }}>
                  {product.category.replace('-', ' ')} • Updated {product.last_updated}
                </div>
                <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                  {product.tldr}
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <strong>Key Features:</strong>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    {product.citeable_sentences.slice(0, 2).map((sentence, index) => (
                      <li key={index} style={{ marginBottom: '5px', fontSize: '0.95em' }}>
                        {sentence}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <strong>Top Specifications:</strong>
                  <div style={{ marginTop: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {product.specs.slice(0, 4).map((spec, index) => (
                      <div key={index} style={{ fontSize: '0.9em', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{spec.specification}</div>
                        <div style={{ color: '#666' }}>{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link 
                  href={`/${product.slug}`}
                  style={{ 
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  Learn More →
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Categories Overview */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50' }}>
            Solutions by Industry
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {categories.map((category) => (
              <div key={category.slug} style={{ 
                padding: '20px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                  {category.name}
                </h3>
                <p style={{ margin: '0 0 15px 0', color: '#666' }}>
                  {category.count} solution{category.count !== 1 ? 's' : ''} available
                </p>
                                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   {category.products.map((product) => (
                     <Link 
                       key={product.slug}
                       href={`/${product.slug}`}
                       style={{ 
                         color: '#3498db', 
                         textDecoration: 'none',
                         fontSize: '0.95em'
                       }}
                     >
                       {product.title.split(' - ')[0]}
                     </Link>
                   ))}
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '25px' }}>
              <h3>What industries does Widget X serve?</h3>
              <p>Widget X provides specialized performance optimization solutions for enterprise organizations, healthcare systems, financial institutions, ecommerce platforms, and growing startups. Each solution is tailored to meet industry-specific requirements and compliance needs.</p>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <h3>How much performance improvement can I expect?</h3>
              <p>Performance improvements vary by solution and implementation, ranging from 200% for startup environments to 500% for enterprise deployments. Specific metrics depend on your current system architecture and optimization goals.</p>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <h3>What compliance standards does Widget X meet?</h3>
              <p>Our solutions meet various compliance requirements including HIPAA for healthcare, PCI DSS for financial services, SOC 2 for enterprise security, and GDPR for data protection. Specific compliance features vary by solution.</p>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <h3>How quickly can Widget X be implemented?</h3>
              <p>Implementation time varies from under 2 hours for startup solutions to 24 hours for enterprise deployments. Our team provides dedicated support and migration assistance for all implementations.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ 
          textAlign: 'center', 
          padding: '40px', 
          backgroundColor: '#2c3e50', 
          borderRadius: '12px',
          color: 'white'
        }}>
          <h2 style={{ margin: '0 0 20px 0' }}>Ready to Optimize Your Performance?</h2>
                     <p style={{ margin: '0 0 30px 0', fontSize: '1.1em' }}>
             Choose the Widget X solution that&apos;s right for your industry and start seeing results immediately.
           </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                         <Link 
               href="/widget-x-enterprise"
               style={{ 
                 padding: '15px 30px',
                 backgroundColor: '#3498db',
                 color: 'white',
                 textDecoration: 'none',
                 borderRadius: '6px',
                 fontWeight: 'bold'
               }}
             >
               Enterprise Solution
             </Link>
             <Link 
               href="/widget-x-startup"
               style={{ 
                 padding: '15px 30px',
                 backgroundColor: '#27ae60',
                 color: 'white',
                 textDecoration: 'none',
                 borderRadius: '6px',
                 fontWeight: 'bold'
               }}
             >
               Startup Solution
             </Link>
            <a 
              href="mailto:sales@example.com"
              style={{ 
                padding: '15px 30px',
                backgroundColor: 'transparent',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                border: '2px solid white'
              }}
            >
              Contact Sales
            </a>
          </div>
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Group products by category
  const categoryMap = new Map()
  
  seoData.forEach(product => {
    if (!categoryMap.has(product.category)) {
      categoryMap.set(product.category, [])
    }
    categoryMap.get(product.category).push(product)
  })

  const categories = Array.from(categoryMap.entries()).map(([slug, products]) => ({
    name: slug.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    slug,
    count: products.length,
    products
  }))

  return {
    props: {
      products: seoData,
      categories
    }
  }
} 