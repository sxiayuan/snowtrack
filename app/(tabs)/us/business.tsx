import { View, Text, StyleSheet } from 'react-native';

export default function BusinessPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business</Text>
      <Text>This is the Business page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A6D3F2' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 16 },
}); 