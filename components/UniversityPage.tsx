import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

interface UniversityPageProps {
  name: string;
  children: React.ReactNode;
}

export default function UniversityPage({ name, children }: UniversityPageProps) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f4f8fb' }} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/icon.png')} // Placeholder logo
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>{children}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  header: {
    backgroundColor: '#0A3266',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 16,
    marginTop: 16,
    maxWidth: 700,
    width: '100%',
  },
  logo: {
    width: 64,
    height: 64,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    flex: 1,
    textAlign: 'left',
  },
  contentWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
    width: '100%',
    maxWidth: 700,
  },
}); 