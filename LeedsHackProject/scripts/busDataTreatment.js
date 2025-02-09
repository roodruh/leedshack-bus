

let feedbackArray = [];
onUserFeedback = function (feedback) {

    
    
    InputDeviceInfo(VehicleRef, feedback);
    myArr.push(userID, VehicleRef, feedback);



}




const fs = require('fs');

const data = JSON.parse(fs.readFileSync('/c:/Users/adamj/OneDrive/Documents/leedsHack2025/leedshack-bus/LeedsHackProject/sample.json', 'utf8'));

function searchVehicleRef(vehicleRef) {
    for (const entry of data) {
        if (entry.MonitoredVehicleJourney.VehicleRef === vehicleRef) {
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

const vehicleRef = '3584'; 
const result = searchVehicleRef(vehicleRef);
console.log(result);





