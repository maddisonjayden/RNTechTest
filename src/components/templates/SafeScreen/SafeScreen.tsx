import type { PropsWithChildren } from 'react';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

type Props = PropsWithChildren<
  {
    isError?: boolean;
    onResetError?: () => void;
  } & Omit<SafeAreaViewProps, 'mode'>
>;

function SafeScreen({
  children = undefined,
  isError = false,
  onResetError = undefined,
  style,
  ...props
}: Props) {
  const { layout, navigationTheme, variant } = useTheme();

  return (
    <SafeAreaView {...props} mode="padding" style={[layout.flex_1, style]}>
      <StatusBar
        backgroundColor={navigationTheme.colors.background}
        barStyle={variant === 'dark' ? 'light-content' : 'dark-content'}
      />

      {children}
    </SafeAreaView>
  );
}

export default SafeScreen;
