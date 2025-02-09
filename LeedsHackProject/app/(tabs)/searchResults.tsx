import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Card from '../../components/Card'; // Assuming the file is named Card.tsx
import { ScrollView } from 'react-native-gesture-handler';
import HalfGradient from '../../components/HalfGradient'; 

import { FontAwesome } from '@expo/vector-icons';

const searchResults = () => {
  return (
    <View style={styles.container}>
      <HalfGradient colors={['#FF8C00', '#FFD700']} heightPercent={0.5} />

      <View style={styles.containerHeading}>
        <Text style={styles.heading}>Location1</Text>
        <FontAwesome style={styles.headingIcon} name="exchange" size={16} color="#FF8C00" />
        <Text style={styles.heading}>Location2</Text>
      </View>

      <View style={styles.cardsContainer}>
          <Card 
          location1="New York" 
          location2="Los Angeles" 
          origin="New York Depot" 
          travelTime="6h 30m"
          price="50"
          />
          <Card 
          location1="New York" 
          location2="Los Angeles" 
          origin="New York Depot" 
          travelTime="6h 30m"
          price="50"
          />
      </View>
        
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 4,
    justifyContent: 'center',
    flex: 1,
  },
  containerHeading: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
    marginBottom: 32,
  },

  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    margin: 'auto',
  },
  headingIcon: {
    color: 'white',
    fontSize: 24,
  },

  cardsContainer: {
    gap: 16, 
  },
});

export default searchResults;