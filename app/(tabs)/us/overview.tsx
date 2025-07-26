import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Animated, Share } from 'react-native';
import { useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';

export default function OverviewPage() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;
  
  // Section refs for navigation
  const introductionRef = useRef<View>(null);
  const differencesRef = useRef<View>(null);
  const financialRealityRef = useRef<View>(null);
  const sectionsRef = useRef<View>(null);
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      const url = 'https://snowtrack.app/us/overview';
      const message = 'Check out this comprehensive overview of applying to US universities from Canada: ' + url;
      
      const result = await Share.share({
        message: message,
        url: url,
        title: 'Canada to US University Guide'
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
          <Text style={styles.title}>Overview</Text>
          <Text style={styles.subtitle}>Comprehensive Canada to the United States Guide</Text>
          
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
                <Text style={styles.readTime}>5 min read • Updated Jan 2025</Text>
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
              <TouchableOpacity onPress={() => scrollToSection(introductionRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Introduction</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(differencesRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Canadian vs US Approach</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(financialRealityRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Financial Reality</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(sectionsRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Guide Sections</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.heroImageContainer}>
            <Image
              source={require('@/assets/images/overview.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
          
          <View ref={introductionRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.description}>
              Harvard, Stanford, MIT…. We've all heard of these global powerhouses of American Universities, 
              the ultimate goal for talented aspiring students. But how exactly, as a student in Canada, 
              do you apply for these prestigious institutions?
            </Text>
            
            <Text style={styles.description}>
              Is just being at the top of your class enough? What do you have to do differently? 
              Is it even possible to go to Harvard as a Canadian?
            </Text>
            
            <Text style={styles.description}>
              Hopefully, these questions can be answered in SnowTrack's Comprehensive Canada to the United States Overview.
            </Text>
          </View>

          <View ref={differencesRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Canadian vs US Approach</Text>
            <Text style={styles.description}>
              Applying to universities in Canada focuses mostly on grades, specifically your top six Grade 12 U/M courses. 
              However, American universities focus on a holistic view of the student, taking into consideration:
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>US University Considerations:</Text>
              <Text style={styles.infoText}>• Grades and Academic Performance</Text>
              <Text style={styles.infoText}>• Course Rigor and Difficulty</Text>
              <Text style={styles.infoText}>• Extracurricular Activities</Text>
              <Text style={styles.infoText}>• Awards and Recognition</Text>
              <Text style={styles.infoText}>• Test Scores (SAT/ACT)</Text>
              <Text style={styles.infoText}>• Essays and Personal Statements</Text>
              <Text style={styles.infoText}>• Letters of Recommendation</Text>
              <Text style={styles.infoText}>• Personal Character and Leadership</Text>
            </View>
            
            <Text style={styles.description}>
              If grades account for 70% of your application in Top Canadian Programs, those same grades account 
              for maybe 10-15% for Top American Universities.
            </Text>
            
            <Text style={styles.description}>
              Applying to top American schools isn't necessarily harder, but it is fundamentally different. 
              Focusing entirely on your grades is no longer sufficient, and can end up getting you rejected 
              from almost every top American university.
            </Text>
            
            <Text style={styles.description}>
              Being excellent both in and outside of school is the most consistent ticket to the United States.
            </Text>
          </View>

          <View ref={financialRealityRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>The Financial Reality</Text>
            <Text style={styles.description}>
              Before we get started on academics however, we must first consider the affordability of American schools. 
              While post-secondary in Canada is relatively affordable, college in the States can cost up to 
              <Text style={styles.boldText}> $600,000 Canadian dollars</Text>.
            </Text>
            
            <Text style={styles.description}>
              Please familiarize yourself with important Finances Information before continuing.
            </Text>
          </View>

          <View ref={sectionsRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Guide Sections</Text>
            <Text style={styles.description}>
              This comprehensive guide covers all aspects of applying to US universities from Canada:
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>What do American Universities Consider?</Text>
              <Text style={styles.infoText}>Understanding the holistic admissions process and what really matters</Text>
            </View>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Am I Disadvantaged as a Canadian Student?</Text>
              <Text style={styles.infoText}>Addressing common concerns about international student status</Text>
            </View>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>CommonApp vs OUAC</Text>
              <Text style={styles.infoText}>Comparing the application systems and processes</Text>
            </View>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Is the United States Worth It?</Text>
              <Text style={styles.infoText}>Weighing the costs and benefits of studying in the US</Text>
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