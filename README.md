# 📚 EchoReads — Digital Magazine App

> A premium mobile reading experience built using **React Native + Expo + Expo Router**. 

## 🚀 Tech Stack

- React Native + Expo (TypeScript)
- Expo Router (file-based routing)
- Redux Toolkit + Redux Persist
- createAsyncThunk for API calls
- Axios with interceptors & auth handling
- Zod + React Hook Form
- Theming with Context API
- Toast notifications for user feedback
- Offline support (expo-file-system + SQLite)
- Secure storage (expo-secure-store)

## 🔄 State Management

**Powered by Redux Toolkit**
- **Async actions** with `createAsyncThunk`
- **Auto-persisted** via `redux-persist` (AsyncStorage)
- **Selectors** via `/src/redux/selectors/`
- **Memoized performance** with `createSelector()`

## 📁 Folder Structure

See `/app` and `/src` directories.

## 🏗️ Architecture

### Global State Selectors

- **Memoized Selectors**: All state access uses `createSelector()` for performance
- **Centralized Location**: `/src/redux/selectors/` with index.ts barrel export
- **Component Usage**: Import selectors, never inline `state.auth.loading`
- **Naming Convention**: `select[State][Property]` (e.g., `selectAuthLoading`)
- **Computed State**: Derived selectors like `selectIsAuthReady` for complex logic

### 📦 Axios Layer

**API instance lives in `/src/axios/EchoInstance.ts`**
- **JWT Auth Headers**: Automatic token attachment via `attachAuthToken()`
- **401 Invalidation**: Global interceptor handles token clearance and retry protection
- **AsyncStorage Integration**: `attachAuthTokenToAsyncStorage()` for persistence
- **Base Configuration**: Centralized `APIIns` with configured baseURL
- **Clean Architecture**: Single source of truth for all HTTP requests

### 🧾 Form System

**Global form system using React Hook Form + Zod**
- **FormProvider**: Reusable wrapper component with schema validation
- **TextField**: Theme-aware input component with error display
- **Zod Validation**: Type-safe schema validation for all forms
- **Theme Integration**: All form components use useTheme() colors
- **No Inline Forms**: Always use FormProvider and TextField components

### 🔐 Authentication Actions

**Redux async thunks for complete auth flow**
- **loginUser**: Login with email/password, attaches JWT to Axios headers
- **signupUser**: User registration with email/username/password/name
- **forgotPassword**: Request password reset email
- **confirmEmail**: Verify email with OTP code
- **resetPassword**: Set new password after OTP verification
- **getUserData**: Fetch user profile data
- **State Persistence**: Auth state persisted via redux-persist (AsyncStorage)
- **Error Handling**: Consistent error messages with rejectWithValue

### Token Boot Flow

- **App Startup**: `_layout.tsx` reads token from Redux with `selectToken`
- **Auto-Attachment**: `attachAuthToken()` called in useEffect on mount
- **Provider Hierarchy**: Provider → PersistGate → AppContent → ThemeProvider → Stack
- **Never Unhandled**: Token initialization happens before any screens load

### Redux Store Shape

Current state structure with persistence configuration:

```typescript
RootState = {
  auth: AuthState,           // ✅ Persisted (auth data, profile updates, user data)
  orders: OrdersState,       // Order management
  
  // Future modules will be added here following MODULE_CREATION_TEMPLATE.md:
  // wallet: WalletState,      // ✅ Persisted (if needed)
  // search: SearchState,      // Search history and filters
  // notifications: NotificationState, // Push notifications
}

// AuthState Structure:
interface AuthState {
  data: AuthData | null;           // Main auth data (token, user)
  isLoading: boolean;              // Global loading state
  error: string | null;            // Global error state
  profileUpdate: ProfileUpdateData; // Profile update operations
  userData: UserData;              // User data operations
}
```

**Persistence Whitelist**: Only `auth` currently persisted. New modules added only if explicitly needed for offline functionality.

## 📦 Modules (WIP)

- [x] App Initialization
- [x] Auth Slice Setup (Redux + AsyncThunks + Persistence)
- [x] Global State Selectors (Memoized + Centralized)
- [x] Axios Layer Setup (EchoInstance + 401 Handling + Auth Flow)
- [x] Token Boot Flow (Auto-attach on app startup)
- [x] Redux Module Templates (Cursor AI Training Complete)
- [x] State Management Documentation (Redux Toolkit + Best Practices)
- [x] Auth UI Components (Login Screen)
- [x] ✅ Phase: Login (Zod Validation + React Hook Form + User Info Display)
- [x] ✅ Form System (React Hook Form + Zod + Reusable Components)
- [x] ✅ Auth Actions (Redux Async Thunks with Redux Persist)
- [x] ✅ Onboarding (Intro Carousel + Plan Selection + Checkout + Confirmation)
- [ ] Home Feed
- [ ] Search
- [ ] Library
- [ ] Downloads
- [ ] Kids Mode
- [ ] Article/Magazine/Digest View
- [ ] Profile & Settings

## 📁 /app/(auth) Screens

### Authentication Flow Screens
- **`login.tsx`**: Sign in form using Zod + React Hook Form validation
- **`signup.tsx`**: Register new user with email/password/confirmPassword
- **`verifyEmail.tsx`**: OTP verification for email confirmation
- **`forgotPassword.tsx`**: Start password reset flow
- **`resetPassword.tsx`**: Set new password after OTP verification

### Features
- **Modern UI**: Theme-aware design with consistent spacing
- **Form Validation**: Zod schemas with React Hook Form integration
- **Accessibility**: Screen reader support with proper labels
- **Error Handling**: Redux state management with user feedback
- **Loading States**: Disabled buttons and loading indicators

## 📱 /app/(onboarding) Screens

### Onboarding Flow Screens
- **`intro.tsx`**: Walkthrough carousel with title, subtitle, next/skip buttons
- **`choosePlan.tsx`**: Selectable cards for Free, Echo Plus, Echo Pro plans
- **`checkout.tsx`**: WebView for Stripe checkout URL integration
- **`confirmation.tsx`**: Confirmation screen after successful payment

### Features
- **Interactive Carousel**: Smooth slide transitions with pagination dots
- **Plan Selection**: Visual plan cards with feature comparisons
- **Secure Checkout**: WebView integration with Stripe payment processing
- **Success Flow**: Confirmation screen with plan details and next steps
- **Theme Integration**: Consistent theming with useTheme() and Typo components
- **Accessibility**: Screen reader support with proper labels and navigation
- **Navigation Flow**: Seamless transitions between onboarding steps

### Technical Implementation
- **FlatList Carousel**: Horizontal scrolling with paging for intro slides
- **TouchableOpacity Cards**: Interactive plan selection with visual feedback
- **WebView Integration**: Secure payment processing with message handling
- **State Management**: Local state for plan selection and loading states
- **Error Handling**: Alert dialogs for checkout cancellation
- **Responsive Design**: Adaptive layouts for different screen sizes

## 🧠 Redux Store

### Auth Slice (`authSlice.ts`)
Complete authentication state management with async thunks:

#### Actions
- **`loginUser`**: Authenticate user with email/password
- **`signupUser`**: Register new user account
- **`confirmEmail`**: Verify email with OTP code
- **`forgotPassword`**: Request password reset email
- **`resetPassword`**: Set new password after verification
- **`updatePassword`**: Update user password
- **`logout`**: Clear auth state and navigate to auth
- **`clearError`**: Clear error state

#### State Structure
```typescript
interface AuthState {
  data: AuthData | null;           // Main auth data (token, user)
  isLoading: boolean;              // Global loading state
  error: string | null;            // Global error state
  profileUpdate: ProfileUpdateData; // Profile update operations
  userData: UserData;              // User data operations
}
```

## 🔍 Selectors

### Memoized Auth Selectors
All selectors use `createSelector` for performance optimization:

- **`selectToken`**: Get authentication token from state
- **`selectUserData`**: Get user data from userData operations
- **`selectAuthLoading`**: Get global loading state
- **`selectAuthError`**: Get global error state
- **`selectUserId`**: Get user ID from auth data
- **`selectUserEmail`**: Get user email from auth data
- **`selectIsAuthenticated`**: Boolean indicating if user is authenticated

### Usage
```typescript
import { useSelector } from 'react-redux';
import { 
  selectToken, 
  selectUserData, 
  selectAuthLoading, 
  selectAuthError 
} from '../redux/slices/selectState';

const token = useSelector(selectToken);
const isLoading = useSelector(selectAuthLoading);
```

## ✅ Zod Validation Schemas

### Form Validation Schemas
Type-safe validation using Zod for all authentication forms:

- **`loginSchema`**: Email and password validation
- **`signupSchema`**: Email, password, and confirmPassword with matching validation
- **`otpSchema`**: OTP code validation (6 digits)
- **`forgotPasswordSchema`**: Email validation for password reset
- **`resetPasswordSchema`**: New password and confirmPassword with matching validation

### Features
- **Type Safety**: Full TypeScript integration
- **Error Messages**: User-friendly validation messages
- **Password Matching**: Automatic password confirmation validation
- **Email Validation**: Proper email format validation
- **Required Fields**: Clear indication of required inputs

### Usage
```typescript
import { loginSchema, signupSchema } from '../form/schemas/authSchema';

// In FormProvider
<FormProvider
  schema={loginSchema}
  defaultValues={{ email: '', password: '' }}
  onSubmit={handleSubmit}
>
```

## 🤖 Cursor AI Training & Instructions

### 🎯 Primary Directive
When developing EchoReads features, **ALWAYS** follow these patterns and **AUTOMATICALLY** update documentation.

### 🔄 New Module Creation Protocol
When user requests: "Create [ModuleName] module" or "Add [feature] to Redux"

#### Immediate Actions (No Confirmation Needed):
1. **Read**: `MODULE_CREATION_TEMPLATE.md` (see below)
2. **Execute**: Create slice, actions, selectors files
3. **Integrate**: Update store.ts and selectors/index.ts
4. **Document**: Update README.md store shape

#### Ask User Once:
- "Should [moduleName] state be persisted for offline use?"

#### Never Skip:
- Store integration (app will break)
- Selector exports (components can't import)
- README.md store shape update (required by RULES.md)

### 📋 File Creation Order (STRICT)
```bash
1. src/redux/slices/[moduleName]Slice.ts      # State + reducers
2. src/redux/actions/[moduleName]Actions.ts   # Async thunks
3. src/redux/selectors/[moduleName]Selectors.ts # Memoized selectors
4. UPDATE: src/redux/store.ts                  # Add to combineReducers
5. UPDATE: src/redux/selectors/index.ts       # Export selectors
6. UPDATE: README.md                           # Store shape section
```

### 🎪 Response Template
When creating a module, respond with:
```
Creating [ModuleName] Redux module:

✅ Files Created:
- slices/[moduleName]Slice.ts (state + reducers)
- actions/[moduleName]Actions.ts (async thunks with echoInstance)
- selectors/[moduleName]Selectors.ts (memoized selectors)

✅ Integration:
- Updated store.ts with [moduleName]Reducer
- Updated selectors/index.ts exports
- Updated README.md store shape

❓ Persistence: Should [moduleName] state be persisted for offline use?

✅ Ready: Components can now import selectors from 'src/redux/selectors'
```

### 🚨 Error Prevention
#### Before Creating Any Redux Module:
- ✅ Check if MODULE_CREATION_TEMPLATE.md exists
- ✅ Verify store.ts has proper structure
- ✅ Confirm APIIns import path is correct (from EchoInstance.ts)

#### After Creating Module:
- ✅ Verify no TypeScript errors
- ✅ Check store.ts imports new reducer
- ✅ Confirm selectors/index.ts exports new selectors
- ✅ Validate README.md store shape updated

### 🎯 Quality Standards
Every Redux module must have:
- **Proper TypeScript**: Full type safety
- **Error Handling**: try/catch + rejectWithValue
- **Memoization**: createSelector for all selectors
- **API Integration**: Use APIIns from EchoInstance, never direct axios
- **Toast Feedback**: Success/error messages
- **Documentation**: README.md store shape updated

### 🚫 Never Do:
- Create Redux modules without templates
- Skip store.ts integration
- Forget selector exports  
- Miss documentation updates
- Use direct axios calls
- Skip error handling
- Create unmemoized selectors

## 📋 Redux Module Creation Template

### Required Steps for New Modules
When creating a new module (e.g., Wallet, Search, Notifications), **ALWAYS** follow this exact pattern:

#### 1. ✅ Create Slice (`src/redux/slices/[moduleName]Slice.ts`)
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { [moduleName]Actions } from '../actions/[moduleName]Actions';

interface [ModuleName]State {
  data: any[];
  loading: boolean;
  error: string | null;
  // Add module-specific state properties
}

const initialState: [ModuleName]State = {
  data: [],
  loading: false,
  error: null,
};

const [moduleName]Slice = createSlice({
  name: '[moduleName]',
  initialState,
  reducers: {
    // Synchronous reducers
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add async thunk handlers here
    // builder.addCase([moduleName]Actions.fetchData.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
  },
});

export const { clearError, setLoading } = [moduleName]Slice.actions;
export default [moduleName]Slice.reducer;
```

#### 2. ✅ Create Actions (`src/redux/actions/[moduleName]Actions.ts`)
```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import APIIns from '../../axios/EchoInstance';

// Fetch data async thunk
export const fetch[ModuleName]Data = createAsyncThunk(
  '[moduleName]/fetchData',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await APIIns.get('/[moduleName]', { params });
      
      // ✅ REQUIRED: Toast feedback on success
      // Toast.show('Data loaded successfully!', Toast.LONG);
      console.log('Success: [ModuleName] data loaded');
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || '[ModuleName] fetch failed';
      
      // ✅ REQUIRED: Toast feedback on error
      // Toast.show(message, Toast.LONG);
      console.error('Error:', message);
      
      // ✅ REQUIRED: rejectWithValue for proper error handling
      return rejectWithValue(message);
    }
  }
);

// Add more async thunks as needed for the module
```

#### 3. ✅ Create Selectors (`src/redux/selectors/[moduleName]Selectors.ts`)
```typescript
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selector
const select[ModuleName]State = (state: RootState) => state.[moduleName];

// Simple selectors
export const select[ModuleName]Data = createSelector(
  [select[ModuleName]State],
  ([moduleName]) => [moduleName].data
);

export const select[ModuleName]Loading = createSelector(
  [select[ModuleName]State],
  ([moduleName]) => [moduleName].loading
);

export const select[ModuleName]Error = createSelector(
  [select[ModuleName]State],
  ([moduleName]) => [moduleName].error
);

// Computed selectors
export const selectHas[ModuleName]Data = createSelector(
  [select[ModuleName]Data],
  (data) => data.length > 0
);

export const select[ModuleName]Status = createSelector(
  [select[ModuleName]Loading, select[ModuleName]Error],
  (loading, error) => {
    if (loading) return 'loading';
    if (error) return 'error';
    return 'success';
  }
);
```

#### 4. ✅ Update Store (`src/redux/store.ts`)
```typescript
// Add import
import [moduleName]Reducer from './slices/[moduleName]Slice';

// Update rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  [moduleName]: [moduleName]Reducer, // ADD THIS LINE
});

// Update persistConfig if persistence needed
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', '[moduleName]'], // ADD MODULE IF PERSISTENCE NEEDED
};
```

#### 5. ✅ Update Selector Index (`src/redux/selectors/index.ts`)
```typescript
// Add export
export * from './[moduleName]Selectors';
```

#### 6. ✅ Update Documentation
##### README.md - Add to Store Shape section:
```markdown
### Redux Store Shape
- **auth**: Authentication state (persisted)
- **listing**: Magazines and articles
- **[moduleName]**: [Module description] (persisted if needed)
```

### 🚫 Common Mistakes to Avoid
- ❌ Don't forget to add slice to store.ts
- ❌ Don't forget to export selectors from index.ts
- ❌ Don't skip documentation updates
- ❌ Don't persist state unless necessary
- ❌ Don't use direct API calls (always use APIIns from EchoInstance)
- ❌ Don't skip Toast feedback in actions
- ❌ Don't put API calls in slice files (only in actions)
- ❌ Don't skip try/catch blocks in async thunks
- ❌ Don't forget rejectWithValue() for error handling
- ❌ Don't create unmemoized expensive selectors

### ✅ Verification Checklist
- [ ] Slice created with proper TypeScript types
- [ ] Actions use createAsyncThunk with echoInstance
- [ ] Selectors use createSelector for memoization
- [ ] Store.ts updated with new reducer
- [ ] Selectors exported from index.ts
- [ ] Persistence added to whitelist if needed
- [ ] README.md updated with store shape
- [ ] RULES.md updated if new patterns introduced
- [ ] All files follow naming conventions
- [ ] Error handling and Toast feedback included

## 🔄 Migration to EchoInstance.ts

### Overview
EchoReads has standardized on `/src/axios/EchoInstance.ts` as the **ONLY** allowed Axios configuration.

### Migration Steps

#### 1. Update Imports
**✅ New (Required):**
```typescript
import APIIns from '../axios/EchoInstance';
import { attachAuthToken } from '../axios/EchoInstance';
```

#### 2. Update API Calls
**✅ New:**
```typescript
const response = await APIIns.get('/users');
const data = await APIIns.post('/auth/login', credentials);
```

#### 3. Update Auth Token Management
**✅ New:**
```typescript
import { attachAuthToken, attachAuthTokenToAsyncStorage } from '../axios/EchoInstance';

// Token clearing is now handled automatically by 401 interceptor
```

### Key Differences
#### EchoInstance.ts Benefits:
- ✅ **Simpler API** - Focused on core functionality
- ✅ **401 Handling** - Automatic token clearance with retry protection
- ✅ **Cleaner Code** - Less complexity, more maintainable
- ✅ **Single Source** - One place for all HTTP configuration

### Action Required
All existing code should be migrated to use `EchoInstance.ts`. The `apiClient.ts` file is now **deprecated** and will be removed from code.

### Enforcement
Per RULES.md Section 5, only `EchoInstance.ts` is allowed for HTTP requests. Any direct axios usage or custom HTTP clients are prohibited.

## 📦 Required Installation

### Missing Dependency
The new `EchoInstance.ts` requires `axios` which is not currently installed.

### Installation Command
Please run this command to install the required dependency:

```bash
npm install axios
```

OR

```bash
yarn add axios
```

### After Installation
Once axios is installed, the TypeScript errors in `src/axios/EchoInstance.ts` will be resolved and the API layer will be ready to use.

### Package.json Update
This will add to your dependencies:
```json
{
  "dependencies": {
    "axios": "^1.x.x"
  }
}
```

---

> **Note:** This file will be **automatically updated by Cursor** as modules and phases are completed.

✅ Do not make changes to this file manually unless explicitly updating a phase or module.
✅ Cursor, treat this file as dynamic documentation. Update it automatically after each completed module or feature.

---

## From /src/redux/README.md

# Redux State Management

## 📁 Directory Structure

```
src/redux/
├── store.ts                 # Main store configuration with persistence
├── actions/                 # Async thunks for API calls
│   └── authActions.ts
├── slices/                  # State + reducers
│   ├── authSlice.ts
│   └── ordersSlice.ts
├── selectors/               # Memoized state selectors
│   ├── index.ts            # Barrel exports
│   ├── authSelectors.ts
│   └── README.md
├── utils/                   # Helper functions
│   └── asyncThunkHelper.ts
│
├── MODULE_CREATION_TEMPLATE.md  # 🤖 Code templates for new modules
├── CURSOR_TRAINING.md          # 🤖 AI training instructions
└── README.md                   # This file
```

## 🚀 Quick Start

### Using Selectors in Components
```tsx
import { useSelector } from 'react-redux';
import { selectAuthLoading, selectUserName } from '../redux/selectors';

const MyComponent = () => {
  const isLoading = useSelector(selectAuthLoading);
  const userName = useSelector(selectUserName);
  
  return <Text>{userName}</Text>;
};
```

### Dispatching Actions
```tsx
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';

const dispatch = useDispatch();
dispatch(loginUser({ email, password }));
```

### Making API Calls
```tsx
import APIIns from '../axios/EchoInstance';

// In async thunks only
const response = await APIIns.get('/users');
const data = await APIIns.post('/auth/login', credentials);
```

## 🔄 Creating New Modules

**For Cursor AI**: Follow `MODULE_CREATION_TEMPLATE.md` exactly.

**For Humans**: Run through this checklist:
1. ✅ Create `slices/[moduleName]Slice.ts`
2. ✅ Create `actions/[moduleName]Actions.ts`
3. ✅ Create `selectors/[moduleName]Selectors.ts`
4. ✅ Update `store.ts` with new reducer
5. ✅ Update `selectors/index.ts` exports
6. ✅ Update `README.md` store shape
7. ✅ Add to persistence whitelist if needed

## 📊 Current Store State

```typescript
RootState = {
  auth: {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isEmailVerified: boolean;
  },
  listing: {
    magazines: Magazine[];
    articles: Article[];
    loading: boolean;
  },
  // Future modules: wallet, search, notifications, etc.
}
```

## 🔧 Persistence Configuration

- **Persisted**: `auth` (for login persistence)
- **Non-Persisted**: All other slices (performance optimization)
- **Storage**: AsyncStorage via redux-persist

## 🎯 Best Practices

### ✅ Do:
- Use `createSelector()` for all selectors
- Import selectors from `'../redux/selectors'`
- Use `APIIns` from EchoInstance.ts in all async thunks
- Include error handling and Toast feedback
- Follow naming conventions: `select[Module][Property]`

### ❌ Don't:
- Use inline selectors: `state => state.auth.loading`
- Call API directly without async thunks
- Use any Axios instance except APIIns from EchoInstance.ts
- Skip store integration when creating modules
- Forget to export selectors from index.ts
- Persist state unless needed for offline functionality

---

## From /src/axios/README.md

# Axios API Client

## Usage Examples

### ✅ Correct - Use configured EchoInstance:

```tsx
import APIIns from '../axios/EchoInstance';

// In async thunks
const response = await APIIns.post('/auth/login', credentials);
const users = await APIIns.get('/users');
const updated = await APIIns.put('/profile', userData);
```

### ❌ Prohibited - Direct axios usage:

```tsx
// DON'T DO THIS
import axios from 'axios';
const response = await axios.post('https://api.com/login', data);
```

## Key Features

### 🔐 Automatic Authentication
- Tokens auto-attached to requests via `Authorization: Bearer <token>`
- `attachAuthToken(token)` for manual token setting
- `attachAuthTokenToAsyncStorage()` loads token from storage

### 🚫 401 Error Handling
- Automatically clears AsyncStorage on 401 responses
- Retry protection via `_retry` flag
- Removes auth token from future requests

### 🌍 Environment Configuration
- **Production**: `https://api.echoreads.com`
- Configurable via `API_BASE_URL`

### 📝 Request/Response Logging
- Console logs for debugging API calls
- Error logging with status codes

---

## From /src/redux/selectors/README.md

# Redux Selectors

## Usage Examples

### ✅ Correct - Import selectors in components:

```tsx
import { useSelector } from 'react-redux';
import { 
  selectAuthLoading, 
  selectIsAuthenticated, 
  selectUserName 
} from '../redux/selectors';

const MyComponent = () => {
  const isLoading = useSelector(selectAuthLoading);
  const isAuth = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUserName);
  
  return <Text>{userName}</Text>;
};
```

### ❌ Prohibited - Inline selectors:

```tsx
// DON'T DO THIS
const isLoading = useSelector(state => state.auth.loading);
const user = useSelector(state => state.auth.user);
```

## Available Auth Selectors

- `selectToken` - JWT token
- `selectUserId` - Current user ID
- `selectUser` - Full user object
- `selectAuthLoading` - Loading state
- `selectAuthError` - Error message
- `selectIsAuthenticated` - Boolean auth status
- `selectIsEmailVerified` - Email verification status
- `selectUserEmail` - User's email
- `selectUserName` - User's display name
- `selectHasAuthToken` - Boolean token check
- `selectIsAuthReady` - Computed ready state
- `selectAuthStatus` - Combined auth status
- `selectHasAuthError` - Boolean error check
- `selectAuthErrorMessage` - Error message with fallback

---

> _All markdown documentation is centralized at project root for easier maintenance._ 