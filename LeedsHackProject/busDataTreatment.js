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

/**
 * Extracts the actual array of records from the JSON data.
 * If the top-level JSON is not an array, it first checks for any top-level key
 * whose value is an array. If not found, it goes one level deeper.
 */
function extractDataArray(jsonData) {
  let dataArray;

  // If the JSON itself is an array, we're done.
  if (Array.isArray(jsonData)) {
    dataArray = jsonData;
  } else {
    // First, check if any top-level key directly holds an array.
    for (const key in jsonData) {
      if (Array.isArray(jsonData[key])) {
        dataArray = jsonData[key];
        console.log(`Using array from top-level key "${key}"`);
        break;
      }
    }
    
    // If no array was found at the top level, try going one level down.
    if (!dataArray) {
      for (const key in jsonData) {
        if (typeof jsonData[key] === 'object' && jsonData[key] !== null) {
          for (const subKey in jsonData[key]) {
            if (Array.isArray(jsonData[key][subKey])) {
              dataArray = jsonData[key][subKey];
              console.log(`Using array from nested key "${subKey}" under top-level key "${key}"`);
              break;
            }
          }
          if (dataArray) break;
        }
      }
    }
    
    // Fallback: If no array was found, try flattening all top-level values.
    if (!dataArray) {
      dataArray = Object.values(jsonData).flat();
      console.log("Fallback: flattening all top-level values to form the data array.");
    }
  }
  
  return dataArray;
}

// Function to search for a vehicle reference within a chunk
function searchVehicleRefInChunk(chunk, targetVehicleRef) {
  for (const entry of chunk) {
    if (
      entry &&
      entry.MonitoredVehicleJourney &&
      entry.MonitoredVehicleJourney.VehicleRef
    ) {
      console.log("Checking VehicleRef:", entry.MonitoredVehicleJourney.VehicleRef);
      if (entry.MonitoredVehicleJourney.VehicleRef === targetVehicleRef) {
        return entry;
      }
    }
  }
  return null;
}

// Main function to process the JSON file in chunks
function processJSONFileInChunks(filePath, chunkSize, targetVehicleRef) {
  try {
    // Read and parse the JSON file
    const rawData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);
    
    // Print top-level keys for debugging
    console.log("Top-level keys in JSON file:", Object.keys(jsonData));
    
    // Extract the array of records (going one level down if needed)
    const dataArray = extractDataArray(jsonData);
    console.log("Total number of records in the data array:", dataArray.length);
    
    // Split the data array into smaller chunks
    const chunks = chunkArray(dataArray, chunkSize);
    console.log(`Total chunks created: ${chunks.length}`);
    
    // Process each chunk until the target vehicle is found
    let foundEntry = null;
    for (let i = 0; i < chunks.length; i++) {
      console.log(`Processing chunk ${i + 1}/${chunks.length}...`);
      foundEntry = searchVehicleRefInChunk(chunks[i], targetVehicleRef);
      if (foundEntry) {
        break;
      }
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

// Use your specified file path
const filePath = 'C:/Users/adamj/OneDrive/Documents/leedsHack2025/leedshack-bus/LeedsHackProject/data.json';

// Prompt the user for a vehicle reference number
const targetVehicleRef = prompt("Please enter your vehicle reference number: ");

// Define your chunk size (adjust as needed)
const chunkSize = 100;

// Run the processing function
processJSONFileInChunks(filePath, chunkSize, targetVehicleRef);
