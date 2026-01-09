# Deployment Guide (Render + MongoDB Atlas)

This guide will help you deploy your Next.js application to **Render** for hosting and **MongoDB Atlas** for the database.

## 1. Prerequisites
- **GitHub Account**: Push your latest code to a GitHub repository.
- **Render Account**: [Sign up here](https://render.com/).
- **MongoDB Atlas Account**: [Sign up here](https://www.mongodb.com/cloud/atlas/register).

---

## 2. Database Setup (MongoDB Atlas)
Since Render is a serverless-style platform, you cannot use a local SQLite file (`dev.db`) for persistent production data. We will use a cloud MongoDB database.

1.  **Create a Cluster**: Log in to MongoDB Atlas and create a new **FREE** (Shared) cluster.
2.  **Create User**: go to **Database Access** -> `Add New Database User`.
    -   Username: `admin` (or your choice)
    -   Password: (Secure password)
    -   Role: `Atlas Admin` or `Read and write to any database`.
3.  **Allow Network Access**: Go to **Network Access** -> `Add IP Address`.
    -   Select `Allow Access from Anywhere` (`0.0.0.0/0`). This is required for Render to connect.
4.  **Get Connection String**:
    -   Go to **Database** (Cluster view) -> `Connect` -> `Drivers`.
    -   Copy the connection string. It looks like:
        `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
    -   **Important**: Replace `<password>` with your actual password.

---

## 3. Deployment on Render

1.  **New Web Service**:
    -   Go to your Render Dashboard.
    -   Click **New +** -> **Web Service**.
    -   Connect your GitHub repository.

2.  **Configuration**:
    -   **Name**: `analogy-website` (or your choice).
    -   **Region**: Closest to you (e.g., Singapore, Frankfurt, Oregon).
    -   **Branch**: `main`.
    -   **Runtime**: `Node`.
    -   **Build Command**: `npm install && npm run build`
        *(Note: If strict type checking fails build, use `npm install && npm run build -- --no-lint`)*
    -   **Start Command**: `npm start`

3.  **Environment Variables**:
    -   Scroll down to **Environment Variables** and add:
        -   `MONGODB_URI`: Paste your connection string from Step 2.
        -   `NEXT_PUBLIC_SITE_URL`: Your Render URL (e.g., `https://analogy-website.onrender.com`).
        -   `NODE_ENV`: `production`

4.  **Deploy**:
    -   Click **Create Web Service**.
    -   Render will start building. Watch the logs.
    -   Once you see `Ready`, your site is live!

---

## 4. Important Notes
-   **Admin Data**: Since you are moving to a fresh production database, your local content (Products, Team, etc.) will **NOT** be there automatically.
-   **Seeding**: You can visit your `/admin` page on the live site and add content manually, OR run a seed script if you configured one for production (currently `prisma/seed.ts` is for SQLite, so manual entry is recommended for now).
-   **SQLite Warning**: Do not rely on features using `prisma/dev.db` in production. Ensure all your critical features (Enquiries, Admin Content) are using the Mongoose models we set up.
