import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, Image, Animated, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function BrowseAllPage() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      // Share functionality would go here
      console.log('Share pressed');
    } catch (error) {
      console.error('Error sharing:', error);
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
                <Text style={styles.authorName}>Snowtrack Research Team</Text>
                <Text style={styles.readTime}>20 min read • Updated Jan 2025</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <Feather name="share" size={20} color="#1f275c" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.heroImageContainer}>
            <Image
              source={require('@/assets/images/overview.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroText}>Your Complete Guide to US University Applications</Text>
            </View>
          </View>
          
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewText}>
              Harvard, Stanford, MIT…. We've all heard of these global powerhouses of American Universities, the ultimate goal for talented aspiring students. But how exactly, as a student in Canada, do you apply for these prestigious institutions?
            </Text>
            <Text style={styles.overviewText}>
              Is just being at the top of your class enough? What do you have to do differently? Is it even possible to go to Harvard as a Canadian?
            </Text>
            <Text style={styles.overviewText}>
              Hopefully, these questions can be answered in SnowTrack's Comprehensive Canada to the United States Overview.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.sectionText}>
              Applying to universities in Canada focuses mostly on grades, specifically your top six Grade 12 U/M courses. However, American universities focus on a holistic view of the student, taking into consideration Grades, Course Rigor, Extracurriculars, Awards, Test Scores, Essays, Letters of Recommendation, and Personality.
            </Text>
            <Text style={styles.sectionText}>
              If grades account for 70% of your application in Top Canadian Programs, those same grades account for maybe 10-15% for Top American Universities. Applying to top American schools isn't necessarily harder, but it is fundamentally different. Focusing entirely on your grades is no longer sufficient, and can end up getting you rejected from almost every top American university. Being excellent both in and outside of school is the most consistent ticket to the United States.
            </Text>
            <Text style={styles.infographicNote}>→ Infographic on what Canadian Schools look at vs US Schools</Text>
            <Text style={styles.sectionText}>
              Before we get started on academics however, we must first consider the affordability of American schools.
            </Text>
            <Text style={styles.sectionText}>
              While post-secondary in Canada is relatively affordable, college in the States can cost up to $600,000 Canadian dollars. Please familiarize yourself with important Finances Information before continuing.
            </Text>
          </View>

          <View style={styles.sectionsList}>
            <Text style={styles.sectionsTitle}>Sections</Text>
            <Text style={styles.sectionItem}>• What do American Universities Consider?</Text>
            <Text style={styles.sectionItem}>• Am I Disadvantaged as a Canadian Student?</Text>
            <Text style={styles.sectionItem}>• CommonApp vs OUAC</Text>
            <Text style={styles.sectionItem}>• Is the United States Worth It?</Text>
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarLogo: {
    width: 32,
    height: 32,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Lato-Bold',
  },
  readTime: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Lato-Regular',
  },
  shareButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 32,
  },
  overviewContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  overviewText: {
    fontSize: 18,
    color: '#25304A',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 26,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#b6d7f2',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25304A',
    marginBottom: 16,
    fontFamily: 'Lato-Bold',
    textAlign: 'left',
  },
  sectionText: {
    fontSize: 16,
    color: '#25304A',
    fontFamily: 'Lato-Regular',
    textAlign: 'left',
    marginBottom: 16,
    lineHeight: 24,
  },
  infographicNote: {
    fontSize: 16,
    color: '#2563eb',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  sectionsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#b6d7f2',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  sectionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25304A',
    marginBottom: 16,
    fontFamily: 'Lato-Bold',
    textAlign: 'left',
  },
  sectionItem: {
    fontSize: 16,
    color: '#25304A',
    fontFamily: 'Lato-Regular',
    textAlign: 'left',
    marginBottom: 8,
    lineHeight: 24,
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
}); 