import { StyleSheet, TouchableOpacity, Image, Animated, Pressable, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function CanadaScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#A6D3F2' }}>
      {/* Main Area */}
      <View style={{ flex: 1, backgroundColor: '#b6d7f2', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <View style={styles.centeredContent}>
          <View style={styles.comingSoonContainer}>
            <Text style={styles.comingSoonText}>COMING SOON</Text>
            <Text style={styles.comingSoonSubtext}>Canadian University Resources</Text>
            <Text style={styles.comingSoonDescription}>
              We're working hard to bring you comprehensive guides for Canadian universities, 
              including business programs, medical school applications, and more.
            </Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.progressText}>Development in Progress</Text>
            </View>
          </View>
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
  comingSoonContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    maxWidth: 500,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  comingSoonText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#25304A',
    fontFamily: 'Lato-Bold',
    marginBottom: 16,
    letterSpacing: 2,
  },
  comingSoonSubtext: {
    fontSize: 24,
    color: '#4ccfff',
    fontFamily: 'Lato-Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  comingSoonDescription: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#4ccfff',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
  },
});
