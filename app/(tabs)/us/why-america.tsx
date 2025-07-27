import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function WhyAmericaPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.replace('/us')}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#1E2A57" />
        </Pressable>
        <Text style={styles.headerTitle}>US vs CA</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <View style={styles.comingSoonContainer}>
            <Feather name="flag" size={64} color="#004E89" style={styles.comingSoonIcon} />
            <Text style={styles.comingSoonTitle}>Coming Soon</Text>
            <Text style={styles.comingSoonText}>
              We're creating a comprehensive comparison guide that explores the key differences between studying in the United States versus Canada.
            </Text>
            <Text style={styles.comingSoonSubtext}>
              This section will include detailed comparisons of education systems, costs, opportunities, and cultural differences to help you make an informed decision.
            </Text>
          </View>

          <Pressable
            onPress={() => router.replace('/us')}
            style={styles.homeButton}
          >
            <Feather name="home" size={20} color="#fff" style={styles.homeIcon} />
            <Text style={styles.homeButtonText}>Back to Homepage</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b6d7f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#9BC4E8',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E2A57',
    fontFamily: 'Lato-Bold',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 600,
  },
  comingSoonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 48,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  comingSoonIcon: {
    marginBottom: 24,
  },
  comingSoonTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E2A57',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  comingSoonText: {
    fontSize: 18,
    color: '#2E2E2E',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 16,
    fontFamily: 'Lato-Regular',
  },
  comingSoonSubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Lato-Regular',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004E89',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  homeIcon: {
    marginRight: 8,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
}); 