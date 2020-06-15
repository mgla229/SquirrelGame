import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Consts } from '../constants';

export default class TimerRenderer extends Component {
    componentDidMount() {
        this.props.levelTimer.startTimer();
    }

	render() {
		return (
			<View style = {styles.timeContainer}>
				<Text style = {styles.time}>
					Time: {this.props.levelTimer.time}
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	timeContainer: {
		height: Consts.TIMER_HEIGHT,
		width: Consts.TIMER_WIDTH,
		position: "absolute",
		top: Consts.TIMER_HEIGHT,
		left: Consts.TIMER_WIDTH/2,
	},
	time: {
		fontSize: 30,
		fontWeight: "bold"
	}, 
});
