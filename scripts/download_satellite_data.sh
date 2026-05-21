#!/bin/bash

# This script automates the process of downloading satellite data for flood assessment.

# Define the output directory for the downloaded data
OUTPUT_DIR="../data/raw/satellite_data"
mkdir -p $OUTPUT_DIR

# Define the satellite data source (example: Sentinel-2)
DATA_SOURCE="https://example.com/satellite_data"

# Define the date range for the data to be downloaded
START_DATE="2023-01-01"
END_DATE="2023-12-31"

# Download the satellite data using wget or curl
echo "Downloading satellite data from $DATA_SOURCE..."
wget -r -np -nH --cut-dirs=3 -P $OUTPUT_DIR "$DATA_SOURCE?start_date=$START_DATE&end_date=$END_DATE"

echo "Download completed. Data saved to $OUTPUT_DIR."