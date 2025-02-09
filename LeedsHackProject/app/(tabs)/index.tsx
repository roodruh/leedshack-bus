import React from 'react';
import { View, Text, StyleSheet, Button, PanResponder, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import {useState, useRef} from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HalfGradient from '../../components/HalfGradient'; 
import ReviewItem from '../../components/ReviewCard'; // Import the ReviewItem component
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const index = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState(0);
  const starRefs = useRef<FontAwesome[]>([]); // Initialize as an empty array

  const onChange = (e: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  }

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity 
          key={i} 
          onPress={() => setRating(i + 1)} // Set rating on press
          activeOpacity={1} // Prevent opacity change on press
        >
          <FontAwesome
            ref={el => {
              if (el) {  // Check if the component exists
                starRefs.current[i] = el;
              }
            }}
            name={i < rating ? 'star' : 'star-o'}
            size={32}
            color="#FF8C00"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Respond to touch start
      onMoveShouldSetPanResponder: () => true,  // Respond to touch move
      onPanResponderGrant: (evt: any, gestureState: any) => {
        handleStarPress(evt.nativeEvent); // Handle initial press
      },
      onPanResponderMove: (evt: any, gestureState: any) => {
        handleStarPress(evt.nativeEvent); // Handle move events
      },
    })
  ).current;

  const handleStarPress = (event: any) => {
    const x = event.locationX; // x-coordinate of the touch
    const starWidth = 32 + 8; // Star size + gap

    let newRating = Math.ceil(x / starWidth); // Calculate rating based on touch position

    newRating = Math.max(0, Math.min(newRating, 5)); // Limit rating to 0-5

    setRating(newRating); // Update the state
  };



  const reviews = [
    {
      name: 'John Doe',
      rating: 4,
      description: 'Great service! The food was delicious and the staff was friendly.',
      imageUrl: 'https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b', // Replace with a real URL
    },
    {
      name: 'Jane Smith',
      rating: 5,
      description: 'Excellent experience. Highly recommend!',
      imageUrl: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png', // Replace with a real URL
    },
    // Add more reviews here...
  ];

  return (
    <GestureHandlerRootView>
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent} >
      <HalfGradient colors={['#FF8C00', '#FFD700']} heightPercent={0.5} />
      
      <FontAwesome style={styles.busIcon} name="bus" size={24} color="#FF8C00" />
      <Text style={styles.text}>
        Bus Ride #51212
      </Text>

      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerText}>Arrived At</Text>
        <DateTimePicker
            value={date}
            is24Hour={true}
            onChange={onChange}
            mode='time'
          />
      </View>

      <View style={styles.starsReviewContainer}>
        <Text style={styles.starsText}>Star Rating</Text>
        
        <View style={styles.stars} {...panResponder.panHandlers}> {/* Apply PanResponder */}
            {renderStars()}
        </View>
        
      </View>

      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={4}
          onChangeText={setReview}
          value={review}
          placeholder="Write your review here"
        />
      </View>

      <View>
        <TouchableOpacity style={styles.submitBtn} onPress={() => console.log('Review Submitted:', review)}>
            <Text style={styles.submitBtnText}>Submit Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {reviews.map((review, index) => (
          <ReviewItem key={index} {...review} /> // Spread operator to pass props
        ))}
      </View>
  </ScrollView>
  </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the screen take up the full available space
  },
  scrollViewContent: {
    padding: 8,
    alignItems: 'center', // Center items horizontally within the ScrollView
  },
  busIcon: {
    backgroundColor: '#f58700',
    color: 'white',
    borderRadius: 30, // Make it circular
    padding: 16,
    marginBottom: 8,
    marginTop: 24,
  },
  text: {
    fontSize: 24,
    marginBottom: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  datePickerText: {
    color: '#ffffff',
    fontSize: 16,
  },
  datePickerContainer: {
    paddingHorizontal: 16,
    borderRadius: 4,
    paddingVertical: 8,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsReviewContainer: {
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 8,
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 24,
  },
  starsText: {
    alignSelf: 'flex-start', // Align to the left (start)
    color: '#f58700',
    fontSize: 16,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center', // Center stars horizontally
    marginBottom: 10,
    gap: 8,
  },
  textAreaContainer: {
    width: '80%', // Make the container 80% of the screen width
    alignItems: 'center', // Center horizontally
    marginBottom: 24,
  },
  textArea: {
    height: 180,
    borderColor: '#e6e6e6',
    borderWidth: 1,
    color: 'black',
    padding: 16,
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: '#e6e6e6',
    width: '100%', // Make the text area take up the full width of the container
  },
  submitBtn: {
    backgroundColor: '#f58700',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  submitBtnText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewListContainer: {
    width: '80%', // Make the container 80% of the screen width
    alignItems: 'center', // Center horizontally
  },
});


export default index;