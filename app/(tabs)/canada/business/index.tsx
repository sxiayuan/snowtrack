import { StyleSheet, View, TouchableOpacity, Text, Animated, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef } from 'react';

const universities = [
  { name: 'University of Toronto', color: '#0A3266', border: '#0A3266', route: '/canada/business/uoft' },
  { name: 'Queen\'s University', color: '#B8002E', border: '#B8002E', route: '/canada/business/queens' },
  { name: 'Western University', color: '#5F259F', border: '#5F259F', route: '/canada/business/western' },
  { name: 'Laurier University', color: '#8A1538', border: '#8A1538', route: '/canada/business/laurier' },
  { name: 'Waterloo University', color: '#8A1538', border: '#8A1538', route: '/canada/business/waterloo' },
  { name: 'York University', color: '#8A1538', border: '#8A1538', route: '/canada/business/york' },
];

function UniversityCard({ name, color, border, onPress }: { name: string; color: string; border: string; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], width: '100%' }}>
      <Pressable
        style={[styles.card, { borderColor: border, backgroundColor: '#B6F3FF' }]}
        onPressIn={animateIn}
        onPressOut={animateOut}
        onHoverIn={animateIn}
        onHoverOut={animateOut}
        onPress={onPress}
      >
        <Text style={[styles.cardText, { color }]}>{name}</Text>
        <Text style={[styles.arrow, { color }]}>{'→'}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function BusinessScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.replace('/canada');
    }
  };

  const handleUniversityPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>{'← Back'}</Text>
      </TouchableOpacity>
      <View style={styles.cardList}>
        {universities.map((u) => (
          <UniversityCard
            key={u.name}
            name={u.name}
            color={u.color}
            border={u.border}
            onPress={() => handleUniversityPress(u.route)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  cardList: {
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    backgroundColor: '#000',
    marginTop: 80,
    gap: 18,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#B6F3FF',
    shadowColor: '#B6F3FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    color: '#111',
  },
  arrow: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    color: '#111',
  },
}); 