import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Consts } from '../constants';

export default class ScoreBoardRenderer extends Component {
    render() {
        let score = this.props.score;
        return (
            <View style={styles.scoreBoard}>
                <Text style={styles.score}> {score} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scoreBoard: {
        height: Consts.SCOREBOARD_HEIGHT,
        width: Consts.SCOREBOARD_WIDTH,
        position: 'absolute',
        top: Consts.SCOREBOARD_HEIGHT,
        left: Consts.MAX_WIDTH - Consts.SCOREBOARD_WIDTH,
    },
    score: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});
