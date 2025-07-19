import { View, Text, StyleSheet } from 'react-native';

export default function SelectivePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selective</Text>
      <Text>This is the Selective page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A6D3F2' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 16 },
}); 