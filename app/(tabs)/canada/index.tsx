import { StyleSheet, TouchableOpacity, Image, Animated, Pressable, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function CanadaScreen() {
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

  const handleBusinessPress = () => {
    router.push('/canada/business');
  };
  const handleMedPress = () => {
    router.push('/canada/med');
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
        </View>
        <View style={styles.headerBottom} />
      </View>
      {/* Main Area */}
      <View style={{ flex: 1, backgroundColor: '#b6d7f2', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <View style={styles.centeredContent}>
          <Text style={styles.bigHeading}>Extracurriculars & Enrichment</Text>
          <Text style={styles.subHeading}>Top Opportunities Curated by College Experts</Text>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Search by interest, name...</Text>
          </View>
        </View>
      </View>
      {/* Footer */}
      <View style={[styles.footer, { marginTop: 0 }]}>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    width: 480,
    maxWidth: '90%',
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    fontSize: 22,
    color: '#b6d7f2',
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#b0b8c1',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
});
