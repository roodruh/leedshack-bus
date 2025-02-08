import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface CardProps {
    location1: string;
    location2: string;
    origin: string;
    travelTime: string;
    price: string;
}

// const Card: React.FC<CardProps> = ({
//     location1,
//     location2,
//     origin,
//     travelTime,
//     price,
// }) 

<FontAwesome name="map-marker" size={24} color="#FF8C00" />

const Card: React.FC<CardProps> = ({
    location1,
    location2,
    origin,
    travelTime,
    price,
}) => {
    return (
        <View style={styles.cardContainer}>
            <FontAwesome style={styles.busIcon} name="bus" size={24} color="#FF8C00" />


            <View style={styles.contentContainer}> {/* Content container */}
                <View style={styles.leftSide}>

                    <View style={styles.locationRow}>
                        <FontAwesome style={styles.iconContainer} name="location-arrow" size={16} color="#FF8C00" />
                        <Text style={styles.locationText}>{location1}</Text>
                    </View>

                    <View style={styles.locationRow}>
                        <FontAwesome style={[styles.iconContainer, styles.paperPlaneContainer]} name="map-marker" size={16} color="#FF8C00" />

                        <Text style={styles.locationText}>{location2}</Text>

                    </View>
                </View>

                <View style={styles.rightSide}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailText}>{origin}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailText}>Time: {travelTime}</Text>
                    </View>

                    <View style={styles.priceContainer}>  {/* Parent container */}
                        <View style={styles.priceTextWrapper}> {/* Wrapper for price number */}
                            <Text style={styles.priceText}>Price</Text> {/* Description at the bottom */}
                        </View>
                        <View>
                            <Text style={styles.priceNumber}>${price}</Text> {/* Large, centered number */}
                        </View>
                    </View>
                </View>

            </View> {/* End content container */}

            <View style={styles.buttonsRow}> {/* Buttons row at the bottom */}
                <TouchableOpacity style={styles.feedbackButton}>
                    <Text style={styles.feedbackButtonText}>Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>BUY TICKET</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 16,
        padding: 16,
        paddingTop: 48,
        position: 'relative',
    },
    busIcon: {
        position: 'absolute',
        left: 24,
        top: -16,
        padding: 12,
        backgroundColor: '#f58700',
        color: 'white',
        borderRadius: '60%',
        elevation: 3, // Android shadow
        shadowOffset: { width: 0, height: 2 }, // iOS shadow
        shadowRadius: 4,                     // iOS shadow
        shadowOpacity: 0.2,                   // iOS shadow
        shadowColor: 'black',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    iconContainer: {
        flex: 0.1,
        backgroundColor: '#063970',
        borderRadius: '30%',
        color: 'white',
        padding: 8,
        textAlign: 'center',
        elevation: 3, // Android shadow
        shadowOffset: { width: 0, height: 2 }, // iOS shadow
        shadowRadius: 4,                     // iOS shadow
        shadowOpacity: 0.2,                   // iOS shadow
        shadowColor: 'black',
    },
    paperPlaneContainer: {  // Style for the paper plane container
        backgroundColor: '#f58700', // Different background color
    },
    priceContainer: {
        flex: 1, // Take up available space in the parent
        flexDirection: 'row', // Arrange children vertically
        alignItems: 'center', // Center horizontally
    },

    priceTextWrapper: {
        flex: 1, // Allow number to expand and center vertically
        justifyContent: 'center', // Center vertically
    },
    priceNumber: {
        fontSize: 32,
        fontWeight: 'bold', // Or your preferred weight
        color: '#f58700'
    },

    priceText: { // This is now just a style object
        color: '#f58700',
    },
    leftSide: {
        flex: 0.6,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        justifyContent: 'space-between',
    },
    rightSide: {
        flex: 0.4,
        alignItems: 'flex-start',
    },
    locationRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    locationText: {
        flex: 0.8,
        marginLeft: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f58700',
    },

    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 14,
        color: 'gray',
        fontWeight: '400'
    },
    detailIcon: {
        width: 16,
        height: 16,
    },

    buttonsRow: {  // Style for the button row
        flexDirection: 'row',
        justifyContent: 'space-between', // Align button to the right
    },
    buyButton: {
        backgroundColor: '#f58700',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    feedbackButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderColor: '#f58700',
        borderWidth: 1,
    },
    feedbackButtonText: {
        color: '#f58700',
    },
    buyButtonText: {
        color: 'white',
        marginLeft: 4,
        fontWeight: 'bold',
        fontSize: 12
    },
    ticketIcon: {
        width: 18,
        height: 18,
    },
    markerIcon: {
        width: 20,
        height: 20,
    },
});
// const styles = StyleSheet.create({
// cardContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'red',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3.5,
//     elevation: 5,
// },
// leftSide: {
//     flex: 0.6,
//     paddingRight: 10,
// },
// rightSide: {
//     flex: 0.4,
//     justifyContent: 'center',
//     paddingLeft: 10,
// },
// locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
// },
// locationText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//     marginLeft: 10,
// },
// rightSideText: {
//     fontSize: 16,
//     color: 'gray',
//     marginBottom: 5,
// },
// priceText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF8C00', // Price in orange color
//     marginTop: 10,
// },
// buttonsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
// },
// button: {
//     backgroundColor: '#FF8C00',
//     borderRadius: 8,
//     paddingVertical: 10,
//     width: '48%',
//     alignItems: 'center',
// },
// buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
// },
// });
export default Card;