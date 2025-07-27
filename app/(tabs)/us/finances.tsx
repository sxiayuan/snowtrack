import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Animated, Share, Pressable } from 'react-native';
import { useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function FinancesPage() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;
  
  // Section refs for navigation
  const financialBarrierRef = useRef<View>(null);
  const columbiaExampleRef = useRef<View>(null);
  const needBlindRef = useRef<View>(null);
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      const url = 'https://snowtrack.app/us/finances';
      const message = 'Check out this guide on how to finance your American education: ' + url;
      
      const result = await Share.share({
        message: message,
        url: url,
        title: 'How to Finance your American Education'
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
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
        <Text style={styles.headerTitle}>Finances</Text>
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
        <Text style={styles.title}>How to Finance your American Education</Text>
        <Text style={styles.subtitle}>Understanding the financial barriers and realities of studying in the United States</Text>
        
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
              <Text style={styles.readTime}>8 min read • Updated Jan 2025</Text>
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
            <TouchableOpacity onPress={() => scrollToSection(financialBarrierRef)} style={styles.tocLink}>
              <Text style={styles.tocLinkText}>Financial Barrier</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection(columbiaExampleRef)} style={styles.tocLink}>
              <Text style={styles.tocLinkText}>Columbia Example</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection(needBlindRef)} style={styles.tocLink}>
              <Text style={styles.tocLinkText}>Need-Blind Schools</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.heroImageContainer}>
          <Image
            source={require('@/assets/images/finances.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroText}>The Real Cost of Studying in the US</Text>
          </View>
        </View>
        
        <View ref={financialBarrierRef} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>The Financial Barrier</Text>
          <Text style={styles.description}>
            Finances is the most prevalent barrier to seeking higher education in the United States. Compared to tuition at domestic schools, studying in the states can cost up to 10x more, totaling up to <Text style={styles.cadHighlight}>$400,000 CAD</Text>. Factoring in the cost of living, the total cost of pursuing a degree at a top American university goes up to <Text style={styles.cadHighlight}>$500,000 CAD+</Text>.
          </Text>
        </View>

        <View ref={columbiaExampleRef} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Real Example: Columbia University</Text>
          <Text style={styles.description}>
            Take Columbia University for example. Their current cost of attendance comes out to $93,417 USD for the 2024-25 school year.{'\n\n'}
            <Text style={styles.sourceText}>Source: https://undergrad.admissions.columbia.edu/affordability/cost</Text>{'\n\n'}
            That comes out to <Text style={styles.cadHighlight}>$128,294.24 CAD</Text>. Assuming a 10% increase in COS (Cost of Attendance) year over year, the total bill for your Columbia degree would come out to <Text style={styles.cadHighlight}>$580,612.42 CAD</Text>.
          </Text>
          
          <View style={styles.costTable}>
            <Text style={styles.tableTitle}>2024-2025 Cost of Attendance</Text>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Tuition and fees:</Text>
              <Text style={styles.tableValue}>$71,170</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>New student fees:</Text>
              <Text style={styles.tableValue}>$675</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Housing and food:</Text>
              <Text style={styles.tableValue}>$17,580</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Books, personal expenses and transportations:</Text>
              <Text style={styles.tableValue}>$3,992</Text>
            </View>
            <View style={styles.tableRowTotal}>
              <Text style={styles.tableLabelTotal}>Total budget:</Text>
              <Text style={styles.tableValueTotal}>$93,417</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Need-Aware vs Need-Blind Institutions</Text>
          <Text style={styles.description}>
            <Text style={styles.boldText}>Need-Aware Schools:</Text>{'\n'}
            Some schools consider your ability to pay in their admission processes. These schools are known as "need-aware", and can provide unique advantages and disadvantages for Canadian students. At need-aware institutions, if you are unable to pay the near 600,000 dollars the school requires, you will be at a massive disadvantage for admissions. If you are able to pay the full tuition, making you a "full-pay" student, you will have a unique advantage in admissions. At most need-aware schools, requiring financial aid as an international student effectively drops your chance of acceptance to zero.{'\n\n'}
            <Text style={styles.boldText}>Need-Blind Schools:</Text>{'\n'}
            Similarly, some schools do not consider your ability to pay in their admission processes. These schools are known as "need-blind", and are the best opportunity for students who require financial aid. Similarly, if you are able to pay full tuition, your unique wealth advantage is now non-effective.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>The Reality for International Students</Text>
          <Text style={styles.description}>
            While almost every prestigious institution is need-blind domestically, there are only eleven schools who are need-blind for international students. With an additional two schools that are need-blind for Canadian students, requiring financial aid effectively limits your application pool to thirteen schools.
          </Text>
        </View>

        <View ref={needBlindRef} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Need-Blind for ALL International Students</Text>
          <Text style={styles.description}>
            • Amherst College{'\n'}
            • Bowdoin College{'\n'}
            • Brown University{'\n'}
            • Dartmouth College{'\n'}
            • Georgetown University{'\n'}
            • Harvard University{'\n'}
            • Massachusetts Institute of Technology{'\n'}
            • Princeton University{'\n'}
            • University of Notre Dame{'\n'}
            • Washington and Lee University{'\n'}
            • Yale University
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Need-Blind for Canadian Students</Text>
          <Text style={styles.description}>
            • University of Pennsylvania{'\n'}
            • University of Rochester
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Key Takeaway</Text>
          <Text style={styles.description}>
            If the COS for your school is too high, you will have to apply for need-based financial aid. Financial aid can alleviate the cost burden of your post-secondary degree, but may come with disadvantages in the application process.
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
  engagementMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metricIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  metricValue: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Lato-Regular',
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 18,
    color: '#6b7280',
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
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 32,
    marginBottom: 20,
    fontFamily: 'Lato-Bold',
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  costLabel: {
    fontSize: 16,
    color: '#25304A',
    fontFamily: 'Lato-Regular',
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    fontFamily: 'Lato-Bold',
  },
  totalCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#2563eb',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25304A',
    fontFamily: 'Lato-Bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    fontFamily: 'Lato-Bold',
  },
  highlightText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    textAlign: 'center',
    marginVertical: 12,
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
  cadHighlight: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  italicText: {
    fontStyle: 'italic',
    fontFamily: 'Lato-Italic',
  },
  sourceText: {
    fontSize: 14,
    color: '#000000',
    fontStyle: 'italic',
    fontFamily: 'Lato-Italic',
  },
  textBox: {
    backgroundColor: '#f8faff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d8d8d8',
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
  costTable: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tableLabel: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Lato-Regular',
    flex: 1,
  },
  tableValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2563eb',
    fontFamily: 'Lato-Bold',
  },
  tableRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#2563eb',
  },
  tableLabelTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Lato-Bold',
  },
  tableValueTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc2626',
    fontFamily: 'Lato-Bold',
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
  footerWrapper: {
    width: '100%',
    marginLeft: -24,
    marginRight: -24,
    backgroundColor: '#e6f2fb',
    position: 'relative',
    left: 0,
    right: 0,
  },
  footer: {
    width: '100%',
    backgroundColor: '#e6f2fb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  footerLeft: {
    flex: 1,
  },
  footerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLogo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  footerBrand: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f275c',
    fontFamily: 'Lato-Bold',
  },
  footerLinksRow: {
    flexDirection: 'row',
    gap: 48,
  },
  footerCol: {
    marginRight: 32,
  },
  footerColTitle: {
    fontWeight: 'bold',
    color: '#1f275c',
    marginBottom: 8,
    fontFamily: 'Lato-Bold',
  },
  footerLink: {
    color: '#1f275c',
    marginBottom: 4,
    fontFamily: 'Lato-Regular',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerSocialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  footerSocialIcon: {
    fontSize: 18,
    color: '#1f275c',
    marginRight: 8,
  },
  footerContact: {
    color: '#1f275c',
    marginBottom: 4,
    fontFamily: 'Lato-Regular',
  },
  footerCopyright: {
    color: '#1f275c',
    fontSize: 13,
    marginTop: 8,
    fontFamily: 'Lato-Regular',
  },
}); 