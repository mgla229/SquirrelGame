import React from 'react';
import LevelOne from './level';

export default function (mount) {
    return {
        heading: 'Start',
        onPress: _ => mount(<LevelOne />)
    }
}
