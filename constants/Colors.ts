/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryGreen = '#6fdcbf';
const darkGreen = '#13b77c';
const textColor = '#11181C';
const background = '#fff';
const iconGray = '#687076';
const stepInactive = '#ececec';

export const Colors = {
  light: {
    text: textColor,
    background: background,
    tint: primaryGreen,
    icon: iconGray,
    tabIconDefault: iconGray,
    tabIconSelected: darkGreen,
    button: darkGreen,
    stepActive: darkGreen,
    stepInactive: stepInactive,
    header: primaryGreen,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: primaryGreen,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryGreen,
    button: darkGreen,
    stepActive: darkGreen,
    stepInactive: stepInactive,
    header: primaryGreen,
  },
};
