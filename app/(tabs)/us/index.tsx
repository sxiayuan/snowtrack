import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Image, Animated, Pressable, View, Text, ScrollView, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const SWITCH_WORDS = [
  'Ivy League Schools',
  'Stanford',
  'MIT',
  'Top US Universities',
  'UC Berkeley',
  'Caltech',
  'Duke',
];

function AnimatedSwitchingWord() {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
      setIndex((prev) => (prev + 1) % SWITCH_WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.Text style={[styles.animatedWord, { opacity: fadeAnim }]}> 
      {SWITCH_WORDS[index]}
    </Animated.Text>
  );
}

const CATEGORIES = [
  { icon: 'book-open', label: 'Overview' },
  { icon: 'edit', label: 'Test Scores' },
  { icon: 'zap', label: 'Applications' },
  { icon: 'flag', label: 'US vs CA' },
  { icon: 'dollar-sign', label: 'Finances' },
  { icon: 'target', label: '1-on-1' },
  { icon: 'clipboard', label: 'CommonApp' },
  { icon: 'calendar', label: 'Upcoming' },
  { icon: 'bar-chart-2', label: 'Data' },
  { icon: 'briefcase', label: 'Business' },
];

// Simple Quiz Component
function MiniQuiz({ router }: { router: any }) {
  const [step, setStep] = useState<'start' | 'question' | 'result'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  
  const questions = [
    {
      text: 'Are you able to pay full tuition (~600,000 CAD) for four years of undergraduate study?',
      info: 'US universities typically cost $50,000-80,000 USD per year, including tuition, room, board, and fees. This is significantly higher than Canadian universities.'
    },
    {
      text: 'Do you enjoy meeting new people from different backgrounds?',
      info: 'US universities are incredibly diverse, with students from all over the world. You\'ll interact with people from different cultures, languages, and perspectives daily.'
    },
    {
      text: 'Are you open to new academic challenges?',
      info: 'US education emphasizes critical thinking, class participation, and interdisciplinary learning. You\'ll be expected to contribute actively in discussions and take on leadership roles.'
    },
    {
      text: 'Are you applying for Top American Universities, such as Harvard, Princeton or Yale?',
      info: 'Top-tier universities often have more generous financial aid packages and larger endowments. They may offer need-blind admissions and meet 100% of demonstrated financial need for international students.'
    }
  ];
  
  const startQuiz = () => setStep('question');
  const restartQuiz = () => {
    setStep('start');
    setCurrentQuestion(0);
    setAnswers([]);
    setShowInfo(false);
  };
  
  const answerQuestion = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setShowInfo(false);
    
    // Simplified and fixed branching logic
    if (currentQuestion === 0) {
      if (answer === 'Yes') {
        // Yes to tuition -> go to question 1 (diversity)
        setCurrentQuestion(1);
      } else {
        // No to tuition -> go to question 3 (top universities)
        setCurrentQuestion(3);
      }
    } else if (currentQuestion === 1) {
      // After diversity question, go to academic challenges
      setCurrentQuestion(2);
    } else {
      // For question 2 or 3, show result
      setStep('result');
    }
  };
  
  const getResult = () => {
    // If they answered No to tuition and then answered the top universities question
    if (answers[0] === 'No') {
      return "American education may be financially challenging for you. You can still apply, but be warned: It is significantly harder to land top schools while seeking financial aid.";
    }
    
    // For the Yes path (tuition -> diversity -> academic challenges)
    const yesCount = answers.filter(a => a === 'Yes').length;
    if (yesCount >= 2) return "You're a great fit for studying in the US!";
    if (yesCount >= 1) return "You might enjoy studying in the US, but think about your comfort with change.";
    return "Studying abroad can be challenging. Reflect on your goals and support systems.";
  };
  
  const renderContent = () => {
    const containerStyle = {
      width: 480,
      alignSelf: 'center' as const,
      backgroundColor: '#fff',
      borderRadius: 18,
      paddingVertical: 32,
      paddingHorizontal: 32,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      margin: 0
    };
    
    if (step === 'start') {
      return (
        <View style={containerStyle}>
          <Text style={{ fontSize: 24, color: '#34495E', textAlign: 'center', marginBottom: 32, fontFamily: 'Lato-Regular' }}>
            Take this quick quiz to see if studying in the United States is right for you. It only takes a few minutes!
          </Text>
          <Pressable
            onPress={startQuiz}
            style={{ backgroundColor: '#004E89', borderRadius: 20, paddingVertical: 16, paddingHorizontal: 32, alignItems: 'center' }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Start Quiz</Text>
          </Pressable>
        </View>
      );
    }
    
    if (step === 'question') {
      return (
        <View style={containerStyle}>
          <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 16, textAlign: 'center', color: '#1E2A57' }}>
            {questions[currentQuestion].text}
          </Text>
          
          <Pressable
            onPress={() => setShowInfo(!showInfo)}
            style={{
              backgroundColor: '#e6f2fb',
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginBottom: 20,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#b6d7f2',
            }}
          >
            <Text style={{ color: '#004E89', fontWeight: 'bold', fontSize: 14 }}>
              {showInfo ? 'Hide Info' : 'Learn More'}
            </Text>
          </Pressable>
          
          {showInfo && (
            <View style={{
              backgroundColor: '#f8fafc',
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
              borderLeftWidth: 4,
              borderLeftColor: '#004E89',
            }}>
              <Text style={{ color: '#2E2E2E', fontSize: 16, lineHeight: 22 }}>
                {questions[currentQuestion].info}
              </Text>
              {currentQuestion === 0 && (
                <Pressable
                  onPress={() => router.replace('/us/finances')}
                  style={{
                    marginTop: 12,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    backgroundColor: '#004E89',
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>
                    Learn More About Finances →
                  </Text>
                </Pressable>
              )}
            </View>
          )}
          
          {['Yes', 'No'].map((option, idx) => (
            <Pressable
              key={idx}
              onPress={() => answerQuestion(option)}
              style={{
                backgroundColor: '#f0f8f8',
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: '#b6d7f2',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#2E2E2E', fontWeight: 'bold', fontSize: 18 }}>{option}</Text>
            </Pressable>
          ))}
        </View>
      );
    }
    
    if (step === 'result') {
      return (
        <View style={{...containerStyle, backgroundColor: '#e6f2fb'}}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#004E89', marginBottom: 24 }}>Result</Text>
          <Text style={{ fontSize: 24, color: '#2E2E2E', textAlign: 'center', marginBottom: 32 }}>{getResult()}</Text>
                      <Pressable
              onPress={restartQuiz}
              style={{ backgroundColor: '#004E89', borderRadius: 20, paddingVertical: 16, paddingHorizontal: 32, alignItems: 'center' }}
            >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Restart</Text>
          </Pressable>
        </View>
      );
    }
  };
  
  return (
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', minHeight: 0, paddingTop: 0, paddingBottom: 0, marginTop: 12, marginBottom: 0, height: 'auto' }}>
                      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1E2A57', marginBottom: 8, textAlign: 'center', fontFamily: 'Lato-Bold' }}>
          Are you a <Text style={{ color: '#000000' }}>Good Fit</Text> for Studying in the U.S.?
        </Text>
        <View style={styles.headingDivider} />
      {renderContent()}
    </View>
  );
}

// Category Card Component to fix state-in-render issue
function CategoryCard({ category, router }: { category: { icon: string; label: string }; router: any }) {
  const [hovered, setHovered] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  
  const handleHoverIn = () => {
    setHovered(true);
    Animated.spring(scale, {
      toValue: 1.08,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };
  
  const handleHoverOut = () => {
    setHovered(false);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View
      style={{ transform: [{ scale }], marginHorizontal: 12, marginVertical: 2 }}
    >
      <Pressable
        style={styles.categoryCard}
                                onPress={() => {
          if (category.label === 'Overview') {
            router.replace('/us/overview');
          } else if (category.label === 'Early Applications') {
            router.replace('/us/earlyApplications');
          } else {
            router.replace({ pathname: '/us/[slug]', params: { slug: category.label.toLowerCase().replace(/[^a-z0-9]+/g, '-') } });
          }
        }}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
      >
        <View style={styles.iconContainer}>
          <Feather name={category.icon as any} size={28} color="#004E89" strokeWidth={2} />
        </View>
        <Text style={styles.categoryLabel}>{category.label}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function USScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter categories based on search query
  const filteredCategories = searchQuery.trim() === '' 
    ? CATEGORIES 
    : CATEGORIES.filter(category => 
        category.label.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    // Immediate blur response for better UX
    setIsSearchFocused(false);
  };

  const handleCategorySelect = (category: { icon: string; label: string }) => {
    setSearchQuery(category.label);
    setIsSearchFocused(false);
    
    // Navigate to the appropriate page based on the category
    if (category.label === 'Overview') {
      router.replace('/us/overview');
    } else if (category.label === 'Finances') {
      router.replace('/us/finances');
    } else if (category.label === 'Test Scores') {
      router.replace('/us/test-scores');
    } else if (category.label === 'Applications') {
      router.replace('/us/earlyApplications');
    } else if (category.label === 'US vs CA') {
      router.replace('/us/why-america');
    } else if (category.label === '1-on-1') {
      router.replace('/us/1-on-1');
    } else if (category.label === 'CommonApp') {
      router.replace('/us/commonApp');
    } else if (category.label === 'Upcoming') {
      router.replace('/us/upcoming');
    } else if (category.label === 'Data') {
      router.replace('/us/data');
    } else if (category.label === 'Business') {
      router.replace('/us/business');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#A6D3F2' }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop} />
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.logo}>
              <Image
                source={require('@/assets/images/SnowTrackTransparent.png')}
                style={styles.headerLogo}
                resizeMode="contain"
                fadeDuration={0}
              />
            </View>
            <View style={styles.brand}>
              <Text style={styles.brandName}>Snowtrack</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerBottom} />
      </View>
      
      {/* Main Area */}
      <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: '#b6d7f2' }}>
        <View style={[styles.centeredContent, { marginTop: 150 }]}>
          <Text style={styles.bigHeading}>
            Applying to <AnimatedSwitchingWord /> can be hard
          </Text>
          <Text style={styles.subHeading}>Let's get on the right track</Text>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBarInner}>
              <Feather name="search" size={20} color="#004E89" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="What are you looking for?"
                placeholderTextColor="#b0b8c1"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                underlineColorAndroid="transparent"
              />
            </View>
            
            {/* Search Dropdown */}
            {isSearchFocused && (
              <View style={styles.searchDropdown}>
                {searchQuery.trim() === '' ? (
                  // Show popular suggestions when no search query
                  <>
                    <View style={styles.dropdownHeader}>
                      <Text style={styles.dropdownHeaderText}>Popular searches</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleCategorySelect({ icon: 'book-open', label: 'Overview' })}
                    >
                      <Text style={styles.dropdownText}>Overview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleCategorySelect({ icon: 'dollar-sign', label: 'Finances' })}
                    >
                      <Text style={styles.dropdownText}>Finances</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleCategorySelect({ icon: 'edit', label: 'Test Scores' })}
                    >
                      <Text style={styles.dropdownText}>Test Scores</Text>
                    </TouchableOpacity>
                  </>
                ) : filteredCategories.length > 0 ? (
                  // Show top 2 filtered results
                  filteredCategories.slice(0, 2).map((category) => (
                    <TouchableOpacity
                      key={category.label}
                      style={styles.dropdownItem}
                      onPress={() => handleCategorySelect(category)}
                    >
                      <Text style={styles.dropdownText}>{category.label}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.dropdownItem}>
                    <Text style={styles.dropdownText}>No results found</Text>
                  </View>
                )}
              </View>
            )}
          </View>
          
          <View style={styles.categoriesGrid}>
            {[0, 1].map(row => (
              <View key={row} style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                {CATEGORIES.slice(row * 5, row * 5 + 5).map((cat) => (
                  <CategoryCard key={cat.label} category={cat} router={router} />
                ))}
              </View>
            ))}
          </View>
          <MiniQuiz router={router} />
        </View>
        
        {/* Footer */}
        <View style={{ width: '100%', backgroundColor: '#fff' }}>
          <View style={[styles.footer, { marginTop: 0, backgroundColor: '#fff' }]}> 
            <View style={styles.footerLeft}>
              <View style={styles.footerLogoRow}>
                <Image source={require('@/assets/images/SnowTrackTransparent.png')} style={styles.footerLogo} resizeMode="contain" fadeDuration={0} />
                <Text style={styles.footerBrand}>Snowtrack</Text>
              </View>
              <View style={styles.footerLinksRow}>
                <View style={styles.footerCol}>
                  <Text style={styles.footerColTitle}>About</Text>
                  <Text style={styles.footerLink}>Our Promises</Text>
                  <Text style={styles.footerLink}>Our Community</Text>
                </View>
                <View style={styles.footerCol}>
                  <Text style={styles.footerColTitle}>Legal</Text>
                  <Text style={styles.footerLink}>Terms of Service</Text>
                  <Text style={styles.footerLink}>Privacy Policy</Text>
                </View>
              </View>
            </View>
            <View style={styles.footerRight}>
              <View style={styles.footerSocialRow}>
                <Feather name="music" size={20} color="#1f275c" style={styles.footerSocialIcon} />
                <Feather name="camera" size={20} color="#1f275c" style={styles.footerSocialIcon} />
                <Feather name="link" size={20} color="#1f275c" style={styles.footerSocialIcon} />
              </View>
              <Text style={styles.footerContact}>Contact Us</Text>
              <Text style={styles.footerCopyright}>© Snowtrack 2025</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A6D3F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    color: '#1f275c',
    fontFamily: 'Lato-Bold',
  },
  beta: {
    fontSize: 12,
    color: '#4ccfff',
    textDecorationLine: 'underline',
    marginLeft: 4,
    fontFamily: 'Lato-Regular',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  navIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  navText: {
    fontSize: 14,
    color: '#1f275c',
    fontFamily: 'Lato-Regular',
  },
  signInButton: {
    backgroundColor: '#4ccfff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  headerBottom: {
    height: 2,
    backgroundColor: '#4ccfff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: 'transparent',
    padding: 0,
    marginTop: 80,
  },
  mainLogo: {
    width: 360,
    height: 360,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  heading: {
    color: '#333',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  subheading: {
    color: '#666',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 28,
    fontFamily: 'Lato-Regular',
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
    gap: 18,
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
  button: {
    width: '100%',
    backgroundColor: '#B6F3FF',
    borderRadius: 24,
    paddingVertical: 18,
    marginBottom: 0,
    alignItems: 'center',
    marginTop: 0,
    borderWidth: 0,
    shadowColor: '#B6F3FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#111',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Lato-Bold',
  },
  mainContentBg: {
    backgroundColor: 'transparent',
    borderRadius: 32,
    paddingVertical: 48,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 64,
    marginBottom: 32,
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
  },
  footer: {
    width: '100%',
    backgroundColor: '#e6f2fb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 32,
    paddingVertical: 24,
    marginTop: 48,
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
  },
  footerLink: {
    color: '#1f275c',
    marginBottom: 4,
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
    marginRight: 8,
  },
  footerContact: {
    color: '#1f275c',
    marginBottom: 4,
  },
  footerCopyright: {
    color: '#1f275c',
    fontSize: 13,
    marginTop: 8,
  },
  bigHeading: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1E2A57',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Lato-Bold',
  },
  headingDivider: {
    width: 120,
    height: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 1,
  },
  subHeading: {
    fontSize: 26,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Lato-Regular',
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 48,
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  searchBarContainer: {
    width: 480,
    maxWidth: '90%',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10000,
  },
  searchBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingHorizontal: 18,
    paddingVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    // Soft inner shadow (web only)
    boxShadow: 'inset 0 2px 8px #e0eafc',
  },
  searchBar: {
    display: 'none', // replaced by searchBarContainer and searchBarInner
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#1a365d',
    fontFamily: 'Lato-Regular',
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontStyle: 'italic',
  },
  animatedWord: {
    fontWeight: 'bold',
    color: '#1E2A57',
    fontSize: 48,
    fontFamily: 'Lato-Bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 32,
    marginBottom: 32,
    position: 'relative',
    zIndex: 1,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 110,
    marginHorizontal: 12,
    marginVertical: 2,
    shadowColor: '#b6d7f2',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    width: 40,
    height: 40,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#2E2E2E',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  articleContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginTop: 32,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#b6d7f2',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  articleHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 10,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  articleText: {
    fontSize: 16,
    color: '#2E2E2E',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  articleSectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E2E2E',
    marginTop: 24,
    marginBottom: 8,
    fontFamily: 'Lato-Bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: '#2E2E2E',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    marginBottom: 8,
  },
  noResultsHint: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  searchDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    zIndex: 9999,
    maxHeight: 300,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#2E2E2E',
    fontFamily: 'Lato-Regular',
    flex: 1,
  },
  dropdownHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownHeaderText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

});
