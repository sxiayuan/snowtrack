import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function USCategoryPage() {
  const { slug } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{slug?.toString().replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</Text>
      <Text style={styles.text}>This is the {slug} category page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A6D3F2' },
  heading: { fontSize: 32, fontWeight: 'bold', marginBottom: 16, color: '#25304A' },
  text: { fontSize: 18, color: '#25304A', textAlign: 'center' },
}); 