# Mobile Squirrel Game 
Mobile squirrel game proof of concept, built using React Native Game Engine.

## Known Issues: 
* Android devices seem to have trouble rendering the moving entities each frame.

## To Test (Unix system with npm):
* Run 'npm install' in SquirrelGame directory
* Run 'npm install expo-cli' in SquirrelGame directory
* Download the Expo client app on your mobile device
* Run 'expo start' and scan QR code using Expo client on Android or camera on iOS

## Note:
When running a test build on iOS, the device will sometimes fail to properly lock the screen
in landscape mode. To fix this, simply clear the Expo client window and rescan the QR code.

![Start Menu](assets/start-screen.GIF)
![Demo](assets/game.GIF)
