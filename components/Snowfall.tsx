import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const SNOWFLAKE_COUNT = Platform.OS === 'web' ? 25 : 70; // Further reduce for web

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Web-specific snowfall using CSS animations
const WebSnowfall = () => {
  if (Platform.OS !== 'web') return null;

  const snowflakes = Array.from({ length: SNOWFLAKE_COUNT }, (_, i) => {
    const x = randomBetween(0, 100);
    const size = randomBetween(4, 10);
    const duration = randomBetween(4000, 9000);
    const delay = randomBetween(0, 5000);

    return (
      <div
        key={i}
        style={{
          position: 'fixed',
          left: `${x}%`,
          top: '-10px',
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: '#fff',
          borderRadius: '50%',
          opacity: randomBetween(0.6, 1),
          animation: `snowfall ${duration}ms linear infinite`,
          animationDelay: `${delay}ms`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          @keyframes snowfall {
            0% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(100vh);
            }
          }
        `}
      </style>
      {snowflakes}
    </div>
  );
};

// React Native snowfall using Animated
const NativeSnowfall = () => {
  if (Platform.OS === 'web') return null;

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
          useNativeDriver: false,
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

  return (
    <View style={styles.snowfallContainer} pointerEvents="none">
      {Array.from({ length: SNOWFLAKE_COUNT }).map((_, i) => (
        <Snowflake key={i} />
      ))}
    </View>
  );
};

export default function Snowfall() {
  return (
    <>
      <WebSnowfall />
      <NativeSnowfall />
    </>
  );
}

const styles = StyleSheet.create({
  snowfallContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    overflow: 'visible',
  },
  snowflake: {
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 1,
  },
}); 