import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

const universities = [
  { name: 'University of Toronto', color: '#0A3266', border: '#0A3266' },
  { name: 'McMaster University', color: '#8A1538', border: '#8A1538' },
  { name: "Queen's University", color: '#B8002E', border: '#B8002E' },
  { name: 'Western University', color: '#5F259F', border: '#5F259F' },
  { name: 'University of Ottawa', color: '#8A1538', border: '#8A1538' },
];

function UniversityCard({ name, color, border }: { name: string; color: string; border: string }) {
  return (
    <TouchableOpacity style={[styles.card, { borderColor: border, backgroundColor: '#fff' }]}
      activeOpacity={0.85}>
      <Text style={[styles.cardText, { color, fontWeight: 'bold' }]}>{name}</Text>
      <Text style={[styles.arrow, { color }]}>→</Text>
    </TouchableOpacity>
  );
}

export default function MedScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{'← Back'}</Text>
      </TouchableOpacity>
      <View style={styles.cardList}>
        {universities.map((u, i) => (
          <UniversityCard key={u.name} name={u.name} color={u.color} border={u.border} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 12,
    width: '45%',
    paddingVertical: 18,
    paddingHorizontal: 0,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
});
