const fs = require('fs');
const { TextInput } = require('react-native');

// Corrected file path
const data = JSON.parse(fs.readFileSync('C:/Users/adamj/OneDrive/Documents/leedsHack2025/leedshack-bus/LeedsHackProject/sample.json', 'utf8'));

function searchVehicleRef(VehicleRef) {
    for (const entry of data) {
        if (entry.MonitoredVehicleJourney.VehicleRef === VehicleRef) {
            const {
                Longitude,
                Latitude
            } = entry.MonitoredVehicleJourney.VehicleLocation;
            const {
                VehicleRef,
                JourneyCode
            } = entry.Extensions.VehicleJourney.Operational.TicketMachine;
            const {
                RecordedAtTime,
                LineRef,
                DirectionRef,
                OperatorRef,
                OriginAimedDepartureTime,
                DestinationAimedArrivalTime
            } = entry.MonitoredVehicleJourney;

            return {
                Longitude,
                Latitude,
                VehicleRef,
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
    return null;
}

const VehicleRef = '3584'; 
const result = searchVehicleRef(VehicleRef);
console.log(result);





