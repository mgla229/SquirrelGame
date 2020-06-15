import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Pause from './img/pauseButton.png';
import { Consts } from './constants';

export default class PauseButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = async () => {
    if (this.props.onPress)
      this.props.onPress();
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
        activeOpacity={1}
        onPress={this.onPress}
      >
        <Image style={styles.image} source={Pause} />
      </TouchableOpacity>
    );
  }
} 

const styles = StyleSheet.create({
  button: {
    margin: '1.5%',
    position: "absolute",
    alignItems: 'stretch',
    top: Consts.MAX_HEIGHT - Consts.SQUIRREL_SIZE,
    left: Consts.SQUIRREL_SIZE/2,
    height: Consts.SQUIRREL_SIZE/2,
    width: Consts.SQUIRREL_SIZE/2,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
  }
});
