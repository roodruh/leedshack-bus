import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Or your preferred icon library

interface ReviewItemProps {
  name: string;
  rating: number;
  description: string;
  imageUrl: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ name, rating, description, imageUrl }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i < rating ? 'star' : 'star-o'}
          size={16}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.row1}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.nameRatingContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.rating}>{renderStars()}</View>
        </View>
      </View>

      <View style={styles.row2}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameRatingContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
  },
  row2: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default ReviewItem;