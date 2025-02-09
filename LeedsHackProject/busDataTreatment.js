const fs = require('fs');
const prompt = require('prompt-sync')();

// Helper function: splits an array into chunks of a given size
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Function to extract the actual array of records from the JSON data.
// This function goes down known levels if they exist.
function extractDataArray(jsonData) {
  // If the JSON has a top-level key "Siri", go down into it.
  if (jsonData.Siri) {
    jsonData = jsonData.Siri;
  }
  // If "ServiceDelivery" exists, go down a level.
  if (jsonData.ServiceDelivery) {
    jsonData = jsonData.ServiceDelivery;
  }
  // If "VehicleMonitoringDelivery" exists, go down a level.
  if (jsonData.VehicleMonitoringDelivery) {
    jsonData = jsonData.VehicleMonitoringDelivery;
  }
  // If "VehicleActivity" exists and is an array, that's our data.
  if (jsonData.VehicleActivity && Array.isArray(jsonData.VehicleActivity)) {
    return jsonData.VehicleActivity;
  }

  // Fallback: try to extract an array by scanning top-level keys.
  let dataArray;
  for (const key in jsonData) {
    if (Array.isArray(jsonData[key])) {
      dataArray = jsonData[key];
      break;
    }
  }
  if (!dataArray) {
    for (const key in jsonData) {
      if (typeof jsonData[key] === 'object' && jsonData[key] !== null) {
        for (const subKey in jsonData[key]) {
          if (Array.isArray(jsonData[key][subKey])) {
            dataArray = jsonData[key][subKey];
            break;
          }
        }
        if (dataArray) break;
      }
    }
  }
  if (!dataArray) {
    dataArray = Object.values(jsonData).flat();
  }
  return dataArray;
}

// Function to search for a vehicle reference within a chunk.
function searchVehicleRefInChunk(chunk, targetVehicleRef) {
  for (const entry of chunk) {
    if (
      entry &&
      entry.MonitoredVehicleJourney &&
      entry.MonitoredVehicleJourney.VehicleRef &&
      entry.MonitoredVehicleJourney.VehicleRef === targetVehicleRef
    ) {
      return entry;
    }
  }
  return null;
}

// Main function to process the JSON file in chunks.
function processJSONFileInChunks(filePath, chunkSize, targetVehicleRef) {
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);
    console.log("Top-level keys in JSON file:", Object.keys(jsonData));

    const dataArray = extractDataArray(jsonData);
    console.log("Total number of records in the data array:", dataArray.length);

    const chunks = chunkArray(dataArray, chunkSize);

    let foundEntry = null;
    for (let i = 0; i < chunks.length; i++) {
      foundEntry = searchVehicleRefInChunk(chunks[i], targetVehicleRef);
      if (foundEntry) break;
    }

    if (foundEntry) {
      console.log("Vehicle found:", foundEntry);
    } else {
      console.log("Vehicle not found.");
    }
  } catch (err) {
    console.error("Error processing JSON file:", err);
  }
}

// Use your specified file path.
const filePath = 'C:/Users/adamj/OneDrive/Documents/leedsHack2025/leedshack-bus/LeedsHackProject/data.json';

// Prompt the user for a vehicle reference number.
const targetVehicleRef = prompt("Please enter your vehicle reference number: ");

// Define your chunk size (adjust as needed).
const chunkSize = 100;

// Run the processing function.
processJSONFileInChunks(filePath, chunkSize, targetVehicleRef);
