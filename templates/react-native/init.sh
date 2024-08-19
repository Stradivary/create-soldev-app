#!/bin/bash

# Check if both destination path and app name were provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <destination_path> <app_name>"
    exit 1
fi

DEST_PATH=$1
APP_NAME=$2

# Navigate to the destination path
# cd "$DEST_PATH" || exit

# Initialize a new React Native project with the given app name
npx @react-native-community/cli init "$APP_NAME" 

# Navigate into the newly created app directory
cd "$APP_NAME" || exit

# Create additional directories for project structure
mkdir -p src/{components,screens,navigation,services,utils,assets}

# Create some basic files
touch src/components/index.js
touch src/screens/index.js
touch src/navigation/index.js
touch src/services/api.js
touch src/utils/helpers.js

# Install additional dependencies
npm install @react-navigation/native @react-navigation/stack axios redux react-redux @reduxjs/toolkit

# Install dev dependencies
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-native

# Create a basic .eslintrc.js file
cat > .eslintrc.js << EOL
module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
};
EOL

# Create a basic .prettierrc.js file
cat > .prettierrc.js << EOL
module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
};
EOL

# Update the App.js file with a basic structure
cat > App.js << EOL
import React from 'react';
import { View, Text } from 'react-native';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to ${APP_NAME}!</Text>
    </View>
  );
};

export default App;
EOL

# Run pod install for iOS
if [[ "$OSTYPE" == "darwin"* ]]; then
  cd ios && pod install && cd ..
fi

echo "React Native project '${APP_NAME}' initialized successfully at ${DEST_PATH}/${APP_NAME}"
echo "Additional setup and scaffolding completed."