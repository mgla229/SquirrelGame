import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Consts } from '../../resources/constants';

export default class Title extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          THE <Text style={styles.bold}>NATURE</Text> OF
        </Text>
        <Text style={[styles.titleText, styles.small]}>— CODE —</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0.105*Consts.MAX_HEIGHT,
    alignItems: "center",
  },
  titleText: {
    fontSize: 0.038*Consts.MAX_HEIGHT,
    backgroundColor: "transparent",
    letterSpacing: 0.013*Consts.MAX_HEIGHT,
  },
  bold: {
    fontWeight: "900"
  },
  small: {
    fontSize: 0.038*Consts.MAX_HEIGHT*0.06,
    lineHeight: 0.067*Consts.MAX_HEIGHT, 
  }
});
