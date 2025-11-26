# AWS Amplify Deployment Guide

## 🚀 Deploy Your Game Portal to AWS Amplify

This guide will walk you through deploying your entire game collection to AWS Amplify for free hosting.

---

## Prerequisites

1. **AWS Account** - Create one at [aws.amazon.com](https://aws.amazon.com) (free tier available)
2. **Git Repository** - Your code needs to be in a Git repository (GitHub, GitLab, or Bitbucket)

---

## Step 1: Prepare Your Project

### 1.1 Initialize Git Repository (if not already done)

```bash
cd /Users/krupeshpatel/Code
git init
```

### 1.2 Create `.gitignore` file

```bash
echo ".DS_Store" > .gitignore
```

### 1.3 Commit Your Code

```bash
git add .
git commit -m "Initial commit - Game Portal with 9 games"
```

---

## Step 2: Push to GitHub

### 2.1 Create a GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Name it: `game-portal` (or your preferred name)
4. **Do NOT** initialize with README (we already have code)
5. Click **Create repository**

### 2.2 Connect and Push

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/game-portal.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to AWS Amplify

### 3.1 Access AWS Amplify Console

1. Log in to [AWS Console](https://console.aws.amazon.com)
2. Search for **"Amplify"** in the services search bar
3. Click **AWS Amplify**

### 3.2 Create New App

1. Click **"New app"** → **"Host web app"**
2. Select **GitHub** as your Git provider
3. Click **"Continue"**
4. Authorize AWS Amplify to access your GitHub account

### 3.3 Configure Repository

1. Select your repository: `game-portal`
2. Select branch: `main`
3. Click **"Next"**

### 3.4 Build Settings

AWS Amplify will auto-detect that this is a static site. The default settings should work:

```yaml
version: 1
frontend:
  phases:
    build:
      commands: []
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
  cache:
    paths: []
```

**Important:** Make sure `baseDirectory` is set to `/` (root directory)

Click **"Next"**

### 3.5 Review and Deploy

1. Review all settings
2. Click **"Save and deploy"**

🎉 **Your site is now deploying!**

---

## Step 4: Monitor Deployment

The deployment process has 4 stages:
1. **Provision** - Setting up infrastructure (~1 min)
2. **Build** - Building your app (~1 min)
3. **Deploy** - Deploying to CDN (~1 min)
4. **Verify** - Final checks (~30 sec)

Total time: **~3-4 minutes**

---

## Step 5: Access Your Live Site

Once deployment completes:

1. You'll see a URL like: `https://main.d1a2b3c4d5e6f7.amplifyapp.com`
2. Click the URL to view your live game portal!
3. All 9 games will be accessible

---

## 🎮 Your Live Games

After deployment, your games will be available at:

- **Main Portal:** `https://your-app.amplifyapp.com/`
- **Balloon Popper:** `https://your-app.amplifyapp.com/balloon_popper/balloon_popper.html`
- **Math Balancer:** `https://your-app.amplifyapp.com/math_balancer/math_balancer.html`
- **Rain Protector:** `https://your-app.amplifyapp.com/rain_protector/index.html`
- **Moon Rocks:** `https://your-app.amplifyapp.com/moon_rocks/index.html`
- **Floor is Lava:** `https://your-app.amplifyapp.com/gravity_flip/index.html`
- **Space Cleanup:** `https://your-app.amplifyapp.com/space_cleanup/space_cleanup.html`
- **Neon Galaxy:** `https://your-app.amplifyapp.com/neon_galaxy/neon_galaxy.html`
- **Rubik's Companion:** `https://your-app.amplifyapp.com/rubiks_companion/index.html`
- **Find the Light:** `https://your-app.amplifyapp.com/find_the_light/find_light.html`

---

## 🔄 Automatic Updates

**Best part:** Every time you push to GitHub, AWS Amplify automatically rebuilds and deploys!

```bash
# Make changes to your games
git add .
git commit -m "Updated balloon popper speed"
git push

# Amplify automatically detects and deploys! 🚀
```

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. In Amplify Console, click **"Domain management"**
2. Click **"Add domain"**
3. Enter your domain (e.g., `mygames.com`)
4. Follow DNS configuration steps
5. Amplify provides free SSL certificate!

---

## 💰 Pricing

**AWS Amplify Free Tier:**
- **Build minutes:** 1,000 minutes/month (plenty for your static site)
- **Storage:** 5 GB
- **Data transfer:** 15 GB/month
- **Requests:** Unlimited

Your game portal will likely stay **100% free** unless you get massive traffic!

---

## 🛠️ Troubleshooting

### Issue: Games not loading

**Fix:** Check that all file paths are relative (not absolute). Your code already uses relative paths, so this should work fine.

### Issue: Music not playing

**Fix:** Modern browsers require user interaction before playing audio. Your games already handle this correctly with click-to-start.

### Issue: Build fails

**Fix:** Check the build logs in Amplify Console. Usually it's a missing file or incorrect path.

---

## 📱 Mobile Optimization

Your games are already mobile-friendly! Amplify serves them with:
- ✅ Responsive design
- ✅ Touch controls
- ✅ Fast CDN delivery worldwide
- ✅ Automatic HTTPS

---

## 🎯 Next Steps

1. **Share your games:** Send the Amplify URL to friends!
2. **Monitor traffic:** Check Analytics in Amplify Console
3. **Add more games:** Just push to GitHub, auto-deploys!
4. **Custom domain:** Make it `yourgames.com`

---

## 📞 Support

- **AWS Amplify Docs:** [docs.amplify.aws](https://docs.amplify.aws)
- **GitHub Issues:** Create issues in your repo
- **AWS Support:** Free tier includes community support

---

**🎉 Congratulations! Your games are now live on the internet!**

Share your game portal with the world! 🌍
