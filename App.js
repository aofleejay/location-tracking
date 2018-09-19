import React, { Component } from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

MapboxGL.setAccessToken('')

class App extends Component {
  render() {
    return (
      <MapboxGL.MapView
        centerCoordinate={[
          100.53140938282013,
          13.727081778875078,
        ]}
        style={{ flex: 1 }}
      />
    )
  }
}

export default App
