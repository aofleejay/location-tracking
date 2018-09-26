import React, { Component } from 'react'
import { Container, Header, Body, Content, Button, Text } from 'native-base'

class App extends Component {
  state = { coords: null }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({ coords: position.coords })
    })
  }

  clearWatch = () => {
    navigator.geolocation.clearWatch(this.watchID)
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
          <Text>latitude: {this.state.coords?.latitude}</Text>
          <Text>longitude: {this.state.coords?.longitude}</Text>
          <Button block warning onPress={this.clearWatch}>
            <Text>clear watch</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default App
