import requests
import json

# Replace with your actual API key
API_KEY = "ea170fe88847bee447ed2cd9aa5fad90ab0f99b9"

BASE_URL = "https://data.bus-data.dft.gov.uk/api/v1"

def get_timetable(dataset_id):
    """Fetches timetable data for a given dataset ID."""
    url = f"{BASE_URL}/dataset/{dataset_id}/?api_key={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"Error: {response.status_code}")
        return None

def get_bus_locations(datafeed_id):
    """Fetches real-time bus locations."""
    url = f"{BASE_URL}/datafeed/{datafeed_id}/?api_key={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"Error: {response.status_code}")
        return None

def get_fares(dataset_id):
    """Fetches fare data for a given dataset ID."""
    url = f"{BASE_URL}/fares/dataset/{dataset_id}/?api_key={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"Error: {response.status_code}")
        return None

if __name__ == "__main__":
    # Example usage
    dataset_id = "your_dataset_id_here"
    datafeed_id = "your_datafeed_id_here"
    
    timetable_data = get_timetable(dataset_id)
    if timetable_data:
        print(json.dumps(timetable_data, indent=4))

    location_data = get_bus_locations(datafeed_id)
    if location_data:
        print(json.dumps(location_data, indent=4))

    fares_data = get_fares(dataset_id)
    if fares_data:
        print(json.dumps(fares_data, indent=4))
