# Google Analytics Setup Guide

## 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Set up your account and property
5. Choose "Web" as your platform
6. Enter your website details:
   - Website name: "LLM Webpages" or your preferred name
   - Website URL: https://llms.rthulabs.com
   - Industry category: Choose appropriate category
   - Reporting time zone: Your time zone

## 2. Get Your Measurement ID

1. After creating your property, you'll see a Measurement ID that starts with `G-`
2. It will look like: `G-XXXXXXXXXX`
3. Copy this ID

## 3. Set Up Environment Variable

Create a file called `.env.local` in your project root with:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## 4. Deploy and Test

1. Make sure `.env.local` is in your `.gitignore` (it should be by default)
2. For deployment, add the environment variable to your hosting platform:
   - **Vercel**: Go to Project Settings → Environment Variables
   - **Netlify**: Go to Site Settings → Environment Variables
   - **Other platforms**: Add `NEXT_PUBLIC_GA_ID` in their environment settings

## 5. Verify Setup

1. Deploy your site
2. Visit your website
3. Go back to Google Analytics
4. Check if data is being received (may take a few minutes)

## Features Included

✅ **Page View Tracking**: Automatically tracks all page visits
✅ **Route Change Tracking**: Tracks navigation in your SPA
✅ **Production Only**: Analytics only loads in production builds
✅ **Dual Analytics**: Works alongside your existing Plausible setup

## Custom Event Tracking (Optional)

You can track custom events by importing the gtag functions:

```typescript
import * as gtag from "../lib/gtag";

// Track a custom event
gtag.event({
  action: "llms_txt_download",
  category: "engagement",
  label: "llms.txt file",
});
```

## Privacy Considerations

- Google Analytics is more comprehensive but less privacy-focused than Plausible
- Consider adding a privacy policy mentioning both analytics tools
- You may want to implement cookie consent for EU visitors
- Google Analytics can help differentiate bot vs human traffic better than Plausible
