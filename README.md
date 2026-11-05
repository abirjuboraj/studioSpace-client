# StudioSpace — Creative Workspace & Production Studio Booking Platform

A modern, peer-to-peer creative workspace rental and studio booking platform built with **Next.js 15 (Turbopack)**, **Better-Auth**, **Tailwind CSS**, and **MongoDB**. StudioSpace connects photographers, videographers, podcasters, music producers, and artists with professionally equipped studios and soundstages with instant booking capabilities.

---

## 🌐 Live URL & Repositories

- **Live Application URL**: [https://studiospace-client.vercel.app](https://studiospace-client.vercel.app)
- **Client Repository**: [https://github.com/abirjuboraj/studioSpace-client](https://github.com/abirjuboraj/studioSpace-client)
- **Server Repository**: [https://github.com/abirjuboraj/studioSpace-server](https://github.com/abirjuboraj/studioSpace-server)

---

## ✨ Key Features (Minimum 5 Highlights)

1. **Dynamic Studio Discovery & Instant Filtering**:
   - Browse creative spaces across 5 distinct categories: *Photo Studios*, *Sound Stages*, *Podcast Rooms*, *Music Suites*, and *Art Workshops*.
   - Filter by workspace category, minimum booking duration, hourly rates, and capacity with responsive grid layouts.

2. **Real-time Studio Availability & Slot Validation**:
   - Supports studio booking availability by tracking the database.
   - When booked, workspaces clearly display an unavailable alert banner with the booking button disabled.
   - Host-configured operating hour validation prevents bookings outside opening hours with inline error guidance.

3. **Complete Creator Reservation System**:
   - Interactive scheduling modal calculating dynamic total cost, refundable security deposits, and booking duration in real time.
   - Server-side conflict detection returning `HTTP 409` if another session requests the slot.

4. **Self-Service Booking Management & Intelligent Cancellation**:
   - Dedicated "My Bookings" page allowing creators to review all reservations, track status (Pending, Confirmed, Completed, Cancelled), and view receipts.
   - Cancellations safely mark status as `"Cancelled"` and release the studio without deleting reservation history.
   - Dynamic Dashboard recalculates and deducts cancelled reservation costs from total spend metrics automatically.

5. **Host Workspace Listing & Image Management**:
   - Creators and studio owners can list new studios with comprehensive metadata: amenity selections, gear lists, operating windows, pricing, and photo URLs.
   - Includes full workspace editing, listing status management, and host contact visibility.

6. **Secure Authentication & Session Management**:
   - Better-Auth credential login/signup and Google OAuth integration with JWT session authorization.
   - Strict password security validation (min 6 characters, uppercase, and lowercase requirements).

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Auth Client**: [Better-Auth](https://www.better-auth.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### Backend (Server)
- **Runtime & Framework**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Security & Tokens**: [jose](https://github.com/panva/jose) (JWT verification)
- **Media Upload**: ImgBB API & Multer

---

## 🚀 Local Setup Instructions

Follow these steps to run the application locally:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.17+ or v20+ recommended)
- `npm` or `pnpm` / `yarn`
- MongoDB database instance (local or MongoDB Atlas connection string)

### 2. Clone the Repository
```bash
git clone https://github.com/abirjuboraj/studioSpace-client.git
cd studioSpace-client
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root of `studiospace-client`:

```env
# MongoDB Connection
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/studioSpace?retryWrites=true&w=majority

# Better-Auth Configuration
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret_here

# Backend API URL (Default Express Server)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Optional Google OAuth (if testing Google sign-in)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore StudioSpace.

### 6. (Optional) Run the Backend Server
In a separate terminal:
```bash
cd ../studiospace-server
npm install
npm run dev # or node index.js
```

---

## 🔑 Examiner Test Credentials

Examiners can explore the platform using the pre-configured credentials below or register a new account on the registration page:

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Examiner** | `examiner@gmail.com` | `examineR` | Has active listings and test booking history |


> **Note**: You can also use the **"Sign up with Google"** button to authenticate with your own Google account.
