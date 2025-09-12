# Monetization Setup Guide

This guide helps you configure Google Analytics, Google AdSense, and affiliate links for your Hugo site.

## 🔧 Configuration

### 1. Google Analytics Setup

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website
3. Copy your GA4 Measurement ID (looks like `G-XXXXXXXXXX`)
4. Update `hugo.toml`:

```toml
[params]
  googleAnalytics = "G-XXXXXXXXXX"  # Replace with your actual GA4 tracking ID
```

### 2. Google AdSense Setup

1. Apply for [Google AdSense](https://www.google.com/adsense/)
2. Get your Publisher ID (looks like `ca-pub-XXXXXXXXXX`)
3. Create ad units and get ad slot IDs
4. Update `hugo.toml`:

```toml
[params]
  googleAdSenseID = "ca-pub-XXXXXXXXXX"  # Replace with your AdSense Publisher ID
```

5. Update ad slot IDs in the partial files:
   - `layouts/partials/ad-banner.html`: Replace `XXXXXXXXX` with your banner ad slot ID
   - `layouts/partials/ad-sidebar.html`: Replace `YYYYYYYYY` with your sidebar ad slot ID  
   - `layouts/partials/ad-in-content.html`: Replace `ZZZZZZZZZ` with your in-content ad slot ID

### 3. Affiliate Links Setup

1. Sign up for affiliate programs (Amazon Associates, etc.)
2. Get your affiliate tags
3. Update `hugo.toml`:

```toml
[params.affiliate]
  amazon = "your-amazon-tag"  # Replace with your Amazon Associates tag
  disclaimer = "This site contains affiliate links. We may earn a commission if you click on a link and make a purchase."
```

## 📍 Ad Placements

The system automatically places ads in these locations:

### Homepage
- Banner ad at the top
- Banner ads every 6 posts in the grid

### Single Post Pages
- Banner ad at the top
- Affiliate disclaimer (if affiliate links are present)
- In-content ad after the post content

### Available Ad Partials
- `{{ partial "ad-banner.html" . }}` - Responsive banner ad
- `{{ partial "ad-sidebar.html" . }}` - Sidebar ad
- `{{ partial "ad-in-content.html" . }}` - In-content ad

## 🔗 Using Affiliate Links

### In Markdown Content

Use the affiliate shortcode in your posts:

```markdown
{{< affiliate url="https://example.com/product" text="Buy Now" >}}
```

For Amazon products:

```markdown
{{< amazon asin="B08N5WRWNW" text="Buy on Amazon" >}}
```

### In Templates

Use the affiliate link partial:

```html
{{ partial "affiliate-link.html" (dict "url" "https://example.com" "text" "Click here" "Site" .Site) }}
```

## 🎨 Ad Styling

Ads are styled to match your site's dark theme with purple accents. They include:
- "Advertisement" labels
- Responsive design
- Glass morphism effects
- Smooth transitions

## 📊 Performance Tips

1. **Ad Placement**: Don't overdo it - too many ads can hurt user experience
2. **Loading**: Ads load asynchronously to not block your content
3. **Mobile**: All ads are responsive and mobile-friendly
4. **Analytics**: Use Google Analytics to track which content performs best

## 🚨 Important Notes

- Replace all placeholder IDs with your actual tracking/ad IDs
- Test ads in development before going live
- Comply with GDPR/CCPA if applicable to your audience
- Always disclose affiliate relationships
- Monitor ad performance and adjust placements as needed

## 🧪 Testing

1. Build your site: `hugo`
2. Check that tracking codes are present in the HTML source
3. Use browser developer tools to verify analytics fires
4. Test affiliate links redirect correctly
5. Ensure ads display properly on mobile and desktop

Remember to regularly check your analytics and ad performance to optimize your monetization strategy!