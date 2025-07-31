# 📏 EchoReads Development Rules (Read by AI Tools like Cursor)

> This file acts as the **source of truth** for AI-assisted development. It defines strict rules for Cursor/Gemini to follow during code generation.

---

## ✅ Required Technologies

- React Native with **Expo**
- **expo-router** for navigation (file-based)
- **Redux Toolkit** for state management
- **Zod + React Hook Form** for forms and validation
- **Axios** for API calls with interceptors
- **expo-secure-store** for storing JWTs and user prefs
- **expo-localization** for i18n and language support
- **Moti** or **Reanimated v3** for animations and transitions
- **lottie-react-native** for Lottie animations
- **babel-plugin-module-resolver** for path aliases

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

- `react-hook-form`
- `zod` for schema validation
- Must use custom `FormProvider` wrapper (defined in `/form/`)

---

### 4. ❌ Prohibited Patterns:

- ❌ No inline styling
- ❌ No `useState` for theme, language, or auth
- ❌ No screen logic outside `/app`
- ❌ No unapproved packages unless added to `RULES.md`

---

### 5. 📜 Documentation Enforcement:

- Every new screen, component, or feature must **update `/README.md`**
- Every new tech/package/method must **update `/RULES.md`**

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
``` 