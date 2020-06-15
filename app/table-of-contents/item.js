import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { Consts } from '../../resources/constants.js';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fadeInLeft = duration => {
    return this.refs.item.fadeInLeft(duration);
  };

  fadeOutLeft = duration => {
    return this.refs.item.fadeOutLeft(duration);
  };

  fadeInRight = duration => {
    return this.refs.item.fadeInRight(duration);
  };

  fadeOutRight = duration => {
    return this.refs.item.fadeOutRight(duration);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Animatable.Text
          delay={this.props.delay}
          animation={this.props.animation}
          style={styles.itemText}
          ref={"item"}
        >
          {this.props.value}
        </Animatable.Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemText: {
    backgroundColor: "transparent",
    fontSize: 0.03*Consts.MAX_HEIGHT,
    lineHeight: 0.075*Consts.MAX_HEIGHT,
  }
});
