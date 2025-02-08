import requests
import zipfile
import os

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

# Main script
download_zip(url, zip_file_path)
extract_zip(zip_file_path, extract_folder)
