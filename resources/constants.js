import { Dimensions } from 'react-native';

const Consts = {
    // Size Constants
    MAX_WIDTH: Dimensions.get('window').width,
    MAX_HEIGHT: Dimensions.get('window').height,
    SCOREBOARD_HEIGHT: Dimensions.get('window').height/12,
    SCOREBOARD_WIDTH: Dimensions.get('window').width/6,
    SQUIRREL_SIZE: Math.trunc(Math.max(Dimensions.get('window').width,
                                 Dimensions.get('window').height) * 0.095),
    ACORN_SIZE: Math.trunc(Math.max(Dimensions.get('window').width,
                                 Dimensions.get('window').height) * 0.025),
	TIMER_HEIGHT: Dimensions.get("window").height/12,
	TIMER_WIDTH: Dimensions.get("window").width/5,

    // Collision Categories
    CollisionCategorySquirrel: 0x0001, 
    CollisionCategoryFloor: 0x0002,
    CollisionCategoryWall: 0x0004,
    CollisionCategoryAcorn: 0x0008,
	
	// Gameplay Constants
	TIME_START: 120, //in seconds
    SQUIRREL_JUMP_HEIGHT: -20,
}

export { Consts } 
