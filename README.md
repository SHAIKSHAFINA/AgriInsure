# Flood Insurance Assessment Application

This project is designed to assess flood severity and calculate insurance for a single plot using remote sensing and machine learning techniques. The application consists of a frontend built with React and a backend powered by Node.js and Express.

## Project Structure

The project is organized into several directories and files, each serving a specific purpose:

- **frontend/**: Contains the React application.
  - **public/**: Static files, including the main HTML file.
  - **src/**: Source code for the React application, including components, services, hooks, and styles.
  - **package.json**: Lists frontend dependencies and scripts.
  - **tsconfig.json**: TypeScript configuration for the frontend.

- **backend/**: Contains the backend application.
  - **src/**: Source code for the backend, including server setup, routes, controllers, and services.
  - **package.json**: Lists backend dependencies and scripts.
  - **tsconfig.json**: TypeScript configuration for the backend.
  - **Dockerfile**: Instructions for building a Docker image for the backend.

- **models/**: Contains model documentation and preprocessing configurations.
- **data/**: Directories for raw and processed data files.
- **notebooks/**: Jupyter notebooks for exploratory data analysis.
- **scripts/**: Scripts for downloading satellite data and training the ML model.
- **infra/**: Infrastructure configurations for Docker and Kubernetes.
- **tests/**: Directories for frontend and backend tests.
- **.env.example**: Example environment variables.
- **.gitignore**: Specifies files to be ignored by Git.
- **README.md**: Documentation for the overall project.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd flood-insurance-app
   ```

2. **Install dependencies**:
   - For the frontend:
     ```
     cd frontend
     npm install
     ```
   - For the backend:
     ```
     cd backend
     npm install
     ```

3. **Run the application**:
   - Start the backend server:
     ```
     cd backend
     npm start
     ```
   - Start the frontend application:
     ```
     cd frontend
     npm start
     ```

4. **Access the application**:
   Open your web browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Users can visualize their farming area on a map and upload GeoJSON files.
- A form allows users to input their field area and crop type, as well as upload a CSV file.
- The application assesses flood severity and calculates insurance based on the provided data.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.