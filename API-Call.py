import requests
import json

api_key = 'ea170fe88847bee447ed2cd9aa5fad90ab0f99b9'

url = 'https://data.bus-data.dft.gov.uk/api/v1/datafeed/?api_key=' + api_key

def fetch_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()

data = fetch_data(url)
print(json.dumps(data, indent=4))






