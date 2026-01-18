---
description: Deploy portfolio site to Vercel
---

# Deploy to Vercel Workflow

This workflow guides you through deploying your portfolio site to Vercel.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub repository connected to Vercel
- Environment variables ready (`EMAIL_USER` and `EMAIL_PASS`)

## Steps

### 1. Commit Your Changes

First, stage and commit all your changes:

```bash
git add .
git commit -m "Add contact form with email functionality and community section"
```

### 2. Push to GitHub

// turbo
```bash
git push origin main
```

### 3. Deploy to Vercel

You have two options:

#### Option A: Vercel Dashboard (Recommended for first deployment)

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repository (`gconnect/portfolio-site`)
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. Add Environment Variables:
   - `EMAIL_USER`: Your Gmail address (e.g., `agatevureglory@gmail.com`)
   - `EMAIL_PASS`: Your Gmail app password (without spaces, e.g., `udqtpiuntzldzxta`)
6. Click "Deploy"
7. Wait for deployment to complete (~2-3 minutes)

#### Option B: Vercel CLI (For subsequent deployments)

Install Vercel CLI globally:

```bash
npm i -g vercel
```

Login to Vercel:

```bash
vercel login
```

Deploy to production:

// turbo
```bash
vercel --prod
```

**Note**: When using CLI for the first time, you'll be prompted to:
- Link to existing project or create new one
- Set up environment variables (or add them via dashboard)

### 4. Verify Deployment

After deployment completes:

1. Visit your deployment URL (shown in terminal or Vercel dashboard)
2. Test the contact form:
   - Navigate to the Contact section
   - Fill out the form with test data
   - Submit and verify you receive the email
3. Check all sections load correctly

### 5. Set Up Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### Contact Form Not Working

- Verify environment variables are set in Vercel dashboard
- Check `EMAIL_PASS` has no spaces
- Ensure Gmail app password is valid
- Check deployment logs for errors

### Build Failures

- Run `npm run build` locally to test
- Check for TypeScript errors
- Verify all dependencies are in `package.json`

### Environment Variables Not Applied

- Redeploy after adding environment variables
- Environment variables are only available at build time and runtime, not in the browser

## Quick Redeploy

For subsequent updates:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically deploy when you push to the main branch (if auto-deployment is enabled).
