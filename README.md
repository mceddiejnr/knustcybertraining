# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/6ce45e51-b055-42ce-a74d-80138c209bb6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6ce45e51-b055-42ce-a74d-80138c209bb6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Deploy with Lovable (Easiest)

Simply open [Lovable](https://lovable.dev/projects/6ce45e51-b055-42ce-a74d-80138c209bb6) and click on Share -> Publish.

### Option 2: Deploy to DigitalOcean App Platform

This cybersecurity training portal is optimized for deployment on DigitalOcean App Platform. Follow these steps:

#### Prerequisites
- A DigitalOcean account
- A GitHub repository with this code
- Your Supabase project credentials

#### Deployment Steps

1. **Push code to GitHub main branch**
   ```bash
   git add .
   git commit -m "Ready for DigitalOcean App Platform deployment"
   git push origin main
   ```

2. **Create App in DigitalOcean**
   - Log into your DigitalOcean control panel
   - Go to Apps → Create App
   - Connect your GitHub repository
   - Select the main branch

3. **Configure Build Settings**
   - **Component Type**: Web Service (App Platform will auto-detect this)
   - **Build Command**: `npm run build`
   - **Run Command**: `npm run preview` 
   - **Output Directory**: `dist`
   - **Port**: 8080

4. **Set Environment Variables**
   Before deployment, configure these environment variables in App Platform:
   
   **Required Variables:**
   ```
   VITE_SUPABASE_URL=https://dkhiilowutttziqghklj.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key_here
   ```
   
   **Optional Variables:**
   ```
   NODE_ENV=production
   ```

5. **Configure Health Check**
   - **Path**: `/health`
   - **Port**: 8080
   - **Initial Delay**: 30 seconds

6. **Deploy**
   - Review settings and click "Create Resources"
   - App Platform will build and deploy automatically
   - Monitor the build logs for any issues

#### Post-Deployment
- Test all functionality: authentication, discussions, admin panel
- The health endpoint is available at: `https://your-app-url/health`
- Set up custom domain if needed in App Platform Settings → Domains

#### Automatic Deployments
Once connected, any push to the main branch will trigger automatic redeployment.

#### Important Notes
- The Supabase publishable key is safe to expose in client-side code
- All credentials are configured via environment variables (no hardcoded secrets)
- The app includes a health check endpoint for monitoring
- Build process is optimized for App Platform's Node.js buildpack

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
