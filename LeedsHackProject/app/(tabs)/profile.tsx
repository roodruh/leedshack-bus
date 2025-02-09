import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Card from '../../components/Card'; // Assuming the file is named Card.tsx
import { ScrollView } from 'react-native-gesture-handler';
import HalfGradient from '../../components/HalfGradient'; // Import your gradient component


const profile = () => {
  return (
    <View>
      <Text>Profile Page</Text>
      <Text>Profile Page</Text>
      <Text>Profile Page</Text>
      <Text>Profile Page</Text>
      <Text>Profile Page</Text>
      <Text>Profile Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF A500', // Orange background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    width: 30,
    height: 30,
    tintColor: 'white', // Example tint color
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ticketCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  busIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  depotText: {
    fontSize: 14,
    color: 'gray',
  },
  details: {
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: 'black',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF A500', // Orange color
  },
  buyButton: {
    backgroundColor: '#FF A500', // Orange color
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  navIcon: {
    width: 30,
    height: 30,
    tintColor: 'white', // Example tint color
  },
  middleBtnContainer: { // Style for the middle button container
    width: 40, // Adjust as needed
    height: 40, // Adjust as needed
    borderRadius: 20, // Make it circular
    backgroundColor: 'white', // Or any color you want
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default profile