import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Image, Animated, Pressable, View, Text, ScrollView, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';

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
  { icon: '🔍', label: 'Browse All' },
  { icon: '⛵', label: 'Test Scores' },
  { icon: '🏫', label: 'Awards' },
  { icon: '🏆', label: 'Why America?' },
  { icon: '🐷', label: 'Free' },
  { icon: '👥', label: '1-on-1' },
  { icon: '🎖️', label: 'Selective' },
  { icon: '📅', label: 'Upcoming' },
  { icon: '🧬', label: 'STEM' },
  { icon: '🤝', label: 'Business' },
];

// MiniQuiz component: decision tree, one question at a time
function MiniQuiz() {
  const tree = [
    {
      question: 'Are you interested in studying in a new country?',
      options: [
        { text: 'Yes', next: 1 },
        { text: 'Not sure', next: 2 },
        { text: 'No', next: 'not-fit' },
      ],
    },
    {
      question: 'Do you enjoy meeting new people from different backgrounds?',
      options: [
        { text: 'Yes', next: 'fit' },
        { text: 'Sometimes', next: 'maybe-fit' },
        { text: 'No', next: 'not-fit' },
      ],
    },
    {
      question: 'Are you open to new academic challenges?',
      options: [
        { text: 'Yes', next: 'fit' },
        { text: 'Maybe', next: 'maybe-fit' },
        { text: 'No', next: 'not-fit' },
      ],
    },
  ];
  const [current, setCurrent] = React.useState<number | string>(0); // index in tree or result string
  const [path, setPath] = React.useState<Array<{q: number, a: number}>>([]);
  const restartQuiz = () => {
    setCurrent(0);
    setPath([]);
  };
  let content;
  if (typeof current === 'string') {
    let result = '';
    if (current === 'fit') result = "You're a great fit for studying in the US!";
    else if (current === 'maybe-fit') result = "You might enjoy studying in the US, but think about your comfort with change.";
    else result = "Studying abroad can be challenging. Reflect on your goals and support systems.";
    content = (
      <View style={{ marginTop: 16, backgroundColor: '#e6f2fb', borderRadius: 18, padding: 28, alignItems: 'center', width: 340 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#2563eb', marginBottom: 12 }}>Result</Text>
        <Text style={{ fontSize: 17, color: '#25304A', textAlign: 'center', marginBottom: 16 }}>{result}</Text>
        <Pressable
          onPress={restartQuiz}
          style={{ backgroundColor: '#2563eb', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 28, marginTop: 6 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Restart</Text>
        </Pressable>
      </View>
    );
  } else {
    const q = tree[current];
    content = (
      <View style={{ width: 340, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 18, paddingVertical: 24, paddingHorizontal: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 2 }, elevation: 3, minHeight: 0, height: 'auto', margin: 0 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 18, textAlign: 'center', color: '#25304A' }}>{q.question}</Text>
        {q.options.map((opt, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              setPath([...path, { q: current, a: idx }]);
              setCurrent(opt.next);
            }}
            style={{
              backgroundColor: '#f0f8f8',
              borderRadius: 16,
              paddingVertical: 12,
              paddingHorizontal: 18,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#b6d7f2',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#25304A', fontWeight: 'bold', fontSize: 16 }}>{opt.text}</Text>
          </Pressable>
        ))}
      </View>
    );
  }
  return (
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', minHeight: 0, paddingTop: 0, paddingBottom: 0, marginTop: 12, marginBottom: 0, height: 'auto' }}>
      {content}
    </View>
  );
}

export default function USScreen() {
  const router = useRouter();
  const canadaScale = useRef(new Animated.Value(1)).current;
  const medScale = useRef(new Animated.Value(1)).current;

  const animateIn = (scaleRef: Animated.Value) => {
    Animated.spring(scaleRef, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };
  const animateOut = (scaleRef: Animated.Value) => {
    Animated.spring(scaleRef, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
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
              />
            </View>
            <View style={styles.brand}>
              <Text style={styles.brandName}>Snowtrack</Text>
            </View>
          </View>
          {/* Removed headerRight section with Find, Lists, and Sign In buttons */}
        </View>
        <View style={styles.headerBottom} />
      </View>
      {/* Main Area */}
      <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: '#b6d7f2' }}>
        <View style={[styles.centeredContent, { marginTop: 180 }]}>
          <Text style={styles.bigHeading}>
            Applying to <AnimatedSwitchingWord /> can be hard
          </Text>
          <Text style={styles.subHeading}>Let's get on the right track</Text>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBarInner}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by interest, name..."
                placeholderTextColor="#b0b8c1"
                autoFocus
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={styles.categoriesGrid}>
            {[0, 1].map(row => (
              <View key={row} style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                {CATEGORIES.slice(row * 5, row * 5 + 5).map((cat, i) => {
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
                      key={cat.label}
                      style={{ transform: [{ scale }], marginHorizontal: 12, marginVertical: 2 }}
                    >
                      <Pressable
                        style={styles.categoryCard}
                        onPress={() => router.push({ pathname: '/us/[slug]', params: { slug: cat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-') } })}
                        onHoverIn={handleHoverIn}
                        onHoverOut={handleHoverOut}
                      >
                        <Text style={styles.categoryIcon}>{cat.icon}</Text>
                        <Text style={styles.categoryLabel}>{cat.label}</Text>
                      </Pressable>
                    </Animated.View>
                  );
                })}
              </View>
            ))}
          </View>
          <MiniQuiz />
          {/* White section removed */}
        </View>
        {/* Footer (now inside ScrollView) */}
        <View style={{ width: '100%', backgroundColor: '#fff' }}>
          <View style={[styles.footer, { marginTop: 0, backgroundColor: '#fff' }]}> 
          <View style={styles.footerLeft}>
            <View style={styles.footerLogoRow}>
              <Image source={require('@/assets/images/SnowTrackTransparent.png')} style={styles.footerLogo} resizeMode="contain" />
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
              <Text style={styles.footerSocialIcon}>🎵</Text>
              <Text style={styles.footerSocialIcon}>📸</Text>
              <Text style={styles.footerSocialIcon}>🔗</Text>
            </View>
            <Text style={styles.footerContact}>Contact Us</Text>
            <Text style={styles.footerCopyright}>© Snowtrack 2025</Text>
          </View>
        </View>
      </View> {/* Close the footer container */}
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
    fontSize: 18,
    color: '#1f275c',
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
    color: '#25304A',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Lato-Bold',
  },
  subHeading: {
    fontSize: 26,
    color: '#25304A',
    textAlign: 'center',
    marginBottom: 32,
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
    fontSize: 22,
    color: '#b6d7f2',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#25304A',
    fontFamily: 'Lato-Regular',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  animatedWord: {
    fontWeight: 'bold',
    color: '#25304A',
    fontSize: 48,
    fontFamily: 'Lato-Bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 32,
    marginBottom: 16,
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
  },
  categoryIcon: {
    fontSize: 36,
    color: '#2563eb',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#25304A',
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
    color: '#25304A',
    marginBottom: 10,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  articleText: {
    fontSize: 16,
    color: '#25304A',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  articleSectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#25304A',
    marginTop: 24,
    marginBottom: 8,
    fontFamily: 'Lato-Bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});
