import { View, Text, StyleSheet } from 'react-native';

export default function FreePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Free</Text>
      <Text>This is the Free page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A6D3F2' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 16 },
}); 