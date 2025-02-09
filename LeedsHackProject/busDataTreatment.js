const fs = require('fs');
const prompt = require('prompt-sync')();
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
            const{VehicleRef} = entry.MonitoredVehicleJourney;
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

const VehicleRef = prompt("please enter your vehicle reference number: "); 
const result = searchVehicleRef(VehicleRef);
console.log(result);





