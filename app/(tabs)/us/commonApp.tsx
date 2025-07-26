import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Animated, Share } from 'react-native';
import { useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';

export default function CommonAppPage() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;
  
  // Section refs for navigation
  const overviewRef = useRef<View>(null);
  const personalInfoRef = useRef<View>(null);
  const activitiesRef = useRef<View>(null);
  const essayRef = useRef<View>(null);
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      const url = 'https://snowtrack.app/us/commonApp';
      const message = 'Check out this guide on the Common Application: ' + url;
      
      const result = await Share.share({
        message: message,
        url: url,
        title: 'The Common Application Guide'
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
          <Text style={styles.title}>The Common Application</Text>
          <Text style={styles.subtitle}>Your complete guide to streamlining the US university application process</Text>
          
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
              <TouchableOpacity onPress={() => scrollToSection(overviewRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Overview</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(personalInfoRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Personal Information</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(activitiesRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Activities & Honors</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(essayRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Personal Statement</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.heroImageContainer}>
            <Image
              source={require('@/assets/images/commonApp.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroText}>Streamline Your US University Applications</Text>
            </View>
          </View>
          
          <View ref={overviewRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>
              Using the Common Application (CommonApp) is the most efficient way to apply to US Universities. Almost every significant American university can be applied to utilizing the CommonApp, significantly streamlining the application process. Instead of having to fill in twenty different sets of personal and academic information, the CommonApp standardizes the process, saving you dozens of hours in the application process.
            </Text>
            <Text style={styles.description}>
              There are three main parts to your CommonApp:
            </Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>1. Your Personal Information</Text>
              <Text style={styles.infoBoxText}>2. Your Activities & Honors</Text>
              <Text style={styles.infoBoxText}>3. Your Personal Statement (Essay)</Text>
            </View>
          </View>

          <View ref={personalInfoRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <Text style={styles.description}>
              Your personal information includes information such as your demographics, the school you went to, your parent's educational background etc. While there is some information within this section that can affect your overall application, much of it is unchangeable (ex. Your Race), and should be answered as precisely as possible.
            </Text>
          </View>

          <View ref={activitiesRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Activities & Honors</Text>
            <Text style={styles.description}>
              Your Activities and Honors are where you have more control over the information you present. The CommonApp allows you to report ten distinct activities (extracurriculars) along with five academic honors (awards). In contrast to Canadian Universities, which often make you report your ECs through essays, the CommonApp allows you to directly explain your EC and impact.
            </Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>Activities Section Features:</Text>
              <Text style={styles.infoBoxText}>• Up to 10 distinct activities</Text>
              <Text style={styles.infoBoxText}>• Direct impact explanation</Text>
              <Text style={styles.infoBoxText}>• Leadership roles and responsibilities</Text>
              <Text style={styles.infoBoxText}>• Time commitment and duration</Text>
            </View>
          </View>

          <View ref={essayRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Personal Statement</Text>
            <Text style={styles.description}>
              Your Personal Statement, also known as the CommonApp essay, is one of the most crucial elements of your college application process. The personal statement is a singular essay, up to 650 words, that should give post-secondary institutions some insight into your life, character and personality.
            </Text>
            
            <View style={styles.essayInfo}>
              <Text style={styles.essayInfoTitle}>2025-26 Personal Statement Prompts:</Text>
              <Text style={styles.essayPrompt}>1. Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.</Text>
              <Text style={styles.essayPrompt}>2. The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?</Text>
              <Text style={styles.essayPrompt}>3. Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?</Text>
              <Text style={styles.essayPrompt}>4. Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?</Text>
              <Text style={styles.essayPrompt}>5. Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.</Text>
              <Text style={styles.essayPrompt}>6. Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?</Text>
              <Text style={styles.essayPrompt}>7. Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.</Text>
            </View>
            
            <Text style={styles.description}>
              Unlike Canadian universities, the Personal Statement is not intended to be a brag sheet. You are not encouraged to just talk about academics, but rather real-world experiences that have shaped your personality and worldview. A truly effective Personal Statement takes real-world experiences and describes how they interact with your academic background.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Key Benefits of CommonApp</Text>
            <View style={styles.benefitsGrid}>
              <View style={styles.benefitCard}>
                <Text style={styles.benefitIcon}>⏰</Text>
                <Text style={styles.benefitTitle}>Time Saving</Text>
                <Text style={styles.benefitText}>Save dozens of hours by filling out one application instead of twenty</Text>
              </View>
              <View style={styles.benefitCard}>
                <Text style={styles.benefitIcon}>🎯</Text>
                <Text style={styles.benefitTitle}>Standardized</Text>
                <Text style={styles.benefitText}>Consistent format across all participating universities</Text>
              </View>
              <View style={styles.benefitCard}>
                <Text style={styles.benefitIcon}>📚</Text>
                <Text style={styles.benefitTitle}>Comprehensive</Text>
                <Text style={styles.benefitText}>Covers all major aspects of your application</Text>
              </View>
              <View style={styles.benefitCard}>
                <Text style={styles.benefitIcon}>🌍</Text>
                <Text style={styles.benefitTitle}>Wide Coverage</Text>
                <Text style={styles.benefitText}>Accepted by almost every significant American university</Text>
              </View>
            </View>
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
    height: 80,
  },
  headerTop: {
    height: 1,
    backgroundColor: '#1f275c',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: '#f0f8ff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 20,
  },
  headerLogo: {
    width: 48,
    height: 48,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Lato-Bold',
  },
  headerBottom: {
    height: 2,
    backgroundColor: '#4ccfff',
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
    fontSize: 16.5,
    color: '#000000',
    lineHeight: 26,
    fontFamily: 'Lato-Regular',
    marginTop: 4,
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: '#f8faff',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d8d8d8',
  },
  infoBoxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Lato-Bold',
  },
  infoBoxText: {
    fontSize: 15,
    color: '#000000',
    lineHeight: 22,
    fontFamily: 'Lato-Regular',
    marginBottom: 4,
  },
  essayInfo: {
    backgroundColor: '#f8faff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d8d8d8',
  },
  essayInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    fontFamily: 'Lato-Bold',
  },
  essayPrompt: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    fontFamily: 'Lato-Regular',
    marginBottom: 8,
    paddingLeft: 8,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  benefitCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  benefitIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  benefitText: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'Lato-Regular',
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
}); 