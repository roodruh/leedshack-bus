import requests
import zipfile
import os
import json

url = 'https://data.bus-data.dft.gov.uk/avl/download/bulk_archive'
zip_file_path = 'bulk_archive.zip'
extract_folder = 'extracted_data'

def download_zip(url, zip_file_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(zip_file_path, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded zip file to {zip_file_path}")
    else:
        print(f"Failed to download file, status code {response.status_code}")

def extract_zip(zip_file_path, extract_folder):
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        os.makedirs(extract_folder, exist_ok=True)
        zip_ref.extractall(extract_folder)
        print(f"Extracted to {extract_folder}")

def is_iterable(data):
    return data and (isinstance(data, dict) or isinstance(data, list))

def fix_non_iterable(data):
    if isinstance(data, str):
        try:
            return [json.loads(data)]
        except json.JSONDecodeError:
            print("Failed to parse string data into an array.")
            return []
    return []

def process_json_files(extracted_folder):
    for filename in os.listdir(extracted_folder):
        file_path = os.path.join(extracted_folder, filename)
        if filename.endswith(".json"):
            print(f"Processing file: {filename}")
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)
                    if not is_iterable(data):
                        print(f"Data in {filename} is not iterable. Attempting to fix...")
                        data = fix_non_iterable(data)
                        print(f"Data has been fixed for {filename}.")
                    else:
                        print(f"Data is iterable for {filename}.")
                    with open(file_path, 'w') as f:
                        json.dump(data, f, indent=4)
                        print(f"Fixed data saved for {filename}.")
            except Exception as e:
                print(f"Failed to process {filename}: {e}")

if __name__ == "__main__":
    download_zip(url, zip_file_path)
    extract_zip(zip_file_path, extract_folder)
    process_json_files(extract_folder)
