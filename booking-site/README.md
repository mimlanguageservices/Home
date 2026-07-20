# Calendly Booking & Lessons Website

A simple, elegant website for online lesson bookings with integrated Google Sheets lesson management.

## Features

- **Calendly Integration**: Embedded inline calendar for seamless booking experience
- **Lessons Page**: Dynamic lesson display powered by Google Sheets
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Modern UI**: Clean gradient design with smooth animations

## Setup Instructions

### 1. Calendly Setup

1. Open [index.html](index.html)
2. Find the line: `data-url="YOUR_CALENDLY_URL_HERE"`
3. Replace with your Calendly scheduling link (e.g., `https://calendly.com/your-username/30min`)

### 2. Google Sheets Setup

#### Step A: Create and Configure Your Sheet

1. Create a Google Sheet with lesson data
2. Recommended column headers:
   - `Title` or `Name`: Lesson title
   - `Description` or `Desc`: Lesson description
   - `Date`: Lesson date (optional)
   - `Link` or `URL`: Link to lesson materials
3. Make the sheet publicly viewable:
   - Click "Share" → "Anyone with the link" → "Viewer"

#### Step B: Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable "Google Sheets API":
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key
   - (Optional) Restrict the key to "Google Sheets API" only

#### Step C: Configure lessons.js

1. Open [lessons.js](lessons.js)
2. Replace the configuration values:

```javascript
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // From your sheet URL
const API_KEY = 'YOUR_GOOGLE_API_KEY';   // From Google Cloud Console
const SHEET_NAME = 'Sheet1';              // Your sheet tab name
```

**Finding your Sheet ID:**
- Your Google Sheets URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
- Copy the long string between `/d/` and `/edit`

### 3. Test Your Site

1. Open [index.html](index.html) in a web browser
2. Check that Calendly calendar loads properly
3. Navigate to Lessons page and verify data displays correctly

### 4. Deployment

You can deploy this site to:
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Drag and drop deployment
- **Vercel**: Simple static site hosting
- **Any web server**: Upload all files via FTP

## File Structure

```
booking-site/
├── index.html      # Main booking page with Calendly
├── lessons.html    # Lessons page with Google Sheets data
├── styles.css      # Shared stylesheet
├── lessons.js      # JavaScript for fetching Google Sheets data
└── README.md       # This file
```

## Customization

### Colors

The site uses a purple gradient theme. To change colors, edit [styles.css](styles.css):

```css
/* Main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Accent colors */
color: #667eea; /* Links and highlights */
```

### Content

- Edit text in [index.html](index.html) and [lessons.html](lessons.html)
- Update the "How It Works" steps in [index.html](index.html)
- Modify the logo text in both HTML files

### Branding

Replace "Language Lessons" with your business name in:
- `.logo` class in both HTML files
- Footer copyright text
- Page titles in `<title>` tags

## Troubleshooting

**Calendly not showing:**
- Verify your Calendly URL is correct
- Check browser console for errors
- Ensure you're using the full Calendly URL (starts with `https://`)

**Lessons not loading:**
- Verify Google Sheet is publicly viewable
- Check that Sheet ID and API Key are correct
- Open browser console to see specific error messages
- Ensure Google Sheets API is enabled in Google Cloud Console
- Check that column headers in your sheet match expected names

**API Key restrictions:**
- If using HTTP Referrer restrictions, add your website domain
- For local testing, you may need to temporarily remove restrictions

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Free to use and modify for personal or commercial projects.
