# POPAPP MOBILE
PopApp Mobile Application.

### Features
- [React-Native](https://reactnative.dev/) + [React Navigation](https://reactnavigation.org/)
- [Typescript](https://www.typescriptlang.org/docs/handbook/react.html) 
- [babel-plugin-inline-dotenv](https://github.com/brysgo/babel-plugin-inline-dotenv/blob/master/README.md)
- [Expo](https://expo.io/)
- [Lottie](https://github.com/lottie-react-native/lottie-react-native/blob/master/README.md)

## Installation
* Install [NodeJS](https://nodejs.org/en/download/) >= 14
* Install [Expo](https://docs.expo.io/get-started/installation/)
* Download the project:

```
git clone https://github.com/RafaelZacca/PopApp-Mobile.git
```

* Install dependencies:

```
expo install
```

## Getting started
```
expo start
```

- Runs the app in development mode.
- You will see the build errors and lint warnings in the console.

## API references
- This project requires an API Solution to work with. 
- Go to https://github.com/RafaelZacca/PopApp-API.git to clone the required API project. 

## Deployment builds
```
expo start {args}
``` 
- Replace `{args}` with: nothing for develop // `--no-dev --minify` for production build
- `expo build` Builds the app for production using expo. Checking with `expo build:status` you can check up your build process, when it's done you'll see the url to your app file.
- It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified and the filenames include the hashes.

## Project Structure
```
  .
  ├── assets                # static assets
  ├── components            # react components
  ├── modals                # application modals
  ├── pages                 # application pages
  ├── models		        # api models representations
  ├── resources		        # static resources
  │   ├── animations	                # json lottie animations
  │   ├── images	                	# static images
  ├── services              # api communication functions
  ├── supports	            # utility functions, libs, constants, etc.
  ├── App.tsx             	# entry point
  ├── index.css             # general stylesheets and overwrites
  ├── tsconfig.json         # typescript configuration
  ├── .env.development      # environmental variables for develop
  ├── .env.production       # environmental variables for production
  ├── babel.config.js       # babel configuration
  ├── app.json              # application configuration
  ├── package.json            
  └── README.md
```