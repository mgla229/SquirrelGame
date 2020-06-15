import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { Consts } from '../../resources/constants';

export default class Heading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fadeInLeft = duration => {
    return this.refs.heading.fadeInLeft(duration);
  };

  fadeOutLeft = duration => {
    return this.refs.heading.fadeOutLeft(duration);
  };

  fadeInRight = duration => {
    return this.refs.heading.fadeInRight(duration);
  };

  fadeOutRight = duration => {
    return this.refs.heading.fadeOutRight(duration);
  };

  render() {
    return (
      <Animatable.View
        ref={"heading"}
        animation={this.props.animation}
        style={styles.container}
      >
        <Text style={styles.text}>
          {this.props.value
            .substring(
              this.props.value.indexOf(".") + 1,
              this.props.value.length
            )
            .trim()
            .toUpperCase()}
        </Text>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.005*Consts.MAX_WIDTH,
    borderColor: "#FFF"
  },
  text: {
    backgroundColor: "transparent",
    letterSpacing: 0.013*Consts.MAX_WIDTH,
    fontSize: 0.03*Consts.MAX_HEIGHT,
    lineHeight: 0.05*Consts.MAX_HEIGHT,
    fontWeight: "bold"
  }
});
