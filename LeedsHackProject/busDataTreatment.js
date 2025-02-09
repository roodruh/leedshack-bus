const fs = require('fs');
const { execSync } = require('child_process');
const prompt = require('prompt-sync')();

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function extractDataArray(jsonData) {
  if (jsonData.Siri) {
    jsonData = jsonData.Siri;
  }
  if (jsonData.ServiceDelivery) {
    jsonData = jsonData.ServiceDelivery;
  }
  if (jsonData.VehicleMonitoringDelivery) {
    jsonData = jsonData.VehicleMonitoringDelivery;
  }
  if (jsonData.VehicleActivity && Array.isArray(jsonData.VehicleActivity)) {
    return jsonData.VehicleActivity;
  }

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

export function processJSONFileInChunks(filePath, chunkSize, targetVehicleRef) {
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

      const feedback = prompt("Please enter your feedback: ");
      foundEntry.feedback = feedback;

      fs.writeFileSync('foundEntry.txt', JSON.stringify(foundEntry, null, 2), 'utf8');
      console.log("Found entry written to foundEntry.txt");
    } else {
      console.log("Vehicle not found.");
    }
  } catch (err) {
    console.error("Error processing JSON file:", err);
  }
}

function runAPICallScript() {
  try {
    execSync('python /c:/Users/adamj/OneDrive/Documents/leedsHack2025/leedshack-bus/API-Call.py', { stdio: 'inherit' });
    console.log("API call and data extraction completed.");
  } catch (err) {
    console.error("Error running API call script:", err);
  }
}

runAPICallScript();

const filePath = 'C:/Users/adamj/OneDrive/Documents/leedsHack2025/leedshack-bus/LeedsHackProject/data.json';
const targetVehicleRef = prompt("Please enter your vehicle reference number: ");
const chunkSize = 100;

processJSONFileInChunks(filePath, chunkSize, targetVehicleRef);
