# N.E.X.T.

**N.E.X.T.** - _Nurturing Entrepreneurs and eXceptional Talents_

N.E.X.T. is a comprehensive mobile platform designed to connect **job seekers**, **established companies**, and **startup founders**. It serves as a centralized ecosystem for **professional networking**, **job hunting**, and **talent acquisition**.

---

## 🚀 Key Features

* **Multi-User Platform**  
Tailored experiences for job seekers, companies, and startup founders.
* **Smart Job Matching**  
Connect talent with relevant opportunities based on skills and preferences.
* **Networking Hub**  
Build professional connections with industry peers and leaders.
* **Company Profiles**  
Showcase business information, work culture, and open positions.
* **Job Seeker Profiles**  
Highlight skills, experience, and career goals.
* **Startup Ecosystem**  
Resources and connections specifically for early-stage ventures.
* **Event Calendar**  
Track and manage industry events and interviews.
* **Messaging System**  
Direct communication between all platform users.

---

## 🛠️ Technology Stack

* **React Native / Expo**
* **TypeScript**
* **Expo Router** for navigation
* **Zustand** for state management
* **Linear Gradient** for UI effects
* **Lucide React Native** for icons

---

## ⚙️ Installation & Setup

### 📋 Prerequisites

* Node.js (v16 or newer)
* npm or yarn
* Expo CLI
* Expo Go app (for mobile testing)

### 📥 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/next-app.git
cd next-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Fix dependency issues (if needed)**

```bash
npm install --legacy-peer-deps
# or
yarn install --ignore-engines
```

4. **Run the app**

```bash
npx expo start
```

* Scan the QR code with the **Expo Go** app (Android) or Camera app (iOS)
* Press `'a'` to open in an **Android emulator**
* Press `'i'` to open in an **iOS simulator**
* Press `'w'` to open in a **web browser**

---

## 📁 Project Structure

```
NEXT/
├── app/                     # Main application screens and navigation
│   ├── _layout.tsx          # Root layout & navigation structure
│   ├── (individual)/        # Job seeker flow screens
│   ├── (company)/           # Company flow screens
│   ├── (startup)/           # Startup flow screens
│   ├── splash.tsx           # Splash screen with animations
│   └── ...                  # Other screens (login, signup, etc.)
├── components/              # Reusable UI components
├── constants/               # App constants including colors
├── store/                   # Zustand store modules
├── assets/                  # Images, fonts and other static assets
│   └── images/              # App images including logo
├── types/                   # TypeScript type definitions
└── app.json                 # Expo configuration
```

## 👥 User Flows

The app supports three main user types, each with a tailored experience:

1. **Individual (Job Seeker)**
   - Browse job listings
   - Create and maintain professional profile
   - Connect with companies and startups
   - Schedule interviews

2. **Company**
   - Post job opportunities
   - Search for qualified candidates
   - Manage applications and interviews
   - Company profile and branding

3. **Startup**
   - Find co-founders and early employees
   - Connect with investors and mentors
   - Access resources for early-stage growth
   - Startup profile and mission statement

---

> Made with ❤️ by the N.E.X.T. Team 