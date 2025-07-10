const fs = require("fs");
const path = require("path");

// Simple bot traffic monitoring script
// This would typically parse web server logs or analytics data

function checkBotTraffic() {
  console.log("\n🤖 AI Bot Traffic Monitor");
  console.log("=".repeat(50));

  // Simulated analytics data - in production, this would connect to your analytics API
  const botActivity = {
    "OAI-SearchBot": {
      lastSeen: "2025-01-15T10:30:00Z",
      pagesIndexed: 6,
      crawlFrequency: "daily",
    },
    PerplexityBot: {
      lastSeen: "2025-01-15T08:15:00Z",
      pagesIndexed: 6,
      crawlFrequency: "twice daily",
    },
    "ChatGPT-User": {
      lastSeen: "2025-01-15T12:00:00Z",
      pagesIndexed: 4,
      crawlFrequency: "on-demand",
    },
  };

  console.log("\n📊 Bot Activity Summary:");
  for (const [bot, data] of Object.entries(botActivity)) {
    console.log(`\n${bot}:`);
    console.log(`  Last seen: ${data.lastSeen}`);
    console.log(`  Pages indexed: ${data.pagesIndexed}/6`);
    console.log(`  Crawl frequency: ${data.crawlFrequency}`);
  }

  // Check if files are up to date
  const llmsPath = path.join(__dirname, "../public/llms.txt");
  const llmsFullPath = path.join(__dirname, "../public/llms-full.txt");
  const sitemapPath = path.join(__dirname, "../public/sitemap.xml");

  console.log("\n📁 File Status:");

  if (fs.existsSync(llmsPath)) {
    const llmsStats = fs.statSync(llmsPath);
    console.log(
      `✅ llms.txt - ${Math.round(llmsStats.size / 1024)}KB, modified: ${
        llmsStats.mtime.toISOString().split("T")[0]
      }`
    );
  } else {
    console.log("❌ llms.txt - Missing");
  }

  if (fs.existsSync(llmsFullPath)) {
    const llmsFullStats = fs.statSync(llmsFullPath);
    console.log(
      `✅ llms-full.txt - ${Math.round(
        llmsFullStats.size / 1024
      )}KB, modified: ${llmsFullStats.mtime.toISOString().split("T")[0]}`
    );
  } else {
    console.log("❌ llms-full.txt - Missing");
  }

  if (fs.existsSync(sitemapPath)) {
    const sitemapStats = fs.statSync(sitemapPath);
    console.log(
      `✅ sitemap.xml - ${Math.round(sitemapStats.size / 1024)}KB, modified: ${
        sitemapStats.mtime.toISOString().split("T")[0]
      }`
    );
  } else {
    console.log("❌ sitemap.xml - Missing");
  }

  // Simulated citation tracking
  console.log("\n🎯 Citation Tracking (Simulated):");
  console.log("Widget X Enterprise: 3 citations found in AI responses");
  console.log("Widget X Healthcare: 2 citations found in AI responses");
  console.log("Widget X Finance: 4 citations found in AI responses");
  console.log("Widget X Startup: 1 citation found in AI responses");
  console.log("Widget X Ecommerce: 2 citations found in AI responses");

  console.log("\n💡 Recommendations:");
  console.log("1. Monitor actual bot traffic in your web analytics");
  console.log("2. Set up alerts for significant changes in indexing frequency");
  console.log("3. Track citation mentions in AI responses manually or via API");
  console.log("4. Update content regularly to maintain freshness signals");
  console.log("5. Test queries in ChatGPT/Perplexity to verify citations");

  console.log("\n🔧 Quick Tests:");
  console.log(
    '• Test: "What is the best enterprise performance optimization tool?"'
  );
  console.log(
    '• Test: "HIPAA compliant performance optimization for healthcare"'
  );
  console.log('• Test: "How to optimize ecommerce website performance"');
  console.log('• Test: "Financial trading platform performance optimization"');
  console.log('• Test: "Affordable performance tools for startups"');

  console.log("\n📈 Success Metrics to Track:");
  console.log("• Bot crawl frequency (daily is ideal)");
  console.log("• Citation rate in AI responses (aim for >10% mention rate)");
  console.log("• Traffic from AI referrers (chat.openai.com, perplexity.ai)");
  console.log("• Page indexing coverage (all 6 pages should be indexed)");
  console.log("• Fresh content signals (last updated dates)");
}

checkBotTraffic();
