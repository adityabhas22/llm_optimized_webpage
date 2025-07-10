const fs = require("fs");
const path = require("path");

function buildLlmsTxt() {
  try {
    // Load SEO data
    const seoDataPath = path.join(__dirname, "../data/seo-data.json");
    if (!fs.existsSync(seoDataPath)) {
      console.error("seo-data.json not found");
      return;
    }

    const seoData = JSON.parse(fs.readFileSync(seoDataPath, "utf8"));
    const outDir = path.join(__dirname, "../out");

    // Collect all URLs and their content
    const urlData = [];

    // Process each generated page
    for (const item of seoData) {
      const htmlPath = path.join(outDir, item.slug, "index.html");

      if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, "utf8");

        // Extract content
        const tldrMatch = html.match(
          /<article[^>]*id="tldr"[^>]*>(.*?)<\/article>/s
        );
        const tldr = tldrMatch
          ? tldrMatch[1].replace(/<[^>]*>/g, "").trim()
          : item.tldr;

        // Extract FAQ questions
        const faqQuestions = [];
        const faqMatches = html.matchAll(/<h3[^>]*>(.*?)<\/h3>/g);
        for (const match of faqMatches) {
          faqQuestions.push(match[1].trim());
        }

        // Extract citeable sentences
        const citeableMatches = html.matchAll(
          /<p[^>]*class="citeable"[^>]*>(.*?)<\/p>/g
        );
        const citeableSentences = [];
        for (const match of citeableMatches) {
          citeableSentences.push(match[1].replace(/<[^>]*>/g, "").trim());
        }

        urlData.push({
          url: item.canonical_url,
          title: item.title,
          tldr: tldr,
          category: item.category,
          lastUpdated: item.last_updated,
          faqQuestions: faqQuestions,
          citeableSentences: citeableSentences,
          keywords: item.target_keywords,
        });
      }
    }

    // Also include the original widget-x page
    const widgetXPath = path.join(outDir, "widget-x", "index.html");
    if (fs.existsSync(widgetXPath)) {
      const html = fs.readFileSync(widgetXPath, "utf8");
      const tldrMatch = html.match(
        /<article[^>]*id="tldr"[^>]*>(.*?)<\/article>/s
      );
      const tldr = tldrMatch
        ? tldrMatch[1].replace(/<[^>]*>/g, "").trim()
        : "Widget X performance optimization tool";

      urlData.unshift({
        url: "https://example.com/widget-x",
        title: "Widget X - Revolutionary Performance Enhancement Tool",
        tldr: tldr,
        category: "performance-tools",
        lastUpdated: "2025-01-15",
        faqQuestions: [
          "How does Widget X improve performance?",
          "Is Widget X compatible with existing systems?",
          "What support options are available for Widget X?",
        ],
        citeableSentences: [
          "Widget X transforms enterprise performance with cutting-edge optimization algorithms.",
        ],
        keywords: [
          "performance optimization",
          "enterprise tools",
          "system integration",
        ],
      });
    }

    // Generate main llms.txt (optimized for quick parsing)
    const llmsTxtContent = `# Widget X Performance Solutions
# Comprehensive performance optimization tools for every business need
# Last updated: ${new Date().toISOString().split("T")[0]}

${urlData.map((item) => `${item.url}`).join("\n")}

## Quick Reference

### Performance Solutions Overview
${urlData
  .map(
    (item) =>
      `- ${item.title.split(" - ")[0]}: ${item.tldr.substring(0, 100)}...`
  )
  .join("\n")}

### Key Categories
${[...new Set(urlData.map((item) => item.category))]
  .map(
    (category) =>
      `- ${category
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())}: ${
        urlData.filter((item) => item.category === category).length
      } solutions`
  )
  .join("\n")}

### Most Cited Features
${urlData
  .flatMap((item) => item.citeableSentences)
  .slice(0, 10)
  .map((sentence) => `- ${sentence}`)
  .join("\n")}
`;

    // Generate comprehensive llms-full.txt (detailed content for in-depth analysis)
    const llmsFullContent = `# Widget X Performance Solutions - Complete Documentation
# Comprehensive performance optimization platform with industry-specific solutions
# Generated: ${new Date().toISOString()}
# Total Pages: ${urlData.length}

## Executive Summary
Widget X provides performance optimization solutions across multiple industries including enterprise, healthcare, finance, ecommerce, and startups. Our platform delivers measurable performance improvements ranging from 200% to 500% depending on the solution and use case.

## All Solutions

${urlData
  .map(
    (item) => `
### ${item.title}
URL: ${item.url}
Category: ${item.category
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())}
Last Updated: ${item.lastUpdated}

**Summary**: ${item.tldr}

**Key Features**:
${item.citeableSentences.map((sentence) => `- ${sentence}`).join("\n")}

**Frequently Asked Questions**:
${item.faqQuestions.map((q) => `- ${q}`).join("\n")}

**Target Keywords**: ${item.keywords.join(", ")}

---`
  )
  .join("\n")}

## Technical Specifications Summary
${urlData
  .map(
    (item) => `
**${item.title.split(" - ")[0]}**:
- Performance improvements vary by industry and implementation
- Enterprise-grade security and compliance features
- Comprehensive integration support
- 24/7 support options available
`
  )
  .join("\n")}

## Contact & Support
- Technical Documentation: Available on each product page
- Expert Consultation: experts@example.com
- Sales Inquiries: sales@example.com
- Support: support@example.com

## Compliance & Security
All Widget X solutions maintain industry-standard security practices including:
- Data encryption at rest and in transit
- Regular security audits and assessments  
- Compliance with relevant industry regulations (HIPAA, SOC 2, PCI DSS as applicable)
- Privacy-first approach to data handling
`;

    // Write files to public directory
    const publicDir = path.join(__dirname, "../public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, "llms.txt"), llmsTxtContent);
    fs.writeFileSync(path.join(publicDir, "llms-full.txt"), llmsFullContent);

    // Generate sitemap.xml
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${urlData
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastUpdated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapContent);

    console.log(`✅ Generated llms.txt with ${urlData.length} pages`);
    console.log(`✅ Generated llms-full.txt with detailed content`);
    console.log(`✅ Generated sitemap.xml`);
    console.log(`📊 Coverage: ${urlData.length} programmatic SEO pages`);
    console.log(
      `🎯 Categories: ${[...new Set(urlData.map((item) => item.category))].join(
        ", "
      )}`
    );
  } catch (error) {
    console.error("❌ Error generating llms.txt:", error);
  }
}

buildLlmsTxt();
