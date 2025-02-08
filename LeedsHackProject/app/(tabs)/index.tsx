import { View, Text } from 'react-native'
import React from 'react'
import Card from '../../components/Card'; // Assuming the file is named Card.tsx

const index = () => {
  return (
    <View>
        <Card 
        location1="New York" 
        location2="Los Angeles" 
        origin="New York Depot" 
        travelTime="6h 30m"
        price="50"
        />
    </View>
  )
}

export default index