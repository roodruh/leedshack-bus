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
        borderBottomLeftRadius: 70, // Adjust the value to make it more or less rounded
        borderBottomRightRadius: 70, // Adjust the value to make it more or less rounded
        zIndex: -1, // Ensures the gradient is below the other content
        // Shadow for iOS
        shadowColor: '#000', // Color of the shadow
        shadowOffset: { width: 0, height: 4 }, // Offset of the shadow (X, Y)
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 6, // Radius of the shadow (how spread out it is)
        // Shadow for Android
        elevation: 5, // Controls the shadow size on Android devices
    },
});

export default HalfGradient;