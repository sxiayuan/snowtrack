import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';

export default function USCategoryPage() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Redirect commonapp to the actual CommonApp page
    if (slug === 'commonapp') {
      router.replace('/us/commonApp');
    }
    // Redirect overview to the actual Overview page
    if (slug === 'overview') {
      router.replace('/us/overview');
    }
    // Redirect us-vs-ca to the actual US vs CA page
    if (slug === 'us-vs-ca') {
      router.replace('/us/why-america');
    }
    // Redirect applications to the actual Early Applications page
    if (slug === 'applications') {
      router.replace('/us/earlyApplications');
    }
  }, [slug, router]);

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