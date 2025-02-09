import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface HalfGradientProps {
    colors?: [string, string, ...string[]];
    heightPercent?: number;
}

const HalfGradient: React.FC<HalfGradientProps> = ({
    colors = ['#FFFFFF', '#EEEEEE'],
    heightPercent = 0.5,
}) => {
    return (
        <LinearGradient
            colors={colors}
            style={[styles.gradientContainer, { height: screenHeight * heightPercent }]}
            start={{ x: 0.5, y: 0 }} // Top-center
            end={{ x: 0.5, y: 1 }} // Bottom-center
        />
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
    width: screenWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1, // Ensures the gradient is below other content

    // For a more elliptical effect
    borderBottomLeftRadius: 80, // Increased for a more rounded curve
    borderBottomRightRadius: 80, // Increased for a more rounded curve

    // Optional shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 6, 

    // Elevation for Android shadow
    elevation: 10, 

    // Optional: Adjusting heightPercent can help shape the gradient more naturally
},
});

export default HalfGradient;