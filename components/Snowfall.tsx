import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const SNOWFLAKE_COUNT = 55;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const Snowflake = () => {
  const x = randomBetween(0, width);
  const size = randomBetween(4, 10);
  const duration = randomBetween(4000, 9000);

  const translateY = useRef(new Animated.Value(-size)).current;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(-size);
      Animated.timing(translateY, {
        toValue: height + size,
        duration,
        useNativeDriver: true,
      }).start(() => animate());
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={[
        styles.snowflake,
        {
          left: x,
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: randomBetween(0.6, 1),
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

export default function Snowfall() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: SNOWFLAKE_COUNT }).map((_, i) => (
        <Snowflake key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  snowflake: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
}); 