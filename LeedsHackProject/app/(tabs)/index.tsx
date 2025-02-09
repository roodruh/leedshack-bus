import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HalfGradient from '../../components/HalfGradient'; 

const index = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (e: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  }


  return (
    <View style={styles.container}>
    <HalfGradient colors={['#FF8C00', '#FFD700']} heightPercent={0.5} />

    <Text style={styles.text}>Give a review</Text>

    <View style={styles.datePickerContainer}>
      <Text>Arrived At</Text>
      <DateTimePicker
          value={date}
          is24Hour={true}
          onChange={onChange}
          mode='time'
        />
    </View>

    <View style={styles.starsReviewContainer}>
      <Text>Star Rating</Text>
      
      <View style={styles.stars}>
        <FontAwesome name="star" size={24} color="#FF8C00" />
        <FontAwesome name="star" size={24} color="#FF8C00" />
        <FontAwesome name="star" size={24} color="#FF8C00" />
        <FontAwesome name="star" size={24} color="#FF8C00" />
        <FontAwesome name="star" size={24} color="#FF8C00" />
      </View>
    </View>
  </View>
  );
};

// container: {
//   flexGrow: 1,
//   padding: 4,
//   justifyContent: 'center',
//   flex: 1,
// },
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsReviewContainer: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 8,
  },
});


export default index;