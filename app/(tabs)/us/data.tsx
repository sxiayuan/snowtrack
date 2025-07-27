import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Animated, Share, Pressable } from 'react-native';
import { useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import university data directly to avoid import issues
const universities = [
  {
    usNewsRanking: 1,
    universityName: "Princeton University",
    city: "Princeton",
    state: "New Jersey",
    acceptanceRate: 4.3,
    sat25: 1500,
    sat50: 1530,
    sat75: 1560,
    internationalStudentPercentage: 12.2,
  },
  {
    usNewsRanking: 2,
    universityName: "Massachusetts Institute of Technology",
    city: "Cambridge",
    state: "Massachusetts",
    acceptanceRate: 4.8,
    sat25: 1520,
    sat50: 1550,
    sat75: 1570,
    internationalStudentPercentage: 10.0,
  },
  {
    usNewsRanking: 3,
    universityName: "Harvard University",
    city: "Cambridge",
    state: "Massachusetts",
    acceptanceRate: 3.3,
    sat25: 1490,
    sat50: 1540,
    sat75: 1580,
    internationalStudentPercentage: 14.7,
  },
  {
    usNewsRanking: 4,
    universityName: "Stanford University",
    city: "Stanford",
    state: "California",
    acceptanceRate: 3.6,
    sat25: 1510,
    sat50: 1540,
    sat75: 1570,
    internationalStudentPercentage: 14.3,
  },
  {
    usNewsRanking: 5,
    universityName: "Yale University",
    city: "New Haven",
    state: "Connecticut",
    acceptanceRate: 3.7,
    sat25: 1480,
    sat50: 1530,
    sat75: 1560,
    internationalStudentPercentage: 12.0,
  },
  {
    usNewsRanking: 6,
    universityName: "California Institute of Technology",
    city: "Pasadena",
    state: "California",
    acceptanceRate: 2.6,
    sat25: 1530,
    sat50: 1560,
    sat75: 1580,
    internationalStudentPercentage: 14.7,
  },
  {
    usNewsRanking: 6,
    universityName: "Johns Hopkins University",
    city: "Baltimore",
    state: "Maryland",
    acceptanceRate: 7.0,
    sat25: 1530,
    sat50: 1540,
    sat75: 1560,
    internationalStudentPercentage: 14.0,
  },
  {
    usNewsRanking: 6,
    universityName: "Northwestern University",
    city: "Evanston",
    state: "Illinois",
    acceptanceRate: 7.0,
    sat25: 1500,
    sat50: 1530,
    sat75: 1560,
    internationalStudentPercentage: 10.4,
  },
  {
    usNewsRanking: 6,
    universityName: "Duke University",
    city: "Durham",
    state: "North Carolina",
    acceptanceRate: 5.9,
    sat25: 1490,
    sat50: 1525,
    sat75: 1560,
    internationalStudentPercentage: 9.9,
  },
  {
    usNewsRanking: 10,
    universityName: "University of Pennsylvania",
    city: "Philadelphia",
    state: "Pennsylvania",
    acceptanceRate: 5.9,
    sat25: 1500,
    sat50: 1540,
    sat75: 1570,
    internationalStudentPercentage: 13.5,
  },
  {
    usNewsRanking: 11,
    universityName: "University of Chicago",
    city: "Chicago",
    state: "Illinois",
    acceptanceRate: 5.4,
    sat25: 1510,
    sat50: 1540,
    sat75: 1560,
    internationalStudentPercentage: 18.1,
  },
  {
    usNewsRanking: 11,
    universityName: "Cornell University",
    city: "Ithaca",
    state: "New York",
    acceptanceRate: 6.9,
    sat25: 1510,
    sat50: 1540,
    sat75: 1560,
    internationalStudentPercentage: 10.1,
  },
  {
    usNewsRanking: 13,
    universityName: "Columbia University",
    city: "New York City",
    state: "New York",
    acceptanceRate: 4.0,
    sat25: 1510,
    sat50: 1540,
    sat75: 1560,
    internationalStudentPercentage: 16.9,
  },
  {
    usNewsRanking: 13,
    universityName: "Brown University",
    city: "Providence",
    state: "Rhode Island",
    acceptanceRate: 5.4,
    sat25: 1510,
    sat50: 1540,
    sat75: 1560,
    internationalStudentPercentage: 17.7,
  },
  {
    usNewsRanking: 15,
    universityName: "Dartmouth College",
    city: "Hanover",
    state: "New Hampshire",
    acceptanceRate: 6.2,
    sat25: 1480,
    sat50: 1520,
    sat75: 1560,
    internationalStudentPercentage: 11.5,
  },
  {
    usNewsRanking: 15,
    universityName: "University of California, Los Angeles",
    city: "Los Angeles",
    state: "California",
    acceptanceRate: 9.2,
    sat25: 1400,
    sat50: 1450,
    sat75: 1530,
    internationalStudentPercentage: 6.8,
  },
  {
    usNewsRanking: 17,
    universityName: "University of California, Berkeley",
    city: "Berkeley",
    state: "California",
    acceptanceRate: 11.0,
    sat25: 1410,
    sat50: 1470,
    sat75: 1530,
    internationalStudentPercentage: 6.1,
  },
  {
    usNewsRanking: 18,
    universityName: "Rice University",
    city: "Houston",
    state: "Texas",
    acceptanceRate: 7.9,
    sat25: 1500,
    sat50: 1540,
    sat75: 1560,
    internationalStudentPercentage: 12.8,
  },
  {
    usNewsRanking: 18,
    universityName: "Vanderbilt University",
    city: "Nashville",
    state: "Tennessee",
    acceptanceRate: 6.7,
    sat25: 1460,
    sat50: 1520,
    sat75: 1570,
    internationalStudentPercentage: 8.7,
  },
  {
    usNewsRanking: 18,
    universityName: "University of Notre Dame",
    city: "Notre Dame",
    state: "Indiana",
    acceptanceRate: 12.7,
    sat25: 1470,
    sat50: 1510,
    sat75: 1540,
    internationalStudentPercentage: 8.0,
  },
  {
    usNewsRanking: 21,
    universityName: "Carnegie Mellon University",
    city: "Pittsburgh",
    state: "Pennsylvania",
    acceptanceRate: 11.7,
    sat25: 1510,
    sat50: 1540,
    sat75: 1560,
    internationalStudentPercentage: 20.0,
  },
  {
    usNewsRanking: 21,
    universityName: "Washington University in St. Louis",
    city: "St. Louis",
    state: "Missouri",
    acceptanceRate: 12.1,
    sat25: 1500,
    sat50: 1540,
    sat75: 1570,
    internationalStudentPercentage: 12.3,
  },
  {
    usNewsRanking: 21,
    universityName: "University of Michigan, Ann Arbor",
    city: "Ann Arbor",
    state: "Michigan",
    acceptanceRate: 17.9,
    sat25: 1350,
    sat50: 1470,
    sat75: 1530,
    internationalStudentPercentage: 7.0,
  },
  {
    usNewsRanking: 24,
    universityName: "Emory University",
    city: "Atlanta",
    state: "Georgia",
    acceptanceRate: 13.8,
    sat25: 1480,
    sat50: 1510,
    sat75: 1540,
    internationalStudentPercentage: 17.3,
  },
  {
    usNewsRanking: 24,
    universityName: "Georgetown University",
    city: "Washington",
    state: "Washington, D.C",
    acceptanceRate: 12.7,
    sat25: 1400,
    sat50: 1490,
    sat75: 1540,
    internationalStudentPercentage: 8.4,
  },
  {
    usNewsRanking: 24,
    universityName: "University of Virginia",
    city: "Charlottesville",
    state: "Virginia",
    acceptanceRate: 16.8,
    sat25: 1410,
    sat50: 1470,
    sat75: 1520,
    internationalStudentPercentage: 5.2,
  },
  {
    usNewsRanking: 27,
    universityName: "University of Southern California",
    city: "Los Angeles",
    state: "California",
    acceptanceRate: 10.0,
    sat25: 1450,
    sat50: 1490,
    sat75: 1530,
    internationalStudentPercentage: 16.63,
  },
  {
    usNewsRanking: 27,
    universityName: "University of North Carolina at Chapel Hill",
    city: "Chapel Hill",
    state: "North Carolina",
    acceptanceRate: 15.4,
    sat25: 1400,
    sat50: 1470,
    sat75: 1530,
    internationalStudentPercentage: 5.9,
  },
  {
    usNewsRanking: 29,
    universityName: "University of California, San Diego",
    city: "San Diego",
    state: "California",
    acceptanceRate: 24.7,
    sat25: 1350,
    sat50: 1420,
    sat75: 1500,
    internationalStudentPercentage: 5.3,
  },
  {
    usNewsRanking: 30,
    universityName: "New York University",
    city: "New York City",
    state: "New York",
    acceptanceRate: 7.7,
    sat25: 1480,
    sat50: 1520,
    sat75: 1550,
    internationalStudentPercentage: 25.3,
  },
  {
    usNewsRanking: 30,
    universityName: "University of Florida",
    city: "Gainesville",
    state: "Florida",
    acceptanceRate: 23.0,
    sat25: 1320,
    sat50: 1390,
    sat75: 1470,
    internationalStudentPercentage: 2.8,
  },
  {
    usNewsRanking: 30,
    universityName: "University of Texas at Austin",
    city: "Austin",
    state: "Texas",
    acceptanceRate: 31.4,
    sat25: 1230,
    sat50: 1370,
    sat75: 1480,
    internationalStudentPercentage: 2.8,
  },
  {
    usNewsRanking: 33,
    universityName: "University of Illinois Urbana-Champaign",
    city: "Urbana-Champaign",
    state: "Illinois",
    acceptanceRate: 43.7,
    sat25: 1350,
    sat50: 1450,
    sat75: 1510,
    internationalStudentPercentage: 13.1,
  },
  {
    usNewsRanking: 33,
    universityName: "University of California, Davis",
    city: "Davis",
    state: "California",
    acceptanceRate: 42.5,
    sat25: 1280,
    sat50: 1350,
    sat75: 1450,
    internationalStudentPercentage: 6.1,
  },
  {
    usNewsRanking: 33,
    universityName: "Georgia Institute of Technology",
    city: "Atlanta",
    state: "Georgia",
    acceptanceRate: 17.0,
    sat25: 1370,
    sat50: 1470,
    sat75: 1530,
    internationalStudentPercentage: 5.4,
  },
  {
    usNewsRanking: 37,
    universityName: "Tufts University",
    city: "Medford/Somerville",
    state: "Massachusetts",
    acceptanceRate: 9.5,
    sat25: 1480,
    sat50: 1510,
    sat75: 1540,
    internationalStudentPercentage: 13.2,
  },
  {
    usNewsRanking: 37,
    universityName: "Boston College",
    city: "Chestnut Hill",
    state: "Massachusetts",
    acceptanceRate: 19.0,
    sat25: 1430,
    sat50: 1470,
    sat75: 1510,
    internationalStudentPercentage: 6.6,
  },
  {
    usNewsRanking: 37,
    universityName: "University of California, Santa Barbara",
    city: "Santa Barbara",
    state: "California",
    acceptanceRate: 25.6,
    sat25: 1300,
    sat50: 1370,
    sat75: 1450,
    internationalStudentPercentage: 4.7,
  },
  {
    usNewsRanking: 39,
    universityName: "University of Wisconsin–Madison",
    city: "Madison",
    state: "Wisconsin",
    acceptanceRate: 44.2,
    sat25: 1370,
    sat50: 1430,
    sat75: 1490,
    internationalStudentPercentage: 8.5,
  },
  {
    usNewsRanking: 41,
    universityName: "Boston University",
    city: "Boston",
    state: "Massachusetts",
    acceptanceRate: 11.1,
    sat25: 1430,
    sat50: 1470,
    sat75: 1510,
    internationalStudentPercentage: 15.0,
  },
  {
    usNewsRanking: 41,
    universityName: "Rutgers University–New Brunswick",
    city: "New Brunswick",
    state: "New Jersey",
    acceptanceRate: 65.3,
    sat25: 1200,
    sat50: 1280,
    sat75: 1380,
    internationalStudentPercentage: 7.9,
  },
  {
    usNewsRanking: 41,
    universityName: "Ohio State University, Columbus",
    city: "Columbus",
    state: "Ohio",
    acceptanceRate: 48.6,
    sat25: 1260,
    sat50: 1340,
    sat75: 1420,
    internationalStudentPercentage: 2.1,
  },
  {
    usNewsRanking: 44,
    universityName: "University of Rochester",
    city: "Rochester",
    state: "New York",
    acceptanceRate: 39.3,
    sat25: 1420,
    sat50: 1470,
    sat75: 1500,
    internationalStudentPercentage: 24.7,
  },
  {
    usNewsRanking: 44,
    universityName: "University of Maryland, College Park",
    city: "College Park",
    state: "Maryland",
    acceptanceRate: 34.5,
    sat25: 1360,
    sat50: 1450,
    sat75: 1520,
    internationalStudentPercentage: 5.3,
  },
  {
    usNewsRanking: 46,
    universityName: "Purdue University–West Lafayette",
    city: "West Lafayette",
    state: "Indiana",
    acceptanceRate: 49.7,
    sat25: 1210,
    sat50: 1350,
    sat75: 1470,
    internationalStudentPercentage: 15.1,
  },
  {
    usNewsRanking: 46,
    universityName: "University of Washington",
    city: "Seattle",
    state: "Washington",
    acceptanceRate: 22.6,
    sat25: 1333,
    sat50: 1410,
    sat75: 1500,
    internationalStudentPercentage: 13.7,
  },
  {
    usNewsRanking: 46,
    universityName: "Wake Forest University",
    city: "Winston-Salem",
    state: "North Carolina",
    acceptanceRate: 21.6,
    sat25: 1410,
    sat50: 1450,
    sat75: 1500,
    internationalStudentPercentage: 6.5,
  },
  {
    usNewsRanking: 46,
    universityName: "Lehigh University",
    city: "Bethlehem",
    state: "Pennsylvania",
    acceptanceRate: 25.9,
    sat25: 1380,
    sat50: 1430,
    sat75: 1490,
    internationalStudentPercentage: 5.6,
  },
  {
    usNewsRanking: 46,
    universityName: "University of Georgia",
    city: "Athens",
    state: "Georgia",
    acceptanceRate: 42.5,
    sat25: 1230,
    sat50: 1320,
    sat75: 1410,
    internationalStudentPercentage: 1.1,
  },
];

interface University {
  usNewsRanking: number;
  universityName: string;
  city: string;
  state: string;
  acceptanceRate: number;
  sat25?: number;
  sat50?: number;
  sat75?: number;
  internationalStudentPercentage: number;
}

export default function UniversityDataPage() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;
  
  // Section refs for navigation
  const rankingsRef = useRef<View>(null);
  const admissionsRef = useRef<View>(null);
  const satRef = useRef<View>(null);
  
  // Sorting state
  const [sortField, setSortField] = useState<'usNewsRanking' | 'acceptanceRate' | 'sat25' | 'sat50' | 'sat75' | 'internationalStudentPercentage'>('internationalStudentPercentage');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      const url = 'https://snowtrack.app/us/data';
      const message = 'Check out this comprehensive US university data and rankings: ' + url;
      
      const result = await Share.share({
        message: message,
        url: url,
        title: 'US University Data & Rankings'
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

  const handleSort = (field: 'usNewsRanking' | 'acceptanceRate' | 'sat25' | 'sat50' | 'sat75' | 'internationalStudentPercentage') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort universities based on current sort field and direction
  const sortedUniversities = universities ? [...universities].sort((a, b) => {
    let aValue: number | undefined = a[sortField];
    let bValue: number | undefined = b[sortField];
    
    // Handle missing SAT data - put them at the end
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  }) : [];

  // Calculate static statistics based on top 10 by ranking (not affected by sorting)
  const top10ByRanking = universities.slice(0, 10);
  const averageAcceptanceRate = top10ByRanking.length > 0 ? top10ByRanking.reduce((sum, uni) => sum + uni.acceptanceRate, 0) / top10ByRanking.length : 0;
  const averageSAT = top10ByRanking.length > 0 ? 
    top10ByRanking
      .filter(uni => uni.sat50)
      .reduce((sum, uni) => sum + uni.sat50!, 0) / top10ByRanking.filter(uni => uni.sat50).length : 0;


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
        <Text style={styles.headerTitle}>Data</Text>
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
          <Text style={styles.title}>US University Data & Rankings</Text>
          <Text style={styles.subtitle}>Comprehensive statistics and insights about American universities</Text>
          
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
                <Text style={styles.readTime}>15 min read • Updated Jan 2025</Text>
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
              <TouchableOpacity onPress={() => scrollToSection(rankingsRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>University Rankings</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(admissionsRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>Admissions Data</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(satRef)} style={styles.tocLink}>
                <Text style={styles.tocLinkText}>SAT Analysis</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.heroImageContainer}>
            <Image
              source={require('@/assets/images/data.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
          
          <View ref={rankingsRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Top 50 US Universities (US News Rankings)</Text>
            <Text style={styles.description}>
              The following rankings are based on US News & World Report's 2025 National University Rankings. Learn more with data from your dream schools to determine if you are a good fit!
            </Text>
            
            {/* Sort Dropdown */}
            <View style={styles.sortBar}>
              <Text style={styles.sortBarLabel}>Sort by:</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setShowSortDropdown(!showSortDropdown)}
              >
                <Text style={styles.dropdownButtonText}>
                  {sortField === 'usNewsRanking' ? 'Default' :
                   sortField === 'acceptanceRate' ? 'Acceptance Rate' :
                   sortField === 'sat25' ? 'SAT 25th %' :
                   sortField === 'sat50' ? 'SAT 50th %' :
                   sortField === 'sat75' ? 'SAT 75th %' :
                   sortField === 'internationalStudentPercentage' ? 'International %' :
                   'Select...'}
                </Text>
                <Text style={styles.dropdownArrow}>{showSortDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.directionButton}
                onPress={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              >
                <Text style={styles.directionButtonText}>
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </Text>
              </TouchableOpacity>
            </View>
            
            {showSortDropdown && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleSort('usNewsRanking');
                    setShowSortDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>Default</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleSort('acceptanceRate');
                    setShowSortDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>Acceptance Rate</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleSort('sat25');
                    setShowSortDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>SAT 25th %</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleSort('sat50');
                    setShowSortDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>SAT 50th %</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleSort('sat75');
                    setShowSortDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>SAT 75th %</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleSort('internationalStudentPercentage');
                    setShowSortDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>International %</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <View style={styles.rankingsTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.rankHeader}>Rank</Text>
                <Text style={styles.universityHeader}>University</Text>
                <Text style={styles.locationHeader}>Location</Text>
                <Text style={styles.acceptanceHeader}>
                  {sortField === 'sat25' ? 'SAT 25th %' :
                   sortField === 'sat50' ? 'SAT 50th %' :
                   sortField === 'sat75' ? 'SAT 75th %' :
                   sortField === 'internationalStudentPercentage' ? 'International %' :
                   'Acceptance Rate'}
                </Text>
              </View>
              
              {sortedUniversities.length > 0 ? (
                sortedUniversities.slice(0, 20).map((university, index) => (
                  <View key={university.universityName} style={[
                    styles.tableRow,
                    index % 2 === 0 ? { backgroundColor: '#ffffff' } : { backgroundColor: '#f8faff' }
                  ]}>
                    <Text style={styles.rankNumber}>{university.usNewsRanking}</Text>
                    <Text style={styles.universityName}>{university.universityName}</Text>
                    <Text style={styles.location}>{university.city}, {university.state}</Text>
                    <Text style={styles.acceptanceRate}>
                      {sortField === 'sat25' ? (university.sat25 || 'N/A') :
                       sortField === 'sat50' ? (university.sat50 || 'N/A') :
                       sortField === 'sat75' ? (university.sat75 || 'N/A') :
                       sortField === 'internationalStudentPercentage' ? `${university.internationalStudentPercentage}%` :
                       `${university.acceptanceRate}%`}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.tableRow}>
                  <Text style={styles.universityName}>Loading university data...</Text>
                </View>
              )}
            </View>
          </View>

          <View ref={admissionsRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Admissions Statistics</Text>
            <Text style={styles.description}>
              Understanding admission rates and requirements is crucial for Canadian students applying to US universities. These statistics show the competitive nature of top-tier institutions.
            </Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{averageAcceptanceRate.toFixed(1)}%</Text>
                <Text style={styles.statLabel}>Average Acceptance Rate (Top 10)</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{Math.round(averageSAT)}</Text>
                <Text style={styles.statLabel}>Average SAT Score (Top 10)</Text>
              </View>
              

            </View>
            

          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>International Student %</Text>
            <Text style={styles.description}>
              Applying as an international lowers your acceptance rate no matter what top University you are applying to. However, this disadvantage varies school by school. Some institutions have only a slightly decreased acceptance rate for Internationals, while others may nearly exclude internationals completely.
            </Text>
            <Text style={styles.description}>
              Schools may release an international student acceptance rate independent from their overall acceptance rate, but this data is limited to very few institutions. The only other way to estimate how much a school "likes" internationals is by their International Student Percentage.
            </Text>
            <Text style={styles.description}>
              We can deduce that schools with larger international student populations admit more international students. It is important to stay informed at the IS% of any Universities you are applying to.
            </Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{Math.round(universities.reduce((sum, uni) => sum + uni.internationalStudentPercentage, 0) / universities.length)}%</Text>
                <Text style={styles.statLabel}>Average International % (Top 50)</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{Math.max(...universities.map(uni => uni.internationalStudentPercentage))}%</Text>
                <Text style={styles.statLabel}>Highest International % (Top 50)</Text>
              </View>
            </View>
          </View>

          <View ref={satRef} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>SAT Score Analysis</Text>
            <Text style={styles.description}>
              SAT scores are a crucial component of US university applications. Understanding score ranges helps students set realistic targets.
            </Text>
            
            <View style={styles.satTable}>
              <Text style={styles.tableTitle}>SAT Score Ranges by University Tier</Text>
              <View style={styles.satRow}>
                <Text style={styles.satTier}>Top 5 Universities</Text>
                <Text style={styles.satRange}>1500-1580</Text>
              </View>
              <View style={styles.satRow}>
                <Text style={styles.satTier}>Top 10 Universities</Text>
                <Text style={styles.satRange}>1480-1570</Text>
              </View>
              <View style={styles.satRow}>
                <Text style={styles.satTier}>Top 20 Universities</Text>
                <Text style={styles.satRange}>1450-1560</Text>
              </View>
              <View style={styles.satRow}>
                <Text style={styles.satTier}>Top 50 Universities</Text>
                <Text style={styles.satRange}>1350-1520</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Application Strategy Insights</Text>
            <Text style={styles.description}>
              Based on the comprehensive data analysis, here are key strategies for Canadian students applying to US universities:
            </Text>
            
            <View style={styles.strategyList}>
              <View style={styles.strategyItem}>
                <Text style={styles.strategyNumber}>1</Text>
                <Text style={styles.strategyText}>
                  <Text style={styles.boldText}>Target Score Ranges:</Text> Aim for SAT scores in the 75th percentile range for your target universities to maximize admission chances.
                </Text>
              </View>
              
              <View style={styles.strategyItem}>
                <Text style={styles.strategyNumber}>2</Text>
                <Text style={styles.strategyText}>
                  <Text style={styles.boldText}>International-Friendly Schools:</Text> Consider universities with higher international student percentages (15%+) for better chances of admission.
                </Text>
              </View>
              
              <View style={styles.strategyItem}>
                <Text style={styles.strategyNumber}>3</Text>
                <Text style={styles.strategyText}>
                  <Text style={styles.boldText}>Acceptance Rate Reality:</Text> Top 20 universities have acceptance rates below 10%, requiring exceptional applications across all components.
                </Text>
              </View>
              
              <View style={styles.strategyItem}>
                <Text style={styles.strategyNumber}>4</Text>
                <Text style={styles.strategyText}>
                  <Text style={styles.boldText}>Geographic Diversity:</Text> Consider universities in different regions to increase your options and find the best fit for your preferences.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Key Takeaways</Text>
            <Text style={styles.description}>
              • US universities are highly competitive, with acceptance rates below 10% at top institutions{'\n\n'}
              • SAT scores of 1500+ are typically required for top-tier universities{'\n\n'}
              • International student populations vary from 1% to 25% across institutions{'\n\n'}
              • Location and program offerings significantly impact admission competitiveness{'\n\n'}
              • Comprehensive applications require strong academics, extracurriculars, and essays{'\n\n'}
              • Research each institution's specific requirements and international student support
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
  rankingsTable: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8faff',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e1f0ff',
    alignItems: 'center',
    minHeight: 60,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Lato-Bold',
    flex: 1,
  },
  rankHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'Lato-Bold',
    width: 60,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  universityHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'Lato-Bold',
    flex: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  locationHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'Lato-Bold',
    flex: 1,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  acceptanceHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'Lato-Bold',
    width: 160,
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 20,
  },


  sortableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 20,
  },
  sortIndicator: {
    fontSize: 12,
    color: '#2563eb',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  internationalTableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sortButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sortButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  sortBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8faff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sortBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'Lato-Bold',
    marginRight: 12,
  },
  sortButtonActive: {
    backgroundColor: '#2563eb',
  },
  sortButtonTextActive: {
    color: '#ffffff',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 140,
    marginRight: 8,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Lato-Regular',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
  directionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  directionButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Lato-Bold',
  },
  dropdownMenu: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Lato-Regular',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    fontFamily: 'Lato-Bold',
    width: 60,
    textAlign: 'left',
  },
  universityName: {
    fontSize: 15,
    color: '#1f2937',
    fontFamily: 'Lato-Regular',
    flex: 2,
    fontWeight: '500',
    lineHeight: 20,
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Lato-Regular',
    flex: 1,
    lineHeight: 18,
  },
  acceptanceRate: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#dc2626',
    fontFamily: 'Lato-Bold',
    width: 160,
    textAlign: 'right',
  },


  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    flex: 1,
    minWidth: 150,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    fontFamily: 'Lato-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  infoBoxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Lato-Bold',
    marginBottom: 8,
  },
  infoBoxText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Lato-Regular',
    lineHeight: 20,
  },
  internationalTable: {
    backgroundColor: '#fff',
    borderRadius: 8,
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  internationalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  internationalRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    fontFamily: 'Lato-Bold',
    width: 40,
  },
  internationalName: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Lato-Regular',
    flex: 1,
  },
  satTable: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  satRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  satTier: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Lato-Regular',
  },
  satRange: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    fontFamily: 'Lato-Bold',
  },
  strategyList: {
    marginTop: 16,
  },
  strategyItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  strategyNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    fontFamily: 'Lato-Bold',
    width: 30,
    marginRight: 12,
  },
  strategyText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Lato-Regular',
    lineHeight: 24,
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
}); 