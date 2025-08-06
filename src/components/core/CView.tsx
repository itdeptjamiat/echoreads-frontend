import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Radius, Shadow } from '../../constants/layout';

interface CViewProps extends ViewProps {
  children?: React.ReactNode;
  
  // Responsive sizing
  width?: number | string;
  height?: number | string;
  widthPercent?: number; // 0-100, will use wp()
  heightPercent?: number; // 0-100, will use hp()
  
  // Theme-aware background
  bg?: 'primary' | 'secondary' | 'card' | 'background' | 'surface' | 'transparent';
  
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
  
  // Borders
  borderRadius?: keyof typeof Radius | number;
  borderWidth?: number;
  borderColor?: string;
  
  // Shadows & Elevation
  shadow?: keyof typeof Shadow;
  elevation?: number;
  
  // Style override
  style?: ViewStyle;
}

export function CView({
  children,
  width,
  height,
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
  borderRadius,
  borderWidth,
  borderColor,
  shadow,
  elevation,
  style,
  ...props
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
      case 'transparent':
        return 'transparent';
      default:
        return undefined;
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

  const dynamicStyles: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    width: getWidth(),
    height: getHeight(),
    
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
    
    // Borders
    borderRadius: getRadiusValue(borderRadius),
    borderWidth: borderWidth,
    borderColor: borderColor || colors.border,
    
    // Shadows
    ...getShadowStyle(),
    elevation: elevation !== undefined ? elevation : (shadow ? getShadowStyle().elevation : 0),
  };

  return (
    <View style={[dynamicStyles, style]} {...props}>
      {children}
    </View>
  );
}