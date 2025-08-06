import React from 'react';
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing } from '../../constants/layout';

interface CScrollViewProps extends ScrollViewProps {
  children?: React.ReactNode;
  
  // Layout props
  flex?: number;
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
  
  // Background
  bg?: 'primary' | 'secondary' | 'card' | 'background' | 'surface' | 'transparent';
  
  // Style override
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export function CScrollView({
  children,
  flex,
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
  bg,
  style,
  contentContainerStyle,
  ...props
}: CScrollViewProps) {
  const { colors } = useTheme();

  const getSpacingValue = (value: keyof typeof Spacing | number | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return Spacing[value];
  };

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

  const dynamicStyle: ViewStyle = {
    flex: flex,
    backgroundColor: getBackgroundColor(),
    
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
  };

  const dynamicContentStyle: ViewStyle = {
    // Content container padding
    padding: getSpacingValue(p),
    paddingHorizontal: getSpacingValue(px),
    paddingVertical: getSpacingValue(py),
    paddingTop: getSpacingValue(pt),
    paddingBottom: getSpacingValue(pb),
    paddingLeft: getSpacingValue(pl),
    paddingRight: getSpacingValue(pr),
  };

  return (
    <ScrollView
      style={[dynamicStyle, style]}
      contentContainerStyle={[dynamicContentStyle, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
}