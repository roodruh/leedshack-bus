import requests
import zipfile
import os
import json

# The URL for the bulk archive
url = 'https://data.bus-data.dft.gov.uk/avl/download/bulk_archive'

# Path to save the downloaded zip file
zip_file_path = 'bulk_archive.zip'
extract_folder = 'extracted_data'

# Function to download the zip file
def download_zip(url, zip_file_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(zip_file_path, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded zip file to {zip_file_path}")
    else:
        print(f"Failed to download file, status code {response.status_code}")

# Function to extract the zip file
def extract_zip(zip_file_path, extract_folder):
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        # Ensure the folder exists
        os.makedirs(extract_folder, exist_ok=True)
        zip_ref.extractall(extract_folder)
        print(f"Extracted to {extract_folder}")

# Function to check if data is iterable (array or object)
def is_iterable(data):
    return data and (isinstance(data, dict) or isinstance(data, list))

# Function to fix non-iterable JSON data
def fix_non_iterable(data):
    # If data is not iterable, try to parse string data into an array
    if isinstance(data, str):
        try:
            return [json.loads(data)]
        except json.JSONDecodeError:
            print("Failed to parse string data into an array.")
            return []
    return []

# Function to process JSON files in the extracted folder
def process_json_files(extracted_folder):
    # Go through each file in the extracted folder
    for filename in os.listdir(extracted_folder):
        file_path = os.path.join(extracted_folder, filename)
        if filename.endswith(".json"):
            print(f"Processing file: {filename}")
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)

                    # Check if the data is iterable
                    if not is_iterable(data):
                        print(f"Data in {filename} is not iterable. Attempting to fix...")
                        data = fix_non_iterable(data)
                        print(f"Data has been fixed for {filename}.")
                    else:
                        print(f"Data is iterable for {filename}.")
                    
                    # You can process the data here, such as saving it, printing, etc.
                    print(data)  # Just printing the content for now

            except Exception as e:
                print(f"Failed to process {filename}: {e}")

# Main script
download_zip(url, zip_file_path)
extract_zip(zip_file_path, extract_folder)

# Process the extracted JSON files
process_json_files(extract_folder)
