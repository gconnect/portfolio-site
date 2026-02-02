# Quick Google OAuth Setup

## Step 1: Create Google OAuth App (5 minutes)

1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Go to **APIs & Services** → **OAuth consent screen**
   - Select "External"
   - Fill in app name: "Portfolio Admin"
   - Add your email
   - Add yourself as a test user
   - Click through the rest

4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **OAuth 2.0 Client ID**
6. Select "Web application"
7. Add redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
8. Click **Create** and copy your:
   - Client ID
   - Client Secret

## Step 2: Generate NextAuth Secret

Run this command:
```bash
openssl rand -base64 32
```

Copy the output.

## Step 3: Create .env.local

Create a file called `.env.local` in your project root with:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<paste-the-secret-from-step-2>
GOOGLE_CLIENT_ID=<paste-your-client-id>
GOOGLE_CLIENT_SECRET=<paste-your-client-secret>
```

## Step 4: Restart Dev Server

```bash
npm run dev
```

## Step 5: Test Login

Visit: http://localhost:3000/admin/login

That's it! 🎉
