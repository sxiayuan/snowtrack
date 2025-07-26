import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Animated, Share } from 'react-native';
import { useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TestScoresPage() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;
  
  // Section refs for navigation
  const overviewRef = useRef<View>(null);
  const testingPoliciesRef = useRef<View>(null);
  const satRef = useRef<View>(null);
  const actRef = useRef<View>(null);
  const strategyRef = useRef<View>(null);
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      const url = 'https://snowtrack.app/us/test-scores';
      const message = 'Check out this comprehensive guide to standardized testing for US universities: ' + url;
      
      const result = await Share.share({
        message: message,
        url: url,
        title: 'Standardized Testing Guide'
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
          <Text style={styles.headerTitle}>Test Scores</Text>
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
          <Text style={styles.title}>Standardized Testing</Text>
          <Text style={styles.subtitle}>Understanding SAT, ACT, and Testing Policies for US Universities</Text>
          
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
                <Text style={styles.readTime}>7 min read • Updated Jan 2025</Text>
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
              <TouchableOpacity onPress={() => scrollToSection(testingPoliciesRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Testing Policies</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(satRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>SAT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(actRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>ACT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(strategyRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Strategy</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.heroImageContainer}>
            <Image
              source={require('@/assets/images/article images/porter-raab-Ucr4Yp-t364-unsplash.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
          
          <View ref={overviewRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>
              Unlike Canadian Universities, many American schools require you to submit a standardized test 
              score along with your application. The two primarily accepted standardized tests are the ACT 
              and the SAT. Whether these test scores are mandatory depends on the institution's testing policy.
            </Text>
          </View>

          <View ref={testingPoliciesRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Testing Policies</Text>
            <Text style={styles.description}>
              American Universities can be either Test Optional or Test Mandatory.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Test Optional:</Text>
              <Text style={styles.infoText}>Universities do not require a SAT or ACT score to apply, but still consider the score if submitted.</Text>
            </View>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Test Mandatory:</Text>
              <Text style={styles.infoText}>Universities require a SAT or ACT score to apply.</Text>
            </View>
            
            <Text style={styles.description}>
              However, a "Test Optional" policy is not an invitation to not take these standardized tests. 
              Many test optional schools still heavily value test scores, and you may be significantly 
              disadvantaged. The rule of thumb, as an international student, is to reach the 75th percentile 
              of test scores for whichever University you are trying to attend.
            </Text>
            
            <Text style={styles.description}>
              Very rarely, some schools may be test blind, and do not consider SAT or ACT scores in the 
              application process. Some examples being the UCs, such as UCLA or UC Berkeley.
            </Text>
          </View>

          <View ref={satRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>SAT</Text>
            <Text style={styles.description}>
              The SAT is the more popular of the two standardized testing options. Fully digitalized and 
              containing an adaptive format, the SAT tests your knowledge in reading, writing, and mathematics.
            </Text>
            
            <View style={styles.keyPointsTable}>
              <Text style={styles.tableTitle}>Key Points</Text>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Format:</Text>
                <Text style={styles.tableValue}>Digital, Adaptive</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Sections:</Text>
                <Text style={styles.tableValue}>Reading, Writing, Math</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Duration:</Text>
                <Text style={styles.tableValue}>2 hours 14 minutes</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Score Range:</Text>
                <Text style={styles.tableValue}>400-1600</Text>
              </View>
            </View>
          </View>

          <View ref={actRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>ACT</Text>
            <Text style={styles.description}>
              The ACT is an alternative standardized test that covers English, mathematics, reading, and 
              science reasoning. It's known for its straightforward format and science section.
            </Text>
            
            <View style={styles.keyPointsTable}>
              <Text style={styles.tableTitle}>Key Points</Text>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Format:</Text>
                <Text style={styles.tableValue}>Paper-based or Digital</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Sections:</Text>
                <Text style={styles.tableValue}>English, Math, Reading, Science</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Duration:</Text>
                <Text style={styles.tableValue}>2 hours 55 minutes</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Score Range:</Text>
                <Text style={styles.tableValue}>1-36</Text>
              </View>
            </View>
          </View>

          <View ref={strategyRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Strategy</Text>
            <Text style={styles.description}>
              <Text style={styles.boldText}>Choose Your Test:</Text> Research which test is preferred by 
              your target schools, or take both to see which you perform better on.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Timing:</Text> Take your tests early enough to allow for 
              retakes if needed. Most students take their final test by October for early applications.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Preparation:</Text> Invest in quality test preparation, 
              whether through courses, tutors, or self-study materials.
            </Text>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Target Scores:</Text> Aim for the 75th percentile of your 
              target schools' admitted students, especially as an international student.
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
  keyPointsTable: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 0,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#2563eb',
    overflow: 'hidden',
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
}); 