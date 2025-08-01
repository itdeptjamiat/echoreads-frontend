import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';

export default function Page() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
      justifyContent: 'center',
    },
    input: {
      backgroundColor: colors.card,
      color: colors.text,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      marginVertical: 12,
    },
    passwordInput: {
      backgroundColor: colors.card,
      color: colors.text,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 14,
      borderRadius: 8,
    },
    buttonText: {
      color: colors.card,
    },
  });

  return (
    <View style={styles.container}>
      <H1 center b>Login</H1>

      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.border}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.border}
        secureTextEntry
        style={styles.passwordInput}
      />

      <TouchableOpacity style={styles.button}>
        <Body center b style={styles.buttonText}>Sign In</Body>
      </TouchableOpacity>
    </View>
  );
}