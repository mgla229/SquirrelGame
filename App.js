import React, { Component } from "react";
import { StyleSheet, View, Modal } from "react-native";
import CloseButton from './app/table-of-contents/closeButton';
import LevelOne from './app/level-one';
import TableOfContents from './app/table-of-contents/index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sceneVisible: false,
      scene: null
    };
  }

  mountScene = scene => {
    this.setState({
      sceneVisible: true,
      scene: scene
    });
  };

  unMountScene = () => {
    this.setState({
      sceneVisible: false,
      scene: null
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TableOfContents
          sceneVisible={this.state.sceneVisible}
          contents={{
            heading: "Squirrel Game",
            items: [
              LevelOne(this.mountScene),
            ]
          }}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          supportedOrientations={['landscape']}
          visible={this.state.sceneVisible}
          onRequestClose={_ => {}}
        >
          {this.state.scene}

        </Modal>
      </View>
    );
  }
}
