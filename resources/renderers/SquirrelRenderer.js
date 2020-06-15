import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { CommonImages } from '../CommonImages';

export default class SquirrelRenderer extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width/2;
        const y = this.props.body.position.y - height/2;
        const direction = this.props.handler.direction;
        let image = CommonImages['playerSquirrel' + this.props.handler.pose.toString()];
        return (
            <View>
            <Image style={{left: x,
                           top: y,
                           position: 'absolute',
                           width: width,
                           height: height,
                           transform: [
                            { rotateY: (direction === 'right' ? 180 : 0) + 'deg' }
                           ]}} 
                   resizeMode='stretch' 
                   source={image} />
            </View>
        );
    }
}
