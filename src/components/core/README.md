# EchoReads Core Component System

## 🎯 Purpose

The Core Component System provides a unified, theme-aware, and fully responsive foundation for building consistent UIs in EchoReads. It replaces React Native's core components with enhanced versions that integrate our design system.

## 🧱 Core Components

### CView
Replaces React Native's `View` with theme and layout integration:

```tsx
import { CView } from '@/components/core';

// ✅ Good - Using layout constants & theme
<CView 
  p="lg"                // Spacing from layout constants
  bg="card"             // Theme-aware background
  borderRadius="md"     // Consistent border radius
  shadow="sm"           // Predefined shadow styles
  row                   // Flex direction shorthand
  justify="between"     // Space-between shorthand
  align="center"        // Align items center
/>

// ❌ Bad - Direct styles
<View style={{ 
  padding: 16,
  backgroundColor: '#fff',
  borderRadius: 8
}}/>
```

### CText
Enhanced typography with variants and theme integration:

```tsx
import { CText } from '@/components/core';

// ✅ Good - Using typography system
<CText
  variant="h1"          // Predefined text styles
  color="primary"       // Theme-aware color
  bold                  // Typography weight
  center               // Text alignment
  mb="md"              // Margin from layout
>
  Welcome to EchoReads
</CText>

// ❌ Bad - Manual text styling
<Text style={{
  fontSize: 24,
  fontWeight: 'bold',
  color: '#000'
}}>
  Welcome to EchoReads
</Text>
```

### CButton
Unified button component with variants and states:

```tsx
import { CButton } from '@/components/core';

// ✅ Good - Using button system
<CButton
  title="Continue"
  variant="gradient"    // primary, secondary, ghost, gradient
  size="large"         // sm, md, lg
  fullWidth           // Takes full width
  loading={isLoading} // Shows loading spinner
  leftIcon={<CIcon name="arrow-forward" />}
  onPress={handlePress}
/>

// ❌ Bad - Custom button implementation
<TouchableOpacity
  style={{
    padding: 16,
    backgroundColor: '#000'
  }}
>
  <Text style={{ color: '#fff' }}>Continue</Text>
</TouchableOpacity>
```

### CIcon
Theme-aware icon component:

```tsx
import { CIcon } from '@/components/core';

// ✅ Good - Using icon system
<CIcon
  name="settings"      // Ionicons name
  size={6}            // From layout scale
  color="primary"     // Theme color
  onPress={onPress}   // Optional press handler
  pressable          // Makes icon pressable
/>

// ❌ Bad - Direct icon usage
<Ionicons
  name="settings"
  size={24}
  color="#000"
/>
```

### CInput
Form input with validation and icons:

```tsx
import { CInput } from '@/components/core';

// ✅ Good - Using input system
<CInput
  label="Email"
  placeholder="Enter email"
  leftIcon={<CIcon name="mail" />}
  error={errors.email}
  required
  onChangeText={handleChange}
/>

// ❌ Bad - Custom input styling
<TextInput
  style={{
    borderWidth: 1,
    padding: 16
  }}
  placeholder="Email"
/>
```

## 📐 Layout Constants

Import layout constants for consistent spacing and sizing:

```tsx
import { Spacing, Radius, FontSize } from '@/constants/layout';

// Spacing scale
Spacing.xs  // 4px
Spacing.sm  // 8px
Spacing.md  // 16px
Spacing.lg  // 24px
Spacing.xl  // 32px

// Border radius
Radius.sm   // 6px
Radius.md   // 12px
Radius.lg   // 20px
Radius.xl   // 30px

// Font sizes
FontSize.caption    // ~12px
FontSize.body      // ~16px
FontSize.h3        // ~18px
FontSize.h2        // ~22px
FontSize.h1        // ~28px
```

## 🎨 Theme Integration

All components automatically integrate with the theme system:

```tsx
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { colors, mode } = useTheme();
  
  return (
    <CView 
      bg={mode === 'dark' ? 'surface' : 'background'}
      p="lg"
    >
      <CText color="primary">
        Theme-aware text
      </CText>
    </CView>
  );
}
```

## 📱 Screen Template

Use this template for new screens:

```tsx
import { ScrollView, StyleSheet } from 'react-native';
import { CView, CText, CButton } from '@/components/core';
import { Spacing, Radius } from '@/constants/layout';
import { ScreenWrapper } from '@/components/ScreenWrapper';

export default function MyScreen() {
  return (
    <ScreenWrapper safeArea={true}>
      <ScrollView>
        <CView p="lg">
          <CText variant="h1" bold mb="md">
            Screen Title
          </CText>
          
          {/* Screen content */}
          <CView 
            bg="card" 
            p="lg" 
            borderRadius="md"
            shadow="sm"
          >
            <CText variant="body">
              Content goes here
            </CText>
          </CView>
          
          {/* Actions */}
          <CButton
            title="Continue"
            variant="gradient"
            fullWidth
            mt="lg"
          />
        </CView>
      </ScrollView>
    </ScreenWrapper>
  );
}
```

## 🚫 Prohibited Patterns

1. Direct React Native component imports:
```tsx
// ❌ NEVER do this
import { View, Text, TouchableOpacity } from 'react-native';
```

2. Hardcoded colors:
```tsx
// ❌ NEVER do this
<CView style={{ backgroundColor: '#EAFA02' }} />
```

3. Magic numbers for spacing:
```tsx
// ❌ NEVER do this
<CView style={{ padding: 16, margin: 24 }} />
```

4. Direct font sizes:
```tsx
// ❌ NEVER do this
<CText style={{ fontSize: 24 }} />
```

## 🔄 Migration Guide

When converting existing screens:

1. Replace imports:
```tsx
// ❌ Remove
import { View, Text, TouchableOpacity } from 'react-native';
import { H1, Body } from '@/theme/Typo';

// ✅ Add
import { CView, CText, CButton } from '@/components/core';
import { Spacing, Radius } from '@/constants/layout';
```

2. Replace components:
```tsx
// ❌ Before
<View style={{ padding: 16 }}>
  <H1>Title</H1>
  <TouchableOpacity onPress={handlePress}>
    <Text>Click me</Text>
  </TouchableOpacity>
</View>

// ✅ After
<CView p="md">
  <CText variant="h1" bold>Title</CText>
  <CButton 
    title="Click me"
    onPress={handlePress}
  />
</CView>
```

3. Use layout constants:
```tsx
// ❌ Before
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 8,
  }
});

// ✅ After
<CView 
  p="md"
  mb="lg"
  borderRadius="sm"
/>
```

4. Use theme colors:
```tsx
// ❌ Before
style={{ backgroundColor: colors.card }}

// ✅ After
bg="card"
```