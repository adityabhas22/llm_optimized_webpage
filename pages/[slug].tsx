import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import ProductTemplate from '../components/ProductTemplate'
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
  data: ProductData
  relatedPages: ProductData[]
}

export default function ProductPage({ data, relatedPages }: Props) {
  return <ProductTemplate data={data} relatedPages={relatedPages} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = seoData.map((item) => ({
    params: { slug: item.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const data = seoData.find((item) => item.slug === slug)

  if (!data) {
    return {
      notFound: true
    }
  }

  // Get related pages (other pages in same category, limit to 3)
  const relatedPages = seoData
    .filter((item) => item.category === data.category && item.slug !== slug)
    .slice(0, 3)

  return {
    props: {
      data,
      relatedPages
    }
  }
} 