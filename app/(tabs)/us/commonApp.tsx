import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Animated, Share, Pressable } from 'react-native';
import { useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CommonAppPage() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;
  
  // Section refs for navigation
  const overviewRef = useRef<View>(null);
  const personalInfoRef = useRef<View>(null);
  const activitiesRef = useRef<View>(null);
  const personalStatementRef = useRef<View>(null);
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      const url = 'https://snowtrack.app/us/commonApp';
      const message = 'Check out this comprehensive guide to the Common Application for US universities: ' + url;
      
      const result = await Share.share({
        message: message,
        url: url,
        title: 'Common Application Guide'
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
        <Text style={styles.headerTitle}>CommonApp</Text>
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
          <Text style={styles.title}>The Common Application</Text>
          <Text style={styles.subtitle}>Streamlining Your US University Applications</Text>
          
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
                <Text style={styles.readTime}>10 min read • Updated Jan 2025</Text>
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
              <TouchableOpacity onPress={() => scrollToSection(personalStatementRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Personal Statement</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.heroImageContainer}>
            <Image
              source={require('@/assets/images/commonApp.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
              fadeDuration={0}
            />
          </View>
          
          <View ref={overviewRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>What is the Common Application?</Text>
            <Text style={styles.description}>
              Using the Common Application (CommonApp) is the most efficient way to apply to US Universities. 
              Almost every significant American university can be applied to utilizing the CommonApp, significantly 
              streamlining the application process.
            </Text>
            
            <Text style={styles.description}>
              Instead of having to fill in twenty different sets of personal and academic information, 
              the CommonApp standardizes the process, saving you dozens of hours in the application process.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Key Benefits:</Text>
              <Text style={styles.infoText}>• Apply to 1,000+ colleges with one application</Text>
              <Text style={styles.infoText}>• Standardized personal information section</Text>
              <Text style={styles.infoText}>• Centralized activities and honors tracking</Text>
              <Text style={styles.infoText}>• Single personal statement for all schools</Text>
              <Text style={styles.infoText}>• Streamlined recommendation system</Text>
            </View>
          </View>

          <View ref={personalInfoRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <Text style={styles.description}>
              Your personal information includes information such as your demographics, the school you went to, 
              your parent's educational background, and more.
            </Text>
            
            <Text style={styles.description}>
              While there is some information within this section that can affect your overall application, 
              much of it is unchangeable (ex. Your Race), and should be answered as precisely as possible.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Required Information:</Text>
              <Text style={styles.infoText}>• Personal demographics and contact details</Text>
              <Text style={styles.infoText}>• High school information and GPA</Text>
              <Text style={styles.infoText}>• Parent/guardian education and occupation</Text>
              <Text style={styles.infoText}>• Household income and financial aid needs</Text>
              <Text style={styles.infoText}>• Citizenship and residency status</Text>
            </View>
          </View>

          <View ref={activitiesRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Activities & Honors</Text>
            <Text style={styles.description}>
              Your Activities and Honors are where you have more control over the information you present. 
              The CommonApp allows you to report ten distinct activities (extracurriculars) along with five 
              academic honors (awards).
            </Text>
            
            <Text style={styles.description}>
              In contrast to Canadian Universities, which often make you report your ECs through essays, 
              the CommonApp allows you to directly explain your EC and impact.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Activity Categories:</Text>
              <Text style={styles.infoText}>• Academic (clubs, competitions, research)</Text>
              <Text style={styles.infoText}>• Athletics (sports, fitness, team leadership)</Text>
              <Text style={styles.infoText}>• Arts (music, theater, visual arts)</Text>
              <Text style={styles.infoText}>• Community Service (volunteering, social impact)</Text>
              <Text style={styles.infoText}>• Work Experience (jobs, internships)</Text>
            </View>
          </View>

          <View ref={personalStatementRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Personal Statement</Text>
            <Text style={styles.description}>
              Your Personal Statement, also known as the CommonApp essay, is one of the most crucial elements 
              of your college application process. The personal statement is a singular essay, up to 650 words, 
              that should give post-secondary institutions some insight into your life, character and personality.
            </Text>
            
            <Text style={styles.description}>
              Unlike Canadian universities, the Personal Statement is not intended to be a brag sheet. 
              You are not encouraged to just talk about academics, but rather real-world experiences that 
              have shaped your personality and worldview.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>2025-26 Essay Prompts:</Text>
              <Text style={styles.essayPrompt}>1. Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.</Text>
              <Text style={styles.essayPrompt}>2. The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?</Text>
              <Text style={styles.essayPrompt}>3. Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?</Text>
              <Text style={styles.essayPrompt}>4. Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?</Text>
              <Text style={styles.essayPrompt}>5. Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.</Text>
              <Text style={styles.essayPrompt}>6. Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?</Text>
              <Text style={styles.essayPrompt}>7. Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.</Text>
            </View>
            
            <Text style={styles.description}>
              <Text style={styles.boldText}>Writing Tips:</Text> A truly effective Personal Statement takes 
              real-world experiences and describes how they interact with your academic background. Focus on 
              storytelling, authenticity, and showing your unique perspective.
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
  essayPrompt: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 8,
    fontFamily: 'Lato-Regular',
    fontStyle: 'italic',
  },
}); 