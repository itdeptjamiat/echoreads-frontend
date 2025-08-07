export const lightColors = {
  background: '#f8fafc',
  foreground: '#0f172a',
  text: '#0f172a',
  textSecondary: '#64748b',
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#8b5cf6',
  destructive: '#ef4444',
  danger: '#ef4444',
  muted: '#f1f5f9',
  border: '#e2e8f0',
  card: '#ffffff',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#06b6d4',
  shadow: 'rgba(0, 0, 0, 0.1)',
  gradientPrimary: ['#3b82f6', '#1d4ed8'] as const,
  gradientSecondary: ['#8b5cf6', '#7c3aed'] as const,
  gradientAccent: ['#06b6d4', '#0891b2'] as const,
};

export const darkColors = {
  background: '#0f172a',
  foreground: '#f8fafc',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#8b5cf6',
  destructive: '#ef4444',
  danger: '#ef4444',
  muted: '#1e293b',
  border: '#334155',
  card: '#1e293b',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#06b6d4',
  shadow: 'rgba(0, 0, 0, 0.3)',
  gradientPrimary: ['#3b82f6', '#1d4ed8'] as const,
  gradientSecondary: ['#8b5cf6', '#7c3aed'] as const,
  gradientAccent: ['#06b6d4', '#0891b2'] as const,
};

// Legacy support for existing components
export const lightTheme = lightColors;
export const darkTheme = darkColors;