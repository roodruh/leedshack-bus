// filepath: /c:/Users/adamj/OneDrive/Documents/leedsHack2025/leedshack-bus/LeedsHackProject/components/FeedbackSubmission.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { processJSONFileInChunks } from '../busDataTreatment'; // Adjust the relative path as needed

const FeedbackSubmission = () => {
  const [vehicleRef, setVehicleRef] = useState('');
  const [feedback, setFeedback] = useState('');
  const [foundEntry, setFoundEntry] = useState<any>(null);

  const handleSearch = () => {
    const filePath = 'C:/Users/adamj/OneDrive/Documents/leedsHack2025/leedshack-bus/LeedsHackProject/data.json';
    const chunkSize = 100;
    const targetVehicleRef = prompt("Please enter your vehicle reference number: ");

    processJSONFileInChunks(filePath, chunkSize,targetVehicleRef)};

  const handleFeedbackSubmit = () => {
    if (foundEntry) {
      foundEntry.feedback = feedback;
      // Since fs is not available in React Native, you need to handle this differently
      // For example, you can send the data to a backend service
      console.log("Found entry with feedback:", JSON.stringify(foundEntry, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Vehicle Reference Number:</Text>
      <TextInput
        style={styles.input}
        value={vehicleRef}
        onChangeText={setVehicleRef}
        placeholder="Vehicle Reference Number"
      />
      <Button title="Search Vehicle" onPress={handleSearch} />

      {foundEntry && (
        <View style={styles.foundEntryContainer}>
          <Text style={styles.foundEntryText}>Found Entry:</Text>
          <Text>{JSON.stringify(foundEntry, null, 2)}</Text>

          <Text style={styles.label}>Enter Feedback:</Text>
          <TextInput
            style={styles.input}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Enter your feedback"
          />
          <Button title="Submit Feedback" onPress={handleFeedbackSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  foundEntryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  foundEntryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
export default FeedbackSubmission;