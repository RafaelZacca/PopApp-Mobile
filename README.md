# 🎧 PopApp Mobile

PopApp is a PoC mobile application built with React Native and Expo that listens to short audio clips, identifies the song being played, and recommends similar tracks. It features animated interactions, custom modals, and smooth transitions to offer a fun and interactive experience. This is a PoC, which means this has been developed under the purpose of trying and learning the technology, and there is no intention of putting this App on production.

---

## ✨ Features

- [React Native](https://reactnative.dev/) + [React Navigation v6](https://reactnavigation.org/)
-  [TypeScript](https://www.typescriptlang.org/docs/handbook/react.html)
- [Expo SDK 50+](https://docs.expo.dev/)
- [Lottie Animations](https://github.com/lottie-react-native/lottie-react-native)
- Audio recording with [expo-av](https://docs.expo.dev/versions/latest/sdk/av/)
- Live connection with a backend API for recognition and recommendation

---

## ⚙️ Installation

### 1. Install requirements

- [Node.js ≥ 18](https://nodejs.org/en/download/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 2. Clone the project
```bash
git clone https://github.com/RafaelZacca/PopApp-Mobile.git
cd PopApp-Mobile
```

### 3. Install dependencies
```bash
npm install
```

---

## ⚡ Getting Started

Start the app in development mode:
```bash
npx expo start
```

Then press:
- `a` to open on Android
- `i` to open on iOS (macOS only)
- `w` to open in browser

---

## 🌐 API References

This project requires the [PopApp Backend API](https://github.com/RafaelZacca/PopApp-API.git) to work correctly.

To set up the backend:
- Clone: `https://github.com/RafaelZacca/PopApp-API.git`
- Follow the backend README to run it locally
- Ensure CORS is enabled and both projects are aligned

---

## 🚀 Deployment Builds

Expo SDK 46+ and above use [**EAS Build**](https://docs.expo.dev/build/introduction/) instead of the deprecated `expo build`.

### Install EAS CLI
```bash
npm install -g eas-cli
```

### Build the app

**Android:**
```bash
eas build --platform android
```

**iOS:**
```bash
eas build --platform ios
```

### Check build status
```bash
eas build:list
```

### Run local production preview
```bash
npx expo start --no-dev --minify
```

---

## 📁 Project Structure

```
.
├── assets                # Static assets (icons, splash)
├── components            # Reusable UI components
├── modals                # Modal screens (e.g., recommendations)
├── pages                 # Main application pages
├── models                # TypeScript interfaces for API models
├── resources             # Images and animations
│   ├── animations
│   └── images
├── services              # API communication logic
├── supports              # Utilities, constants, helpers
├── App.tsx               # Entry point
├── app.json              # Expo config (includes icon + splash)
├── tsconfig.json         # TypeScript config
├── .env.development      # Environment variables for dev
├── .env.production       # Environment variables for prod
├── types                 # For navigation
└── README.md             # You’re here
```