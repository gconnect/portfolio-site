# Deployment Guide

This guide covers deploying your portfolio site to Vercel with full contact form functionality.

## Quick Start

1. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Add environment variables (see below)
   - Click Deploy

## Environment Variables

Your contact form requires these environment variables to be set in Vercel:

| Variable | Value | Description |
|----------|-------|-------------|
| `EMAIL_USER` | `agatevureglory@gmail.com` | Gmail address for sending emails |
| `EMAIL_PASS` | Your app password (no spaces) | Gmail app password |

### How to Add Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Name: `EMAIL_USER`
   - Value: `agatevureglory@gmail.com`
   - Environment: Production, Preview, Development (select all)
4. Add second variable:
   - Name: `EMAIL_PASS`
   - Value: Your Gmail app password (e.g., `udqtpiuntzldzxta` - **no spaces**)
   - Environment: Production, Preview, Development (select all)
5. Click **Save**
6. **Redeploy** your project for changes to take effect

## Deployment Methods

### Method 1: Vercel Dashboard (Recommended)

**First-time setup:**

1. Create a Vercel account at https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository: `gconnect/portfolio-site`
4. Vercel auto-detects Next.js settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables (see above)
6. Click "Deploy"
7. Wait 2-3 minutes for deployment

**Subsequent deployments:**

Vercel automatically deploys when you push to GitHub (if auto-deployment is enabled).

### Method 2: Vercel CLI

**Install Vercel CLI:**

```bash
npm i -g vercel
```

**Login:**

```bash
vercel login
```

**Deploy:**

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

**First-time CLI setup:**
- You'll be prompted to link to an existing project or create a new one
- Environment variables can be added via CLI or dashboard

## Verification Checklist

After deployment, verify:

- [ ] Site loads at your Vercel URL
- [ ] All sections render correctly (Hero, About, Experience, Projects, Speaking, Community, Contact)
- [ ] Contact form submits successfully
- [ ] You receive test email at `agatevureglory@gmail.com`
- [ ] No console errors in browser DevTools
- [ ] Mobile responsive design works

## Custom Domain Setup (Optional)

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Click "Add Domain"
3. Enter your domain name
4. Follow DNS configuration instructions:
   - Add A record or CNAME record as instructed
   - Wait for DNS propagation (can take up to 48 hours)
5. Vercel automatically provisions SSL certificate

## Troubleshooting

### Contact Form Returns Error

**Problem**: "Failed to send email" error when submitting contact form

**Solutions**:
1. Verify environment variables are set in Vercel dashboard
2. Check `EMAIL_PASS` has **no spaces** (should be `udqtpiuntzldzxta`, not `udqt piun tzld zxta`)
3. Ensure Gmail app password is still valid
4. Check deployment logs in Vercel dashboard for detailed errors
5. Redeploy after adding/updating environment variables

### Build Fails

**Problem**: Deployment fails during build

**Solutions**:
1. Run `npm run build` locally to reproduce the error
2. Check for TypeScript errors
3. Verify all dependencies are in `package.json`
4. Check build logs in Vercel dashboard

### Environment Variables Not Working

**Problem**: Environment variables seem to be undefined

**Solutions**:
1. Ensure variables are added to all environments (Production, Preview, Development)
2. **Redeploy** after adding environment variables (they're not applied retroactively)
3. Check variable names match exactly (case-sensitive)
4. Remember: Environment variables are only available server-side, not in browser code

### Gmail Blocking Login

**Problem**: Gmail blocks the login attempt

**Solutions**:
1. Ensure you're using an **App Password**, not your regular Gmail password
2. Generate a new app password at https://myaccount.google.com/apppasswords
3. Verify 2-factor authentication is enabled on your Google account
4. Check for security alerts in your Gmail account

## Monitoring

### View Deployment Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on a deployment
3. View build logs and runtime logs

### View Function Logs (for API routes)

1. Go to Vercel Dashboard → Your Project → **Logs**
2. Filter by function: `/api/contact`
3. View real-time logs when contact form is submitted

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Production**: Pushes to `main` branch
- **Preview**: Pushes to other branches or pull requests

To disable automatic deployments:
1. Go to Settings → Git
2. Toggle off "Production Branch" or "Preview Branches"

## Useful Commands

```bash
# Check Git status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Deploy to Vercel (CLI)
vercel --prod

# View deployment logs (CLI)
vercel logs

# List deployments (CLI)
vercel ls
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review this troubleshooting guide
3. Check Vercel status page: https://www.vercel-status.com/
4. Contact Vercel support: https://vercel.com/support
