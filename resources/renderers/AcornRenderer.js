import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { CommonImages } from '../CommonImages';

export default class AcornRenderer extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width/2;
        const y = this.props.body.position.y - height/2;
        const angle = this.props.body.angle;
        return (
            <View>
            <Image style={{left: x,
                           top: y,
                           position: 'absolute',
                           width: width,
                           height: height,
                           transform: [{ rotate: angle + 'rad' }],
                           }}
                    resizeMode='stretch'
                    source={CommonImages.acorn} />
            </View>
        );
    }
}

