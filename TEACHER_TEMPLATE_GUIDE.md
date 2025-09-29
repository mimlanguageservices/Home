# Teacher Dashboard Template Guide

This template allows teachers to create their own personalized dashboard that automatically syncs with Google Sheets data.

## Quick Setup (5 minutes)

### Step 1: Copy the Template
1. Make a copy of `Teacher-Template.html`
2. Rename it to `YourName-Home.html` (e.g., `Sarah-Home.html`)

### Step 2: Update Teacher Configuration
Open your HTML file and find the `TEACHER_CONFIG` section (around line 478). Update these values:

```javascript
const TEACHER_CONFIG = {
    // Basic Information
    teacherName: 'Your Name',              // Replace with your name
    teacherTitle: 'English Teacher',        // Your title/role
    headerTitle: "Your Name's Profile",     // Header text
    
    // Google Sheets URL - IMPORTANT: Use your own sheet
    sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit',
    
    // Profile Image - Add your photo URL
    profileImage: 'https://your-photo-url.com/photo.jpg',
    
    // Keep these as is (unless you have different values)
    websiteUrl: 'https://www.mimlanguageservices.com/',
    websiteLogo: 'https://static.wixstatic.com/media/593d03_21d7db92a5cc4b1c9633f867764de873~mv2.png',
    
    // Customize tabs if needed
    tabs: {
        home: { show: true, label: 'Home' },
        students: { show: true, label: 'Students' },
        invoicing: { show: true, label: 'Invoicing' },
        work: { show: true, label: 'Call' }
    },
    
    // Your teaching platforms
    platforms: ['MIM', 'Linked', 'Italki', 'Preply'],
    
    // GitHub Pages URL for student profiles
    githubPagesUrl: 'https://mimlanguageservices.github.io/Students/'
};
```

## Configuration Details

### 1. Google Sheets URL
- Use the same Google Sheets format as the student management system
- Required columns:
  - `Student Name` - Student's full name
  - `Contract` - Platform (MIM, Linked, Italki, Preply)
  - `Workplace or Studies` - Student's workplace/studies
  - `Image Url` - Student's profile photo URL
  - `Role` - Student's job title/role
  - `Level` - Student's English level (A1-C2)
  - `Class Link` - Video call link (Teams, Zoom, etc.)
  - `Whatsapp` - WhatsApp number
  - `Vocabulary URL` - Link to vocabulary sheet

### 2. Profile Image
- Upload your photo to any image hosting service:
  - Google Drive (make it public)
  - Imgur
  - Cloudinary
  - Or use the MIM website media
- Use a square image for best results (recommended: 300x300px minimum)

### 3. Customizing Tabs
You can show/hide tabs by setting `show: true/false`:

```javascript
tabs: {
    home: { show: true, label: 'Home' },
    students: { show: true, label: 'Students' },
    invoicing: { show: false, label: 'Invoicing' },  // Hidden
    work: { show: true, label: 'Schedule' }          // Renamed
}
```

### 4. Teaching Platforms
Add or remove platforms based on where you teach:

```javascript
platforms: ['MIM', 'Private', 'Online', 'Corporate']
```

## Features

### Automatic Features
- ✅ Syncs with Google Sheets data
- ✅ Groups students by platform/contract
- ✅ Shows student profile pictures
- ✅ Quick access buttons for:
  - Student profile pages
  - Vocabulary sheets
  - Video call links
  - WhatsApp contact
- ✅ Responsive design (works on mobile)
- ✅ Student counts on home page

### Customizable Sections
1. **Home Tab**: Shows your profile and statistics
2. **Students Tab**: Organized by teaching platform
3. **Invoicing Tab**: Ready for custom content
4. **Work/Call Tab**: Ready for custom content

## Advanced Customization

### Change Colors
To change the color scheme, modify the gradient in the CSS (line 18):

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Try these color combinations:
- Blue/Green: `#3494E6 0%, #EC6EAD 100%`
- Purple/Pink: `#8E2DE2 0%, #4A00E0 100%`
- Orange/Red: `#FF512F 0%, #F09819 100%`

### Add Custom Sections
To add a new section to the invoicing or work tabs, replace the placeholder content:

```html
<div class="section" id="invoicing">
    <h2>Invoicing Dashboard</h2>
    <div class="main-content">
        <!-- Add your custom content here -->
        <div class="profile-card">
            <h3>Monthly Summary</h3>
            <!-- Your invoicing content -->
        </div>
    </div>
</div>
```

## Troubleshooting

### "Template Configuration Required" Error
- Make sure you've updated the `sheetUrl` in TEACHER_CONFIG
- Check that your Google Sheet is publicly readable

### Students Not Loading
1. Verify your Google Sheets URL is correct
2. Ensure the sheet has the required columns
3. Check browser console for errors (F12)

### Images Not Showing
- Use HTTPS URLs for all images
- Ensure images are publicly accessible
- Check image URLs are correctly formatted

## Deployment Options

### Option 1: Local File
- Simply open the HTML file in your browser
- Bookmark it for easy access

### Option 2: GitHub Pages
1. Create a GitHub repository
2. Upload your HTML file
3. Enable GitHub Pages in repository settings
4. Access at: `https://yourusername.github.io/repository-name/YourName-Home.html`

### Option 3: Web Hosting
- Upload to any web hosting service
- Works with free hosts like Netlify, Vercel, or Surge

## Support

For help or questions:
1. Check the browser console for error messages
2. Verify all configuration values are correct
3. Ensure Google Sheets permissions are set properly
4. Contact the MIM tech support team

## Examples

### Example Configuration
```javascript
const TEACHER_CONFIG = {
    teacherName: 'Sarah Johnson',
    teacherTitle: 'Senior English Teacher',
    headerTitle: "Sarah's Dashboard",
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit',
    profileImage: 'https://i.imgur.com/abc123.jpg',
    websiteUrl: 'https://www.mimlanguageservices.com/',
    websiteLogo: 'https://static.wixstatic.com/media/593d03_21d7db92a5cc4b1c9633f867764de873~mv2.png',
    tabs: {
        home: { show: true, label: 'Dashboard' },
        students: { show: true, label: 'My Students' },
        invoicing: { show: true, label: 'Billing' },
        work: { show: true, label: 'Schedule' }
    },
    platforms: ['MIM', 'Private', 'Corporate'],
    githubPagesUrl: 'https://mimlanguageservices.github.io/Students/'
};
```

Happy teaching! 🎓