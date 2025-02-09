import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (email && password) {
            try {
                await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            } catch (err: any) {
                console.log('gor error', err.messgae);
            }
        }
        console.log('Registering user with:', email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <TextInput
                value={email}
                placeholder="Enter email"
                onChangeText={value => setEmail(value)}
                style={styles.input}
            />
            <TextInput
                value={password}
                placeholder="Enter password"
                onChangeText={value => setPassword(value)}
                style={styles.input}
                secureTextEntry
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Take up the full screen
        justifyContent: 'center', // Vertically center
        alignItems: 'center', // Horizontally center
        padding: 20, // Add some padding
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, // Space between title and inputs
    },
    input: {
        width: '100%', // Full width for input fields
        padding: 10, // Padding inside the input field
        marginBottom: 15, // Space between the input fields
        borderWidth: 1, // Border around the input field
        borderColor: '#ccc', // Light border color
        borderRadius: 5, // Rounded corners
    },
    button: {
        backgroundColor: '#4CAF50', // Green background for button
        paddingVertical: 10, // Padding inside the button
        paddingHorizontal: 20, // Horizontal padding inside the button
        borderRadius: 5, 
    },
    buttonText: {
        color: '#fff', // White text color
        fontSize: 18, // Text size
        textAlign: 'center', // Center the text inside the button
    },
});