import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { useTheme } from '@/theme';

const { width, height } = Dimensions.get('window');

export const AnimatedBackground = () => {
  const { colors } = useTheme();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 20000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 20000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.background,
        {
          transform: [{ rotate }],
          backgroundColor: colors.purple500,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: -height * 0.6,
    left: -width * 0.4,
    width: width * 2,
    height: height * 1.4,
    borderRadius: height,
    opacity: 0.08,
  },
}); 