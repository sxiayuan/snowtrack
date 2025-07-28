import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Animated, Share, Pressable } from 'react-native';
import { useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EarlyApplicationsPage() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;
  const [showEDIISchools, setShowEDIISchools] = useState(false);
  
  // Section refs for navigation
  const understandingRef = useRef<View>(null);
  const earlyDecisionRef = useRef<View>(null);
  const earlyDecisionIIRef = useRef<View>(null);
  const earlyActionRef = useRef<View>(null);
  const regularDecisionRef = useRef<View>(null);
  const strategyRef = useRef<View>(null);
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      const url = 'https://snowtrack.app/us/earlyApplications';
      const message = 'Check out this comprehensive guide to Early Applications for US universities: ' + url;
      
      const result = await Share.share({
        message: message,
        url: url,
        title: 'Early Applications Guide'
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Unable to share at this time.');
    }
  };

  const scrollToSection = (sectionRef: React.RefObject<View | null>) => {
    if (sectionRef.current && scrollViewRef.current) {
      sectionRef.current.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          scrollViewRef.current?.scrollTo({
            y: y - 100, // Offset for header
            animated: true,
          });
        },
        () => {
          // Fallback if measureLayout fails
          Alert.alert('Navigation', 'Unable to scroll to section');
        }
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#9BC4E8' }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.replace('/us')}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#1E2A57" />
        </Pressable>
        <Text style={styles.headerTitle}>Applications</Text>
      </View>
      
      <Animated.ScrollView 
        ref={scrollViewRef}
        style={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Early Applications</Text>
          <Text style={styles.subtitle}>Strategic Timing for US University Admissions</Text>
          
          <View style={styles.authorSection}>
            <View style={styles.authorInfo}>
              <View style={styles.authorAvatar}>
                <Image
                  source={require('@/assets/images/SnowtrackTransparentTextless.png')}
                  style={styles.avatarLogo}
                  resizeMode="contain"
                  fadeDuration={0}
                />
              </View>
              <View style={styles.authorDetails}>
                <Text style={styles.authorName}>Snowtrack Advisor</Text>
                <Text style={styles.readTime}>6 min read • Updated Jan 2025</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <Feather name="share" size={20} color="#1f275c" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          {/* Table of Contents */}
          <View style={styles.tocContainer}>
            <Text style={styles.tocTitle}>Quick Navigation</Text>
            <View style={styles.tocLinks}>
              <TouchableOpacity onPress={() => scrollToSection(understandingRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Understanding Early Apps</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(earlyDecisionRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Early Decision</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(earlyDecisionIIRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Early Decision II</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(earlyActionRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Early Action</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(regularDecisionRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Regular Decision</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(strategyRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Strategy</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.heroImageContainer}>
            <Image
              source={require('@/assets/images/earlyApplications.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
              fadeDuration={0}
            />
          </View>
          
          <View ref={understandingRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Understanding Early Applications</Text>
            <Text style={styles.description}>
              Unlike Canada, where early applications quite literally refer to applying early, there are distinct 
              waves of applications for American universities. Understanding, and strategically utilizing the 
              different types of applications is crucial for applying to American institutions.
            </Text>
          </View>

          <View ref={earlyDecisionRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Early Decision (ED)</Text>
            <Text style={styles.description}>
              Early decision is the most restrictive, yet most important phase of applying to college. Early 
              Decision is a binding agreement between you and the university. If accepted, you must attend that 
              institution and withdraw all other applications. In exchange, you are offered significantly higher 
              acceptance rates, often a 2-3x boost.
            </Text>
            
            <View style={styles.keyPointsTable}>
              <Text style={styles.tableTitle}>Key Points</Text>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Commitment:</Text>
                <Text style={styles.tableValue}>Binding</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Multiple Applications:</Text>
                <Text style={styles.tableValue}>No, only one ED school</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Deadline:</Text>
                <Text style={styles.tableValue}>November 1st</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Decision Notification:</Text>
                <Text style={styles.tableValue}>Mid-December</Text>
              </View>
            </View>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Strategy:</Text> Choose your absolute top choice school for ED. 
              This should be a school where you would be happy to attend regardless of financial aid offers.
            </Text>
            
            <Text style={styles.note}>
              <Text style={styles.boldText}>Note:</Text> Also known as "REA (Restrictive Early Action)" at some schools.
            </Text>
          </View>

          <View ref={earlyDecisionIIRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Early Decision II (ED II)</Text>
            <Text style={styles.description}>
              Early Decision II is a second binding application option offered by some schools. It functions 
              similarly to Early Decision I but with a later deadline, typically in January.
            </Text>
            
            <Text style={styles.description}>
              ED II is perfect for students who were deferred or rejected from their ED I school, or for those 
              who weren't ready to commit to a binding decision in November. It offers the same binding 
              commitment and potential acceptance rate boost as ED I.
            </Text>
            
            <View style={styles.keyPointsTable}>
              <Text style={styles.tableTitle}>Key Points</Text>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Commitment:</Text>
                <Text style={styles.tableValue}>Binding</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Multiple Applications:</Text>
                <Text style={styles.tableValue}>No, only one ED II school</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Deadline:</Text>
                <Text style={styles.tableValue}>January 1st - January 15th</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Decision Notification:</Text>
                <Text style={styles.tableValue}>February - March</Text>
              </View>
            </View>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Strategy:</Text> Use ED II if you were deferred from ED I or if 
              you've found a new top choice school. This gives you a second chance at the binding commitment 
              advantage while still applying early.
            </Text>
            
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={styles.dropdownHeader}
                onPress={() => setShowEDIISchools(!showEDIISchools)}
              >
                <Text style={styles.dropdownTitle}>Significant ED II Schools</Text>
                <Feather 
                  name={showEDIISchools ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#2563eb" 
                />
              </TouchableOpacity>
              {showEDIISchools && (
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownItem}>• University of Chicago</Text>
                  <Text style={styles.dropdownItem}>• Vanderbilt University</Text>
                  <Text style={styles.dropdownItem}>• Washington University in St. Louis</Text>
                  <Text style={styles.dropdownItem}>• Emory University</Text>
                  <Text style={styles.dropdownItem}>• New York University</Text>
                  <Text style={styles.dropdownItem}>• Carnegie Mellon University</Text>
                  <Text style={styles.dropdownItem}>• Boston College</Text>
                  <Text style={styles.dropdownItem}>• Boston University</Text>
                  <Text style={styles.dropdownItem}>• Villanova University</Text>
                </View>
              )}
            </View>
          </View>

          <View ref={earlyActionRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Early Action (EA)</Text>
            <Text style={styles.description}>
              Early action is a non-binding, early wave of applications. Schools offer EA as a way to recieve 
              applications ahead of the December/January rush schedule, and may offer an increased acceptance 
              rate in return. For students, EA is a great way to get applications out of the way before the 
              Regular Decision wave.
            </Text>
            
            <View style={styles.keyPointsTable}>
              <Text style={styles.tableTitle}>Key Points</Text>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Commitment:</Text>
                <Text style={styles.tableValue}>Non-binding</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Multiple Applications:</Text>
                <Text style={styles.tableValue}>Yes, can apply to multiple EA schools</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Deadline:</Text>
                <Text style={styles.tableValue}>November 1st</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Decision Notification:</Text>
                <Text style={styles.tableValue}>Mid-December</Text>
              </View>
            </View>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Strategy:</Text> Use EA for schools you're interested in but 
              aren't your top choice. This gives you early acceptances and reduces stress during regular decision.
            </Text>
          </View>

          <View ref={regularDecisionRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Regular Decision (RD)</Text>
            <Text style={styles.description}>
              Regular Decision is the standard application timeline for most US universities. This is the most 
              common application period and offers the most flexibility for students.
            </Text>
            
            <Text style={styles.description}>
              Regular Decision applications are non-binding, meaning you can apply to multiple schools and 
              choose which one to attend after receiving all your acceptances and financial aid offers.
            </Text>
            
            <View style={styles.keyPointsTable}>
              <Text style={styles.tableTitle}>Key Points</Text>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Commitment:</Text>
                <Text style={styles.tableValue}>Non-binding</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Multiple Applications:</Text>
                <Text style={styles.tableValue}>Yes, unlimited schools</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Deadline:</Text>
                <Text style={styles.tableValue}>January 1st - February 1st</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Decision Notification:</Text>
                <Text style={styles.tableValue}>March - April</Text>
              </View>
            </View>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Strategy:</Text> Use Regular Decision for your remaining schools 
              after applying early. This gives you time to compare financial aid offers and make the best 
              decision for your future.
            </Text>
          </View>

          <View ref={strategyRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Strategic Considerations</Text>
            <Text style={styles.description}>
              <Text style={styles.boldText}>Financial Aid:</Text> If you need significant financial aid, 
              be cautious with ED as you're committed to attend regardless of the aid package offered.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Application Strength:</Text> Only apply early if your application 
              is strong and complete. Early applications are often more competitive than regular decision.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Timeline:</Text> Early applications require you to have all 
              materials ready by November 1st, including test scores, essays, and recommendations.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Success Strategies</Text>
            <Text style={styles.description}>
              <Text style={styles.boldText}>1. Research Thoroughly:</Text> Understand each school's 
              early application policies and acceptance rates.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>2. Prepare Early:</Text> Start working on your applications 
              during the summer before senior year.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>3. Choose Wisely:</Text> For ED, pick a school you'd be 
              genuinely happy to attend. For EA, apply to schools where you have a realistic chance.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>4. Stay Organized:</Text> Keep track of deadlines, requirements, 
              and submission status for each school.
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#9BC4E8',
  },
  headerTop: {
    height: 1,
    backgroundColor: '#1f275c',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f0f8ff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  logo: {
    marginRight: 12,
  },
  headerLogo: {
    width: 24,
    height: 24,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f275c',
    fontFamily: 'Lato-Bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E2A57',
    fontFamily: 'Lato-Bold',
  },
  headerBottom: {
    height: 2,
    backgroundColor: '#4ccfff',
  },
  heroImageContainer: {
    height: 300,
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    paddingTop: 40,
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    marginBottom: 12,
    fontFamily: 'Lato-Bold',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'left',
    marginBottom: 24,
    fontFamily: 'Lato-Regular',
  },
  authorSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarLogo: {
    width: 40,
    height: 40,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Lato-Bold',
    marginBottom: 2,
  },
  readTime: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Lato-Regular',
  },
  shareButton: {
    padding: 8,
    borderRadius: 4,
  },
  divider: {
    height: 2,
    backgroundColor: '#2563eb',
    marginBottom: 24,
    borderRadius: 1,
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  tocContainer: {
    backgroundColor: '#f8faff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e1f0ff',
  },
  tocTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    fontFamily: 'Lato-Bold',
  },
  tocLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tocLink: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d8d8d8',
  },
  tocLinkText: {
    fontSize: 14,
    color: '#1f275c',
    fontFamily: 'Lato-Regular',
  },
  sectionContainer: {
    backgroundColor: '#f7faff',
    borderRadius: 12,
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e1f0ff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 32,
    marginBottom: 20,
    fontFamily: 'Lato-Bold',
  },
  description: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: 'Lato-Regular',
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  infoBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    fontFamily: 'Lato-Bold',
  },
  infoText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 4,
    fontFamily: 'Lato-Regular',
  },
  keyPointsTable: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 0,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    fontFamily: 'Lato-Bold',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableLabel: {
    fontSize: 14,
    color: '#25304A',
    fontFamily: 'Lato-Regular',
    flex: 1,
  },
  tableValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    fontFamily: 'Lato-Bold',
    flex: 1,
    textAlign: 'right',
  },
  note: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    fontFamily: 'Lato-Regular',
    marginTop: 8,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8faff',
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Lato-Bold',
  },
  dropdownContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  dropdownItem: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 4,
    fontFamily: 'Lato-Regular',
  },
}); 