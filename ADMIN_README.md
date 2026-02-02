# Admin Dashboard - Setup & Usage Guide

This portfolio site now includes a complete admin dashboard for managing content without modifying code.

## 🚀 Features

- ✅ **Google OAuth Authentication** - Secure login with your Google account
- ✅ **File-Based Storage** - All content stored in JSON files (no database required)
- ✅ **Git Version Control** - All changes automatically tracked
- ✅ **Personal Info Management** - Update bio, contact info, and social links
- ✅ **Speaking Engagements** - Manage conference talks and events
- ✅ **Blog Posts** - Create and publish blog content (coming soon)
- ✅ **Projects** - Manage your portfolio projects (coming soon)
- ✅ **Awards & Recognition** - Track achievements (coming soon)
- ✅ **Image Uploads** - Upload and manage images

## 📋 Prerequisites

- Node.js 18+ installed
- Google Cloud account (for OAuth)
- Git repository

## 🔧 Setup Instructions

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure Google OAuth

Follow the detailed guide in [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) to:
1. Create a Google Cloud project
2. Configure OAuth consent screen
3. Create OAuth credentials
4. Get your Client ID and Secret

### 3. Set Up Environment Variables

1. Generate a NextAuth secret:
   ```bash
   openssl rand -base64 32
   ```

2. Create `.env.local` file in the project root:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<paste-generated-secret>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```

### 4. Configure Admin Access

The admin authorization is controlled by `data/admin-config.json`:

```json
{
  "admins": ["gconnect"],
  "updated_at": "2026-01-27T22:33:00Z"
}
```

To add more admins, add their email prefixes to the `admins` array.

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/admin/login` to access the admin portal.

## 📁 File Structure

```
portfolio-site/
├── data/                          # Content storage (JSON files)
│   ├── admin-config.json          # Admin user configuration
│   ├── personal-info.json         # Personal information
│   ├── speaking-engagements.json  # Speaking events (to be created)
│   ├── blog-posts.json            # Blog posts
│   ├── projects.json              # Projects (to be created)
│   ├── awards.json                # Awards (to be created)
│   └── publications.json          # Publications (to be created)
│
├── public/uploads/                # User-uploaded images
│   ├── profile/
│   ├── events/
│   ├── blog/
│   └── projects/
│
├── src/app/admin/                 # Admin dashboard pages
│   ├── layout.tsx                 # Admin layout with sidebar
│   ├── page.tsx                   # Dashboard overview
│   ├── login/page.tsx             # Login page
│   ├── personal-info/page.tsx     # Personal info editor
│   └── ...                        # Other admin pages
│
├── src/app/api/                   # API routes
│   ├── admin/                     # Protected admin endpoints
│   │   ├── speaking/route.ts
│   │   └── upload/route.ts
│   ├── public/                    # Public endpoints
│   │   └── personal-info/route.ts
│   └── auth/[...nextauth]/route.ts
│
└── src/lib/
    ├── auth.ts                    # NextAuth configuration
    └── storage.ts                 # File storage utilities
```

## 🎯 Usage

### Accessing the Admin Dashboard

1. Navigate to `http://localhost:3000/admin/login`
2. Click "Sign in with Google"
3. Sign in with your authorized Google account
4. You'll be redirected to the admin dashboard

### Managing Content

#### Personal Information
- Go to **Personal Info** in the sidebar
- Update your name, bio, contact details, and social links
- Click "Save Changes"

#### Speaking Engagements
- Go to **Speaking** in the sidebar
- Add new events with details and photos
- Edit or delete existing events

#### Blog Posts (Coming Soon)
- Create rich-text blog posts
- Add featured images and tags
- Publish or save as drafts

### Uploading Images

Images can be uploaded through the admin interface and are stored in `public/uploads/`.

## 🔒 Security

- **Authentication**: Google OAuth via NextAuth.js
- **Authorization**: Only users in `data/admin-config.json` can access admin routes
- **Protected Routes**: Middleware protects all `/admin/*` routes
- **Session Management**: JWT-based sessions with secure cookies

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub

2. Import project in Vercel

3. Add environment variables in Vercel project settings:
   ```
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=<your-secret>
   GOOGLE_CLIENT_ID=<your-client-id>
   GOOGLE_CLIENT_SECRET=<your-client-secret>
   ```

4. Update Google OAuth redirect URIs to include:
   ```
   https://your-domain.com/api/auth/callback/google
   ```

5. Deploy!

### Other Platforms

The admin system works on any Node.js hosting platform. Just ensure:
- Environment variables are set
- File system is writable (for JSON files)
- Google OAuth redirect URIs are configured

## 📝 Content Management Workflow

1. **Make Changes** - Update content through the admin dashboard
2. **Auto-Save** - Changes are saved to JSON files immediately
3. **Commit** - Commit the updated JSON files to Git
4. **Deploy** - Push to trigger automatic deployment

## 🛠️ Troubleshooting

### "Access Denied" Error
- Verify your email is in `data/admin-config.json`
- Check you're using the correct Google account

### "Redirect URI Mismatch"
- Ensure redirect URI in Google Console matches exactly
- Check for trailing slashes or typos

### Changes Not Appearing
- Clear browser cache
- Check JSON files were updated
- Restart development server

### Build Errors
- Ensure all environment variables are set
- Run `npm install` to verify dependencies
- Check for TypeScript errors with `npm run build`

## 📚 Next Steps

- [ ] Add speaking engagements through the admin panel
- [ ] Create blog posts (feature coming soon)
- [ ] Add projects (feature coming soon)
- [ ] Customize the admin dashboard theme
- [ ] Set up automated backups of JSON files

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)
3. Check Next.js and NextAuth.js documentation

## 📄 License

Same as the main project.
