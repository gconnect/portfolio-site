# Google OAuth Setup Guide

Follow these steps to set up Google OAuth for your admin dashboard.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "Portfolio Admin")
4. Click "Create"

## Step 2: Configure OAuth Consent Screen

1. In the left sidebar, go to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type
3. Click **Create**
4. Fill in the required fields:
   - App name: "Portfolio Admin"
   - User support email: your email
   - Developer contact email: your email
5. Click **Save and Continue**
6. Skip "Scopes" (click **Save and Continue**)
7. Add your email as a test user
8. Click **Save and Continue**

## Step 3: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. Select **Web application**
4. Name it "Portfolio Admin Client"
5. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   For production, also add:
   ```
   https://your-domain.com/api/auth/callback/google
   ```
6. Click **Create**
7. **Copy your Client ID and Client Secret** (you'll need these next)

## Step 4: Configure Environment Variables

1. Generate a NextAuth secret:
   ```bash
   openssl rand -base64 32
   ```

2. Create/update `.env.local` in your project root:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<paste-the-generated-secret>
   GOOGLE_CLIENT_ID=<paste-your-client-id>
   GOOGLE_CLIENT_SECRET=<paste-your-client-secret>
   ```

3. For production deployment (Vercel), add these same variables to your project settings

## Step 5: Update Admin Config

The admin authorization is controlled by `data/admin-config.json`. By default, it's set to:

```json
{
  "admins": ["gconnect"],
  "updated_at": "2026-01-27T22:33:00Z"
}
```

The system will check if your Google email prefix matches any username in the `admins` array.

## Step 6: Test the Login

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/admin/login`

3. Click "Sign in with Google"

4. Sign in with your Google account

5. If successful, you'll be redirected to the admin dashboard

## Troubleshooting

### "Access Denied" Error
- Verify your email is authorized in `data/admin-config.json`
- Check that you're signing in with the correct Google account

### "Redirect URI Mismatch" Error
- Ensure the redirect URI in Google Cloud Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- Check for trailing slashes or typos

### "Invalid Client" Error
- Verify your Client ID and Secret are correctly copied to `.env.local`
- Restart your development server after updating environment variables

## Production Deployment

When deploying to production (e.g., Vercel):

1. Add your production domain to **Authorized redirect URIs** in Google Cloud Console:
   ```
   https://your-domain.com/api/auth/callback/google
   ```

2. Update environment variables in your hosting platform:
   - `NEXTAUTH_URL=https://your-domain.com`
   - `NEXTAUTH_SECRET=<same-secret>`
   - `GOOGLE_CLIENT_ID=<same-client-id>`
   - `GOOGLE_CLIENT_SECRET=<same-client-secret>`

3. Deploy your application

## Security Notes

- Never commit `.env.local` to Git
- Keep your Client Secret secure
- Only add trusted users to `data/admin-config.json`
- Use strong, unique NEXTAUTH_SECRET for production
