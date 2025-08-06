import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/**
 * Global Layout Constants for EchoReads
 * All spacing, sizing, and typography should use these responsive values
 */

// Responsive Spacing System
export const Spacing = {
  xs: hp('0.5%'),   // ~4px on most devices
  sm: hp('1%'),     // ~8px on most devices  
  md: hp('2%'),     // ~16px on most devices
  lg: hp('3%'),     // ~24px on most devices
  xl: hp('4%'),     // ~32px on most devices
  xxl: hp('5%'),    // ~40px on most devices
} as const;

// Border Radius System  
export const Radius = {
  xs: wp('1%'),     // ~4px
  sm: wp('1.5%'),   // ~6px
  md: wp('3%'),     // ~12px
  lg: wp('5%'),     // ~20px
  xl: wp('7.5%'),   // ~30px
  full: 9999,       // Fully rounded
} as const;

// Responsive Typography Scale
export const FontSize = {
  caption: hp('1.4%'),    // ~11px
  bodySmall: hp('1.8%'),  // ~14px  
  body: hp('2%'),         // ~16px
  bodyLarge: hp('2.2%'),  // ~18px
  h3: hp('2.4%'),         // ~19px
  h2: hp('2.8%'),         // ~22px
  h1: hp('3.5%'),         // ~28px
  display: hp('4.2%'),    // ~34px
} as const;

// Responsive Icon Sizes
export const IconSize = {
  xs: wp('3%'),     // ~12px
  sm: wp('4%'),     // ~16px
  md: wp('5%'),     // ~20px
  lg: wp('6%'),     // ~24px
  xl: wp('8%'),     // ~32px
  xxl: wp('10%'),   // ~40px
} as const;

// Layout Dimensions
export const Layout = {
  // Button heights
  buttonHeight: {
    sm: hp('4.5%'),   // ~36px
    md: hp('5.5%'),   // ~44px
    lg: hp('6.5%'),   // ~52px
  },
  
  // Input heights
  inputHeight: {
    sm: hp('4%'),     // ~32px
    md: hp('5%'),     // ~40px
    lg: hp('6%'),     // ~48px
  },
  
  // Card dimensions
  card: {
    minHeight: hp('8%'),     // ~64px
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  
  // Header dimensions
  header: {
    height: hp('8%'),        // ~64px
    paddingHorizontal: Spacing.lg,
  },
  
  // Screen padding
  screen: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
} as const;

// Shadow/Elevation System
export const Shadow = {
  none: {
    elevation: 0,
    shadowOpacity: 0,
  },
  sm: {
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  md: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lg: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  xl: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
} as const;

// Animation Durations
export const Duration = {
  fast: 150,
  normal: 250,
  slow: 350,
} as const;