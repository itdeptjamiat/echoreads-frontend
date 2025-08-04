# 📏 EchoReads Development Rules (Read by AI Tools like Cursor)

> This file acts as the **source of truth** for AI-assisted development. It defines strict rules for Cursor/Gemini to follow during code generation.

---

## ✅ Required Technologies

- React Native with **Expo**
- **expo-router** for navigation (file-based)
- **Redux Toolkit** for state management
- **Zod + React Hook Form** for forms and validation
- **Axios** configured instance with interceptors and auth handling
- **expo-secure-store** for storing JWTs and user prefs
- **expo-localization** for i18n and language support
- **Moti** or **Reanimated v3** for animations and transitions

---

## 🛠 Enforced Patterns

### 1. 📁 Project Structure Must Follow:

Do not place logic inside `/app`. Only screens go here.

---

### 2. 🎨 Theming System Must Use:

- `src/theme/ThemeContext.tsx`
- `src/hooks/useTheme.ts`
- Must support Light, Dark, and System modes
- Should be available globally via `_layout.tsx` and Context API

---

### 3. 🧾 Forms Must Use:

- **React Hook Form + Zod** - ONLY allowed form method
- **FormProvider** wrapper from `/src/form/FormProvider.tsx`
- **TextField** component from `/src/form/TextField.tsx`
- **Zod schema validation** for all form inputs
- **No inline forms** - always use FormProvider and TextField components
- **Theme integration** - all form components use useTheme() colors

---

### 4. 🗃️ Redux State Management Must Use:

- **Redux Toolkit** with `configureStore()`
- **redux-persist** with `AsyncStorage` for persistence
- **PersistGate** in `_layout.tsx` for rehydration
- Slice-based reducers in `/src/redux/slices/`
- Combine reducers: `auth`, `listing`, `bid`, `chat`, `orders`
- Only persist `auth` state (whitelist: ['auth'])
- Use `persistReducer()` wrapper for all root reducers

---

### 5. 📡 API & Network Layer Must Use:

- **EchoInstance** from `/src/axios/EchoInstance.ts` for ALL API calls (ONLY allowed Axios setup)
- **APIIns** configured instance with baseURL and auth headers
- **attachAuthToken()** for setting JWT tokens
- **401 interceptor** with retry protection and automatic token clearance
- **attachAuthTokenToAsyncStorage()** for token persistence
- **All slices/thunks** must import APIIns from EchoInstance.ts
- **Token boot** in `_layout.tsx` using `selectToken` + `attachAuthToken()`

---

### 6. 🔄 Async Actions & User Feedback Must Use:

- **createAsyncThunk** for all API calls (login, signup, data fetching)
- **try/catch blocks** with `rejectWithValue()` in ALL async thunks
- **Toast.show()** for user feedback on success/error (MANDATORY)
- **handleAsyncThunk()** DRY helper pattern in `/src/redux/utils/`
- **extraReducers** with pending/fulfilled/rejected states
- **loading** and **error** states in all slices
- **Console.log()** fallback until Toast library is integrated
- **NO API calls** directly in slice files (only in actions)
- **Always memoize** expensive selectors with `createSelector()`

---

### 7. 🎯 Redux Selectors Must Use:

- **createSelector()** from Redux Toolkit for memoization
- **Centralized selectors** in `/src/redux/selectors/`
- **Export all selectors** from `/src/redux/selectors/index.ts`
- **Import selectors** in components, never inline state access
- **Naming convention**: `select[StateName][Property]` (e.g., `selectAuthLoading`)
- **Computed selectors** for derived state (e.g., `selectIsAuthReady`)
- **Base selectors** for simple state access (e.g., `selectToken`)

---

### 8. ❌ Prohibited Patterns:

- ❌ No inline styling
- ❌ No `useState` for theme, language, or auth
- ❌ No screen logic outside `/app`
- ❌ No unapproved packages unless added to `RULES.md`

---

### 9. 🔄 Redux Module Creation Must Follow:

- **Template Pattern**: Use `MODULE_CREATION_TEMPLATE.md` as source of truth
- **File Creation**: `slices/[moduleName]Slice.ts`, `actions/[moduleName]Actions.ts`, `selectors/[moduleName]Selectors.ts`
- **Store Integration**: Update `store.ts` with new reducer in `combineReducers`
- **Selector Export**: Add exports to `/src/redux/selectors/index.ts`
- **Persistence Decision**: Add to whitelist ONLY if explicitly needed
- **Documentation Update**: Always update README.md store shape section
- **Naming Convention**: `select[ModuleName][Property]`, `fetch[ModuleName]Data` patterns

---

### 10. 📜 Documentation Enforcement:

- Every new screen, component, or feature must **update `/README.md`**
- Every new tech/package/method must **update `/RULES.md`**
- **Every Redux module** must update README.md store shape section
- **All Redux changes** must follow MODULE_CREATION_TEMPLATE.md

Cursor must keep this documentation in sync **automatically**.

---

📌 **Cursor Behavior Override:**
> From now on, Cursor must obey this `RULES.md` file. No unapproved tech should be used in suggestions or autogeneration.

---

## ⚠️ Cursor & AI Guidelines

- Always read and respect this file before generating or modifying code.
- Only use libraries explicitly listed in the **Required Technologies** section.
- Do not install or suggest new libraries without user confirmation and `RULES.md` update.
- Any new tool, library, or pattern must be added to this file **before use**.
- Always update `/README.md` and `/RULES.md` after completing any module, screen, or feature.

---

```yaml
ai_enforcement:
  mode: strict
  read_rules: true
  auto_update_docs: true
  disallowed_patterns:
    - inline_styles
    - useState_for_global_state
    - unapproved_libraries
    - business_logic_in_app_folder
    - direct_api_calls_without_async_thunk
    - missing_toast_feedback
    - inline_selectors_in_components
    - direct_state_access_without_selectors
    - direct_axios_usage_without_echo_instance
    - custom_http_clients
    - using_non_echo_instance_axios
    - redux_modules_without_template_pattern
    - skipping_store_integration
    - missing_selector_exports
    - undocumented_store_changes
    - api_calls_in_slice_files
    - async_thunks_without_error_handling
    - unmemoized_expensive_selectors
```

---

## 🤖 Cursor AI Training Complete - EchoReads Redux Patterns

### 🎯 Training Status: COMPLETE
Cursor AI has been successfully trained to follow EchoReads Redux module creation patterns.

### 📚 Training Files Created
#### 🤖 AI Training Documents
- ✅ `CURSOR_INSTRUCTIONS.md` - Primary AI instructions and protocols
- ✅ `CURSOR_TRAINING.md` - Detailed AI behavior patterns
- ✅ `MODULE_CREATION_TEMPLATE.md` - Code templates and examples

### 🔄 Module Creation Protocol
When user requests: **"Create [ModuleName] module"**

#### Cursor AI Will Automatically:
1. **Create Files** (using templates):
   - `src/redux/slices/[moduleName]Slice.ts`
   - `src/redux/actions/[moduleName]Actions.ts`
   - `src/redux/selectors/[moduleName]Selectors.ts`

2. **Integrate** (no confirmation needed):
   - Update `src/redux/store.ts` with new reducer
   - Update `src/redux/selectors/index.ts` exports
   - Update `README.md` store shape section

3. **Ask User Once**:
   - "Should [moduleName] state be persisted for offline use?"

### 🛡️ Quality Guarantees
Every module created will have:
- ✅ **TypeScript Types** - Full type safety
- ✅ **Error Handling** - MANDATORY try/catch + rejectWithValue
- ✅ **Memoized Selectors** - createSelector() performance
- ✅ **API Integration** - echoInstance usage, no direct axios
- ✅ **Toast Feedback** - MANDATORY user feedback on actions
- ✅ **Store Integration** - Properly added to combineReducers
- ✅ **Documentation** - README.md store shape updated
- ✅ **Clean Architecture** - NO API calls in slice files (actions only)

### 🚫 Prohibited Patterns (Enforced)
Cursor AI will NEVER:
- ❌ Create modules without following templates
- ❌ Skip store.ts integration
- ❌ Forget selector exports
- ❌ Miss documentation updates
- ❌ Use direct axios calls
- ❌ Create unmemoized selectors
- ❌ Skip error handling (try/catch + rejectWithValue)
- ❌ Put API calls in slice files (actions only)
- ❌ Skip Toast feedback in async actions

### 🎪 Example Module Creation
**User Input**: "Create a Wallet module"

**Cursor Response**:
```
Creating Wallet Redux module:

✅ Files Created:
- slices/walletSlice.ts (balance, transactions state)
- actions/walletActions.ts (fetchWalletData async thunk)
- selectors/walletSelectors.ts (memoized selectors)

✅ Integration:
- Updated store.ts with walletReducer
- Updated selectors/index.ts exports
- Updated README.md store shape

❓ Persistence: Should wallet state be persisted for offline balance cache?

✅ Ready: Components can now import from 'src/redux/selectors'
```

### 📋 Verification Checklist
For any new module, verify:
- [ ] Slice follows TypeScript interface pattern
- [ ] Actions use echoInstanse with error handling
- [ ] Selectors use createSelector for memoization
- [ ] Store.ts imports and includes new reducer
- [ ] Selectors/index.ts exports new selectors
- [ ] README.md store shape section updated
- [ ] Naming conventions followed
- [ ] No TypeScript errors

### 🔗 Reference Files
Always reference these for module creation:
- `MODULE_CREATION_TEMPLATE.md` - Code templates
- `/CURSOR_INSTRUCTIONS.md` - AI protocols
- `/RULES.md` - Development rules
- `/README.md` - Store shape documentation

---

**🎯 Training Result**: Cursor AI can now autonomously create consistent, high-quality Redux modules for EchoReads following established architectural patterns. 