import { StyleSheet, TouchableOpacity, Image, Animated, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Snowfall from '@/components/Snowfall';

export default function LandingScreen() {
  const router = useRouter();

  // Animation refs
  const canadaScale = useRef(new Animated.Value(1)).current;
  const usScale = useRef(new Animated.Value(1)).current;

  const animateIn = (scaleRef: Animated.Value) => {
    Animated.spring(scaleRef, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };
  const animateOut = (scaleRef: Animated.Value) => {
    Animated.spring(scaleRef, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  const handleCanadaPress = () => {
    router.push('./canada');
  };

  const handleUSPress = () => {
    router.push('./us');
  };

  return (
    <LinearGradient
      colors={['#1f275c', '#4ccfff']}
      style={styles.container}
    >
      <Snowfall />
      {/* Logo and Title */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/SnowTrackTransparent.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.heading}>I want to go to school in...</Text>
      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: canadaScale }], width: '100%' }}>
          <Pressable
            style={styles.button}
            onPressIn={() => animateIn(canadaScale)}
            onPressOut={() => animateOut(canadaScale)}
            onHoverIn={() => animateIn(canadaScale)}
            onHoverOut={() => animateOut(canadaScale)}
            onPress={handleCanadaPress}
          >
            <Text style={styles.buttonText}>Canada</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: usScale }], width: '100%' }}>
          <Pressable
            style={styles.button}
            onPressIn={() => animateIn(usScale)}
            onPressOut={() => animateOut(usScale)}
            onHoverIn={() => animateIn(usScale)}
            onHoverOut={() => animateOut(usScale)}
            onPress={handleUSPress}
          >
            <Text style={styles.buttonText}>United States</Text>
          </Pressable>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    marginTop: -60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: 'transparent',
    padding: 0,
  },
  logo: {
    width: 360,
    height: 360,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  heading: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 0,
    letterSpacing: 0.5,
    textShadowColor: '#4ccfff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  buttonContainer: {
    width: '45%',
    alignItems: 'center',
    gap: 24,
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
  button: {
    width: '100%',
    backgroundColor: '#B6F3FF',
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 0,
    alignItems: 'center',
    marginTop: 0,
    borderWidth: 0,
    shadowColor: '#B6F3FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#111',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
});
