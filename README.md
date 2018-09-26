# React Native location tracking
Location tracking application by using [React Native geolocation API](https://facebook.github.io/react-native/docs/geolocation).

## Getting Started
```
$ yarn or npm install

$ cd ios
$ pod install
$ cd ..
$ react-native link native-base


$ react-native run-ios      // iOS
$ react-native run-android  // Android
```

## Implementation
### Use `setInterval` and `navigation.geolocation.getCurrentPosition`
Invokes the callback once when receive location.
```javascript
const intervalID = setInterval(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  })
}, 10000) // Get location every 10 seconds.
```
### Use `navigation.geolocation.watchPosition`
Invokes the callback when the location changes.
```javascript
const watchID = navigator.geolocation.watchPosition((position) => {
  this.setState({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  })
})
```

## GPS Accuracy
Latitude and longitude can be found inside `position.coords` object. It's precision is around 7 - 15.
```json
{
  "coords": {
    "accuracy": 5,
    "altitude": 0,
    "altitudeAccuracy": -1,
    "heading": 316.76,
    "latitude": 37.43354365,
    "longitude": -122.24095367,
    "speed": 33.21
  },
  "timestamp": 1537954475356.8079
}
```

Select accuracy mode by passing an options object as third parameter (High accuracy mode give more accurate location but may slower response and consume more battery).
```javascript
const watchID = navigator.geolocation.watchPosition((position) => {
  (position) => { /* success callback */ },
  (error) => { /* error callback */ },
  { enableHighAccuracy: true }, // options
})
```

## Battery Comsumption
I use iPhone 7 with 82% maximum capacity for testing.

## Todo List
- [x] Implementation
- [x] GPS Accuracy
- [ ] Battery Comsumption
- [ ] Background location
