import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Animated, Share } from 'react-native';
import { useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EarlyApplicationsPage() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;
  
  // Section refs for navigation
  const understandingRef = useRef<View>(null);
  const earlyDecisionRef = useRef<View>(null);
  const earlyActionRef = useRef<View>(null);
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
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <View style={styles.headerTop} />
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#25304A" />
            </TouchableOpacity>
            <View style={styles.logo}>
              <Image
                source={require('@/assets/images/SnowTrackTransparent.png')}
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.brand}>
              <Text style={styles.brandName}>Snowtrack</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>Early Applications</Text>
        </View>
        <View style={styles.headerBottom} />
      </Animated.View>
      
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
              <TouchableOpacity onPress={() => scrollToSection(earlyActionRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Early Action</Text>
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
            />
          </View>
          
          <View ref={understandingRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Understanding Early Applications</Text>
            <Text style={styles.description}>
              Early applications can significantly increase your chances of admission to top US universities. 
              Understanding the different types of early applications and their strategic implications is crucial 
              for Canadian students applying to American institutions.
            </Text>
          </View>

          <View ref={earlyDecisionRef} style={styles.sectionContainer}>
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

          <View ref={earlyActionRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Early Action (EA)</Text>
            <Text style={styles.description}>
              Early Action is non-binding, meaning you can apply to multiple EA schools and still choose 
              which one to attend if accepted.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Key Features:</Text>
              <Text style={styles.infoText}>• Non-binding commitment</Text>
              <Text style={styles.infoText}>• Can apply to multiple EA schools</Text>
              <Text style={styles.infoText}>• Application deadline: November 1st</Text>
              <Text style={styles.infoText}>• Decision notification: Mid-December</Text>
              <Text style={styles.infoText}>• More flexibility than ED</Text>
            </View>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Strategy:</Text> Use EA for schools you're interested in but 
              aren't your top choice. This gives you early acceptances and reduces stress during regular decision.
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#f0f8ff',
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
    marginRight: 12,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25304A',
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
    paddingTop: 140,
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
}); 