const fs = require('fs');
const prompt = require('prompt-sync')();

// Corrected file path
let data;
try {
    data = JSON.parse(fs.readFileSync('C:/Users/adamj/OneDrive/Documents/leedsHack2025/leedshack-bus/LeedsHackProject/Pdata.json', 'utf8'));
    if (Array.isArray(data)) {
        // Data is already an array
    } else if (data && Array.isArray(data.json) && Array.isArray(data.json.data)) {
        // Data is nested within an object
        data = data.json.data;
    } else if (data && Array.isArray(data.data)) {
        // Data is nested within an object
        data = data.data;
    } else {
        // Convert the data to an array
        data = [data];
    }
} catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
    process.exit(1);
}

function searchVehicleRef(VehicleRef) {
    for (const entry of data) {
        if (entry.MonitoredVehicleJourney) {
            console.log("Checking VehicleRef:", entry.MonitoredVehicleJourney.VehicleRef); // Debugging statement
            if (entry.MonitoredVehicleJourney.VehicleRef === VehicleRef) {
                console.log("Match found for VehicleRef:", VehicleRef); // Debugging statement
                const {
                    Longitude,
                    Latitude
                } = entry.MonitoredVehicleJourney.VehicleLocation || {};
                const {
                    JourneyCode
                } = entry.Extensions.VehicleJourney.Operational.TicketMachine || {};
                const {
                    RecordedAtTime,
                    LineRef,
                    DirectionRef,
                    OperatorRef,
                    OriginAimedDepartureTime,
                    DestinationAimedArrivalTime
                } = entry.MonitoredVehicleJourney;
                const { VehicleRef: Ref } = entry.MonitoredVehicleJourney;
                return {
                    Longitude,
                    Latitude,
                    VehicleRef: Ref,
                    JourneyCode,
                    RecordedAtTime,
                    LineRef,
                    DirectionRef,
                    OperatorRef,
                    OriginAimedDepartureTime,
                    DestinationAimedArrivalTime
                };
            }
        }
    }
    console.log("No match found for VehicleRef:", VehicleRef); // Debugging statement
    return null;
}

const VehicleRef = prompt("Please enter your vehicle reference number: ");
const result = searchVehicleRef(VehicleRef);
console.log(result);





