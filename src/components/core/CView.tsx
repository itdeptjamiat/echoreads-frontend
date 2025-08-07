import React from 'react';
import { View, ViewStyle, TouchableOpacity, TouchableOpacityProps, StyleProp } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Radius, Shadow } from '../../constants/layout';

export interface CViewProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  
  // Responsive sizing
  width?: number | string;
  height?: number | string;
  widthPercent?: number; // 0-100, will use wp()
  heightPercent?: number; // 0-100, will use hp()
  minHeight?: number;
  
  // Theme-aware background
  bg?:
    | 'primary'
    | 'secondary'
    | 'card'
    | 'background'
    | 'surface'
    | 'transparent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'muted'
    | 'border'
    | string;
  
  // Spacing using layout constants
  p?: keyof typeof Spacing | number; // padding
  px?: keyof typeof Spacing | number; // paddingHorizontal  
  py?: keyof typeof Spacing | number; // paddingVertical
  pt?: keyof typeof Spacing | number; // paddingTop
  pb?: keyof typeof Spacing | number; // paddingBottom
  pl?: keyof typeof Spacing | number; // paddingLeft
  pr?: keyof typeof Spacing | number; // paddingRight
  
  m?: keyof typeof Spacing | number; // margin
  mx?: keyof typeof Spacing | number; // marginHorizontal
  my?: keyof typeof Spacing | number; // marginVertical
  mt?: keyof typeof Spacing | number; // marginTop
  mb?: keyof typeof Spacing | number; // marginBottom
  ml?: keyof typeof Spacing | number; // marginLeft
  mr?: keyof typeof Spacing | number; // marginRight
  
  // Layout
  flex?: number;
  center?: boolean; // Centers children
  row?: boolean; // Flex direction row
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  overflow?: ViewStyle['overflow'];
  pressable?: boolean;
  position?: ViewStyle['position'];
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  
  // Borders
  borderRadius?: keyof typeof Radius | number;
  borderWidth?: number;
  borderColor?: string;
  
  // Shadows & Elevation
  shadow?: keyof typeof Shadow;
  elevation?: number;
  
  // Style override
  style?: StyleProp<ViewStyle>;
}

export function CView({
  children,
  width,
  height,
  minHeight,
  widthPercent,
  heightPercent,
  bg,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  flex,
  center,
  row,
  justify,
  align,
  overflow,
  position,
  top,
  left,
  right,
  bottom,
  borderRadius,
  borderWidth,
  borderColor,
  shadow,
  elevation,
  pressable,
  onPress,
  style,
  ...rest
}: CViewProps) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    switch (bg) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'card':
        return colors.card;
      case 'background':
        return colors.background;
      case 'surface':
        return colors.muted;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'danger':
        return colors.danger;
      case 'muted':
        return colors.muted;
      case 'border':
        return colors.border;
      case 'transparent':
        return 'transparent';
      default:
        return bg; // allow custom colors
    }
  };

  const getSpacingValue = (value: keyof typeof Spacing | number | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return hp(value);
    return Spacing[value];
  };

  const getRadiusValue = (value: keyof typeof Radius | number | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return wp(value);
    return Radius[value];
  };

  const getShadowStyle = () => {
    if (!shadow) return {};
    if (typeof shadow === 'string' && shadow in Shadow) {
      return { ...Shadow[shadow as keyof typeof Shadow], shadowColor: colors.shadow };
    }
    return Shadow.md;
  };

  const getWidth = () => {
    if (widthPercent !== undefined) return wp(widthPercent);
    return width;
  };

  const getHeight = () => {
    if (heightPercent !== undefined) return hp(heightPercent);
    return height;
  };

  const shadowStyle = getShadowStyle();

  const dynamicStyles: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    width: getWidth() as any,
    height: getHeight() as any,
    minHeight,
    
    // Padding
    padding: getSpacingValue(p),
    paddingHorizontal: getSpacingValue(px),
    paddingVertical: getSpacingValue(py),
    paddingTop: getSpacingValue(pt),
    paddingBottom: getSpacingValue(pb),
    paddingLeft: getSpacingValue(pl),
    paddingRight: getSpacingValue(pr),
    
    // Margin
    margin: getSpacingValue(m),
    marginHorizontal: getSpacingValue(mx),
    marginVertical: getSpacingValue(my),
    marginTop: getSpacingValue(mt),
    marginBottom: getSpacingValue(mb),
    marginLeft: getSpacingValue(ml),
    marginRight: getSpacingValue(mr),
    
    // Layout
    flex: flex,
    justifyContent: center ? 'center' : justify,
    alignItems: center ? 'center' : align,
    flexDirection: row ? 'row' : 'column',
    overflow: overflow,
    position,
    top,
    left,
    right,
    bottom,
    
    // Borders
    borderRadius: getRadiusValue(borderRadius),
    borderWidth: borderWidth,
    borderColor: borderColor || colors.border,
    
    // Shadows
    ...shadowStyle,
    elevation: elevation !== undefined ? elevation : (shadow ? (shadowStyle as any).elevation || 0 : 0),
  };

  if (pressable || onPress) {
    return (
      <TouchableOpacity style={[dynamicStyles, style]} onPress={onPress} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[dynamicStyles, style]} {...rest}>
      {children}
    </View>
  );
}