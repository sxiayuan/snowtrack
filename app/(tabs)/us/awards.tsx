import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function EarlyApplicationsPage() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this comprehensive guide to Early Applications for US universities! https://snowtrack.app',
        title: 'Early Applications Guide',
      });
      
      if (result.action === Share.sharedAction) {
        console.log('Content shared successfully');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#25304A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Early Applications</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Feather name="share-2" size={24} color="#25304A" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Early Applications</Text>
          <Text style={styles.subtitle}>Strategic Timing for US University Admissions</Text>
          
          <View style={styles.authorSection}>
            <Text style={styles.authorText}>By SnowTrack Team</Text>
            <Text style={styles.dateText}>Updated December 2024</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.heroImageContainer}>
            <Image
              source={require('@/assets/images/earlyApplications.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroText}>Get Ahead with Early Applications</Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Understanding Early Applications</Text>
            <Text style={styles.description}>
              Early applications can significantly increase your chances of admission to top US universities. 
              Understanding the different types of early applications and their strategic implications is crucial 
              for Canadian students applying to American institutions.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Early Decision (ED)</Text>
            <Text style={styles.description}>
              Early Decision is a binding agreement between you and the university. If accepted, you must attend 
              that institution and withdraw all other applications.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Key Features:</Text>
              <Text style={styles.infoText}>• Binding commitment if accepted</Text>
              <Text style={styles.infoText}>• Higher acceptance rates (often 2-3x higher)</Text>
              <Text style={styles.infoText}>• Application deadline: November 1st</Text>
              <Text style={styles.infoText}>• Decision notification: Mid-December</Text>
              <Text style={styles.infoText}>• Can only apply to one ED school</Text>
            </View>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Strategy:</Text> Choose your absolute top choice school for ED. 
              This should be a school where you would be happy to attend regardless of financial aid offers.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Early Action (EA)</Text>
            <Text style={styles.description}>
              Early Action is non-binding, allowing you to receive an early decision without committing to attend.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Key Features:</Text>
              <Text style={styles.infoText}>• Non-binding commitment</Text>
              <Text style={styles.infoText}>• Higher acceptance rates than regular decision</Text>
              <Text style={styles.infoText}>• Application deadline: November 1st</Text>
              <Text style={styles.infoText}>• Decision notification: Mid-December to January</Text>
              <Text style={styles.infoText}>• Can apply to multiple EA schools</Text>
            </View>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Strategy:</Text> Apply EA to your top choices and safety schools. 
              This gives you early acceptances and reduces stress during regular decision season.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Restrictive Early Action (REA)</Text>
            <Text style={styles.description}>
              Some schools offer Restrictive Early Action, which limits your ability to apply early to other 
              private institutions.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Key Features:</Text>
              <Text style={styles.infoText}>• Non-binding commitment</Text>
              <Text style={styles.infoText}>• Cannot apply ED to other private schools</Text>
              <Text style={styles.infoText}>• Can apply EA to public schools</Text>
              <Text style={styles.infoText}>• Offered by: Harvard, Yale, Stanford, Princeton</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Strategic Considerations</Text>
            
            <Text style={styles.subsectionTitle}>Financial Aid Implications</Text>
            <Text style={styles.description}>
              <Text style={styles.boldText}>ED Considerations:</Text> You cannot compare financial aid offers 
              from different schools with ED. If financial aid is crucial, consider EA instead.
            </Text>
            
            <Text style={styles.subsectionTitle}>Timeline Planning</Text>
            <Text style={styles.description}>
              <Text style={styles.boldText}>Summer Preparation:</Text> Complete your Common App, essays, and 
              gather materials before school starts. Early applications require everything to be ready by October.
            </Text>
            
            <Text style={styles.subsectionTitle}>Test Scores</Text>
            <Text style={styles.description}>
              <Text style={styles.boldText}>SAT/ACT Timing:</Text> Take your final tests by October for early 
              applications. Consider taking tests in June or August to allow for retakes.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Application Timeline</Text>
            
            <View style={styles.timelineContainer}>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineDate}>June - August</Text>
                <Text style={styles.timelineText}>Research schools, prepare essays, gather materials</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineDate}>September</Text>
                <Text style={styles.timelineText}>Finalize school list, complete applications</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineDate}>October</Text>
                <Text style={styles.timelineText}>Take final SAT/ACT tests, submit applications</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineDate}>November 1st</Text>
                <Text style={styles.timelineText}>Early application deadlines</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineDate}>Mid-December</Text>
                <Text style={styles.timelineText}>ED decisions released</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineDate}>January</Text>
                <Text style={styles.timelineText}>EA decisions released</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Success Strategies</Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>1. Start Early:</Text> Begin your application process in the summer 
              before your senior year. Early applications require everything to be ready by October.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>2. Choose Wisely:</Text> For ED, select a school where you would 
              be happy to attend regardless of financial aid. For EA, apply to multiple schools strategically.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>3. Prepare Thoroughly:</Text> Ensure all materials are complete 
              and polished. Early applications often have higher standards due to the competitive applicant pool.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>4. Consider Financial Aid:</Text> If you need significant financial 
              aid, EA may be better than ED since you can compare offers from multiple schools.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 120,
  },
  headerTop: {
    height: 120,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25304A',
    fontFamily: 'Lato-Bold',
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    padding: 20,
    paddingTop: 140,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#25304A',
    fontFamily: 'Lato-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  authorSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  authorText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
  heroImageContainer: {
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 24,
  },
  heroText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25304A',
    fontFamily: 'Lato-Bold',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#25304A',
    fontFamily: 'Lato-Bold',
    marginTop: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'Lato-Regular',
    lineHeight: 24,
    marginBottom: 16,
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  infoBox: {
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 12,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25304A',
    fontFamily: 'Lato-Bold',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'Lato-Regular',
    lineHeight: 24,
    marginBottom: 8,
  },
  timelineContainer: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  timelineDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
    fontFamily: 'Lato-Bold',
    width: 120,
    marginRight: 16,
  },
  timelineText: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'Lato-Regular',
    flex: 1,
    lineHeight: 24,
  },
}); 