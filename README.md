# Beer Showcase App

## Overview

This application showcases various beers sourced from the PunkAPI. It provides a user-friendly grid display of beers
with useful features like pagination and content filtering.

## Features

1. **Grid Display**: Beers are displayed in a grid format for easy visual parsing.
2. **Server-Side Pagination**: Pagination ensures faster load times by only requesting and displaying a subset of the
   total beer collection.
3. **ABV Filtering**: Users can filter beers based on Alcohol By Volume (ABV). A toggle switch lets users easily filter
   out beers with an ABV less than 8%.
4. **Error Handling**: Incorporated error handling provides feedback in cases where beer data can't be fetched.

## Technical Highlights

1. **React & TypeScript**: The application is built using React and TypeScript, ensuring type-safe coding.
2. **Telerik Kendo UI**: Used for its rich set of user interface components, making the app visually appealing and
   user-friendly.
3. **Zustand**: A lightweight state management solution, used for maintaining and updating the application state
   seamlessly.
4. **API Isolation**: HTTP calls are kept isolated from React components for better code structure and maintainability.
5. **Unit Testing**: The application incorporates unit tests using tools like Jest and Testing Library to ensure its
   robustness.

## Getting Started

### Prerequisites

#### Kendo UI Licensing

If you're using the Telerik Kendo UI components, please note that a license file is required for legitimate usage.
Follow the steps below to ensure proper licensing:

1. **Add License File**: Place the `kendo-ui-license.txt` file in the root directory of your project.

2. **License Activation**:
   Visit [Kendo UI License Activation Guide](https://www.telerik.com/kendo-react-ui/components/my-license/) and follow
   the provided instructions to properly activate and validate your Kendo UI license.

3. **Important**: Failing to include a legitimate license can result in limitations on the functionalities of the Kendo
   UI components. Ensure your license is valid and always up to date.

### Installation

1. Clone the repository.
   ```sh
   git clone https://github.com/bewpage/beer-app.git
   ```

2. Navigate to the project directory.
   ```sh
   cd project_name
   ```

3. Install NPM packages.
   ```sh
   npm install
   ```

4. Start the development server.
   ```sh
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`.

### Running Tests

Run the following command in the project directory:

```sh
npm test
```

This will run all unit tests and display results in the terminal.

