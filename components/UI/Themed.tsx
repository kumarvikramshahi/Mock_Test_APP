/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as CustomeText, View as CustomView } from 'react-native';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & CustomeText['props'];
export type ViewProps = ThemeProps & CustomView['props'];

export function DefaultView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({
    light: lightColor ? lightColor : Colors[colorScheme].background,
    dark: darkColor ? darkColor : Colors[colorScheme].background
  }, 'background');

  return <CustomView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function DefaultText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const color = useThemeColor({
    light: lightColor ? lightColor : Colors[colorScheme].text,
    dark: darkColor ? darkColor : Colors[colorScheme].text
  }, 'text');

  return <CustomeText style={[{ color }, style]} {...otherProps} />;
}
