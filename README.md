# AyurAdda (formerly VaidyaVidya) - Project Status Report

This document serves as a progress report and hand-off guide detailing the work completed on the project and the remaining tasks to be addressed in future sessions.

## 📝 Work Completed So Far

### 1. Rebranding & UI
- **Name Change**: Successfully rebranded the entire platform from "VaidyaVidya" to **"AyurAdda"**.
- **Scope**: Rebranding was applied across metadata (`layout.tsx`), the hero section, the authentication pages (Login/Register), dashboard navigation, and backend email templates (`mail.ts`).

### 2. Authentication (NextAuth v5)
- **Google Sign-In**: Integrated `GoogleProvider` into `src/auth.ts`. The frontend buttons now correctly redirect users to the Google OAuth consent screen.
  - *Status*: Working. The correct `CLIENT_ID` and `CLIENT_SECRET` have been added to the `.env` file.
- **Credentials Fallback**: Verified that the traditional Email & Password authentication flow works flawlessly.
  - *Test Account*: Email: `teststudent@bams.edu` | Password: `password123`
- **Bug Fix**: Resolved a critical 500 Server Error during Google Auth that occurred because the `Resend` email client was throwing an error on initialization due to a missing API key.

### 3. Database & Content Seeding (Prisma)
- **Schema**: Validated the NextAuth schema (Accounts, Sessions, Users) against the PostgreSQL database.
- **Dynamic Data**: Transitioned the Course Catalog (`/courses`) from hard-coded mock data to dynamic database queries via Prisma.
- **Seed Script**: Built a dedicated database seeder (`prisma/seed.js`) that injects:
  - A dummy Instructor Profile (Dr. Sushruta AI).
  - Two sample 1st Year BAMS Courses (*Padartha Vijnana* & *Rachana Sharir*).
  - Working HLS Video streams via Mux for component testing.

### 4. Payments (Razorpay)
- **Backend API Routes**: Implemented two secure endpoints:
  - `/api/razorpay/create-order`: Generates a unique Razorpay Order ID.
  - `/api/razorpay/verify`: Validates the `razorpay_signature` cryptographically to ensure successful payment.
- **Frontend Integration**: Created a reusable `<CheckoutButton />` component that seamlessly loads the Razorpay checkout overlay directly on the course detail pages.
- **Environment**: Razorpay Test Keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`) are correctly loaded into the `.env` file for sandbox testing.

### 5. General Fixes
- **Image Domains**: Fixed a Next.js `next/image` host error by explicitly adding `images.unsplash.com` to `next.config.ts`.
- **Next.js Server Actions**: Resolved a compiler boundary error by moving server actions to a dedicated `actions/auth.ts` file away from client configurations.

---

## 🚀 Work Remaining (Next Steps)

For our next session, here is the prioritized checklist of what needs to be tackled:

### 1. Finalize Razorpay End-to-End Testing
- **Action**: Use Razorpay's Test Cards (e.g., `4111 1111 1111 1111`) to simulate a purchase.
- **Goal**: Verify that upon a successful transaction, the `/api/razorpay/verify` endpoint correctly creates a `Payment` record and an `Enrollment` record for the user in the database.

### 2. Video Player Content Gating
- **Action**: Implement conditional logic in the course details page (`/courses/[slug]`).
- **Goal**: Ensure the actual video player component is **locked** or hidden if the `Enrollment` record does not exist for the signed-in user, directing them to the `<CheckoutButton />` instead.

### 3. User Dashboard Population
- **Action**: Update the `/dashboard` route to dynamically fetch Prisma `Enrollment` and `Progress` records.
- **Goal**: Display the specific courses the user has purchased instead of UI placeholders.

### 4. Production Environment Setup (Optional/Later)
- **Database**: Ensure the Supabase Postgres instance is ready and migrations (`npx prisma migrate deploy`) are applied.
- **Resend Email**: Acquire a standard API key for `RESEND_API_KEY` to enable Password Reset and Verification emails.
- **Live Keys**: Swap out the Razorpay Test variables for Live credentials when ready for real transactions.

---
*Generated: March 2026*
