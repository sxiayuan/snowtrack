import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UniversityPage from '@/components/UniversityPage';

export default function UofTBusinessPage() {
  return (
    <UniversityPage name="University of Toronto">
      {/* Overview Section */}
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Campus Info</Text>
        <Text style={styles.boldText}>2 campuses and 4 academies:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Downtown Toronto Campus (230 students/year): FitzGerald Academy, Peters-Boyd Academy, Wightman-Berris Academy</Text>
          <Text style={styles.listItem}>• Mississauga Campus (59 students/year): Mississauga Academy of Medicine</Text>
          <Text style={styles.listItem}>• Scarborough Campus (34 students/year): Scarborough Academy of Medicine and Integrated Health</Text>
        </View>
      </View>

      {/* Application Requirements Section */}
      <Text style={styles.sectionTitle}>Application Requirements</Text>
      <View style={styles.card}>
        <View style={styles.subCard}>
          <Text style={styles.cardTitle}>Academic Requirements</Text>
          <Text>Minimum undergrad cumulative GPA of 3.6 (3.8+ competitive) with at least 125 in each MCAT section, plus allowance for 124 in one section.</Text>
          <Text style={styles.mt8}>Past years have been rumoured to have an internal cGPA cutoff of <Text style={styles.boldText}>3.89</Text>.</Text>
          <Text style={styles.mt8}>For detailed statistics on past admissions, visit the University of Toronto MD Admission Stats.</Text>
        </View>
        <View style={styles.subCard}>
          <Text style={styles.cardTitle}>Prerequisites</Text>
          <Text>At least two full-course equivalents in life sciences, plus one in social sciences, humanities, or a language.</Text>
          <Text style={styles.mt8}>For undergraduate admission, you need completion of at least three years (15 full course equivalents) of study by the time you receive your offer in June.</Text>
        </View>
        <View style={styles.subCard}>
          <Text style={styles.cardTitle}>Essays</Text>
          <Text>You are required to submit <Text style={styles.boldText}>two original brief personal essays</Text>, each answering a specific question related to the Faculty's mission and values. Each brief personal essay must be <Text style={styles.boldText}>250 words or less</Text>.</Text>
        </View>
        <View style={styles.subCard}>
          <Text style={styles.cardTitle}>ABS Statement</Text>
          <Text>You are also required to write a third essay (500 words or less) expanding on one of your EC entries:</Text>
          <Text style={styles.italicText}>
            "Write about an impactful experience from your Autobiographical Sketch that demonstrates your personal growth, character, and values. How did this experience prepare you for medical school?"
          </Text>
          <Text style={styles.mt8}>This statement does not rotate or change yearly, unlike the two other prompts.</Text>
        </View>
        <View style={styles.subCard}>
          <Text style={styles.cardTitle}>Essay Prompts</Text>
          <Text style={styles.boldText}>2024–2025 Essay Prompts (250 words each):</Text>
          <Text style={styles.mt8}>Question 1:</Text>
          <Text>In what way(s) are you a product of the world around you? How has it, or how will it, impact your journey in medicine?</Text>
          <Text style={styles.mt8}>Question 2:</Text>
          <Text>Investor and philanthropist Charlie Munger is known for saying: “We all are learning, modifying, or destroying ideas all the time. Rapid destruction of your ideas when the time is right is one of the most valuable qualities you can acquire. You must force yourself to consider arguments on the other side.”
How has a failure or changed opinion influenced your development?</Text>
        </View>
      </View>
    </UniversityPage>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A3266',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Lato-Bold',
    alignSelf: 'center',
    maxWidth: 700,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#e9eef6',
    borderRadius: 10,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#b5c7e6',
    alignSelf: 'center',
    maxWidth: 700,
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183b6b',
    marginBottom: 6,
    fontFamily: 'Lato-Bold',
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  italicText: {
    fontStyle: 'italic',
    marginTop: 6,
    marginBottom: 6,
  },
  list: {
    marginTop: 6,
    marginLeft: 8,
  },
  listItem: {
    fontSize: 15,
    marginBottom: 2,
  },
  mt8: {
    marginTop: 8,
  },
  subCard: {
    backgroundColor: '#f7fafd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dbe6f7',
  },
});
