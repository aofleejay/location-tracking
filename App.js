import React, { Component } from 'react'
import { Container, Header, Body, Content, Card, CardItem, Button, Text, Left } from 'native-base'

class App extends Component {
  state = {
    watchCoords: null,
    watchError: null,
    watchTriggerCount: 0,
    intervalCoords: null,
    intervalError: null,
    intervalTriggerCount: 0,
  }

  componentDidMount() {
    this.startWatchingLocation()
    this.startPollingLocation()
  }

  componentWillUnmount() {
    this.stopWatchingLocation()
    this.stopPollingLocation()
  }

  startWatchingLocation = () => {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => { this.setState({ watchCoords: position.coords, watchTriggerCount: this.state.watchTriggerCount + 1 }) },
      (error) => { this.setState({ watchError: error }) },
      { enableHighAccuracy: false },
    )
  }

  startPollingLocation = (interval = 10000) => {
    this.pollingLocation()

    this.intervalID = setInterval(this.pollingLocation, interval)
  }

  pollingLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => { this.setState({ intervalCoords: position.coords, intervalTriggerCount: this.state.intervalTriggerCount + 1  }) },
      (error) => { this.setState({ intervalError: error }) },
      { enableHighAccuracy: false },
    )
  }

  stopWatchingLocation = () => {
    navigator.geolocation.clearWatch(this.watchID)
  }

  stopPollingLocation = () => {
    clearInterval(this.intervalID)
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text>Location Tracking</Text>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem header>
              <Text>Watch Location</Text>
            </CardItem>
            <CardItem>
              <Text>Invokes the callback when the location changes.</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>latitude: {this.state.watchCoords?.latitude}</Text>
                <Text>longitude: {this.state.watchCoords?.longitude}</Text>
                <Text>trigger count: {this.state.watchTriggerCount}</Text>
                <Text>error: {JSON.stringify(this.state.watchError)}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button block warning onPress={this.stopWatchingLocation}>
                  <Text>Stop Watching</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Polling Location Every 10 Seconds</Text>
            </CardItem>
            <CardItem>
              <Text>Invokes the callback once when receive location.</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>latitude: {this.state.intervalCoords?.latitude}</Text>
                <Text>longitude: {this.state.intervalCoords?.longitude}</Text>
                <Text>trigger count: {this.state.intervalTriggerCount}</Text>
                <Text>error: {JSON.stringify(this.state.intervalError)}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button block warning onPress={this.stopPollingLocation}>
                  <Text>Stop Polling</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default App
