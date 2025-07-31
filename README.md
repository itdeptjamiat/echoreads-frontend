# 📚 EchoReads — Digital Magazine App

> A premium mobile reading experience built using **React Native + Expo + Expo Router**. 

## 🚀 Tech Stack

- React Native + Expo (TypeScript)
- Expo Router (file-based routing)
- Redux Toolkit
- Axios
- Zod + React Hook Form
- Theming with Context API
- Offline support (expo-file-system + SQLite)
- Secure storage (expo-secure-store)

## 📁 Folder Structure

See `/app` and `/src` directories.

## 🚀 Implementation Status

### ✅ Phase 1.1: Splash Screen & Animation
- **Implementation**: Moti animations in `app/_layout.tsx`
- **Fallback**: Native splash screen defined in `app.json`
- **Animation**: Lottie integration with `src/assets/animations/splash.json`
- **Features**:
  - 2-second animated splash with fade-in/scale effects
  - Dark theme background (`#202124`)
  - Smooth transition to main app
  - Platform-native fallback splash
  - Lottie animation support for premium feel

## 📦 Modules (WIP)

- [x] App Initialization ✅
- [x] Phase 1.1: Splash Screen & Animation ✅
- [ ] Auth
- [ ] Onboarding
- [ ] Home Feed
- [ ] Search
- [ ] Library
- [ ] Downloads
- [ ] Kids Mode
- [ ] Article/Magazine/Digest View
- [ ] Profile & Settings

> **Note:** This file will be **automatically updated by Cursor** as modules and phases are completed.

---

✅ Do not make changes to this file manually unless explicitly updating a phase or module.
✅ Cursor, treat this file as dynamic documentation. Update it automatically after each completed module or feature. 