import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface TypoProps extends TextProps {
  children: React.ReactNode;
  center?: boolean;
  b?: boolean;
  style?: TextStyle;
}

const make = (size: number) => ({
  children,
  center = false,
  b = false,
  style,
  ...props
}: TypoProps) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          fontSize: size,
          color: colors.text,
          fontWeight: b ? 'bold' : 'normal',
          textAlign: center ? 'center' : 'left',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const H1 = make(28);
export const H2 = make(22);
export const Body = make(16);
export const Caption = make(12);