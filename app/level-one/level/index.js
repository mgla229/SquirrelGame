import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Image, Text, View, Alert, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

// COMMON RESOURCES

import LevelTimerSingleton from '../../../resources/LevelTimer';
import { Consts } from '../../../resources/constants';
import { CommonImages } from '../../../resources/CommonImages';
import PauseButton from '../../../resources/pauseButton';
import AcornHandler from '../../../resources/AcornHandler';
import SquirrelPoseHandler from '../../../resources/SquirrelPoseHandler';
import SquirrelRenderer from '../../../resources/renderers/SquirrelRenderer';
import WallRenderer from '../../../resources/renderers/WallRenderer';
import ScoreBoardRenderer from '../../../resources/renderers/ScoreBoardRenderer';
import TimerRenderer from '../../../resources/renderers/TimerRenderer';
import CreateAcorns from '../../../resources/systems/CreateAcorns';
import { AcornHitsSquirrel, AcornHitsFloor } from '../../../resources/systems/AcornCollisions';
import Physics from '../../../resources/systems/Physics';
import MoveSquirrel from '../../../resources/systems/MoveSquirrel';
import GameStop from '../../../resources/systems/GameStop';
import GarbageCollection from '../../../resources/systems/GarbageCollection';

export default class LevelOne extends Component {

  constructor(props) {
    super(props);
    this.state = { running: true, paused: false, levelTime: 0 };
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

	
  setupWorld = () => {
      // Get constants
      const width = Consts.MAX_WIDTH;
      const height = Consts.MAX_HEIGHT;
      const squirrelSize = Consts.SQUIRREL_SIZE;
      const acornSignal = 80;
      const squirrelPoseSwitchSignal = 7;

      // Set up physics engine
      let engine = Matter.Engine.create({ enableSleeping: false });
      let world = engine.world; 

      // Set up entity bodies
      let squirrelBody = Matter.Bodies.rectangle(width/2, height/2, squirrelSize, squirrelSize, {
        collisionFilter: { 
            category: Consts.CollisionCategorySquirrel,
            mask: Consts.CollisionCategoryFloor | 
                  Consts.CollisionCategoryWall | 
                  Consts.CollisionCategoryAcorn
      }});
      let floor = Matter.Bodies.rectangle(width/2, height - squirrelSize/2, width - 2, squirrelSize, {
        isStatic: true,
        collisionFilter: {
            category: Consts.CollisionCategoryFloor,
            mask: Consts.CollisionCategorySquirrel | Consts.CollisionCategoryAcorn
      }});
      let wallLeft = Matter.Bodies.rectangle(0, height/2, 0.75 * squirrelSize, height, {
        isStatic: true,
        collisionFilter: {
            category: Consts.CollisionCategoryWall,
            mask: Consts.CollisionCategorySquirrel
      }});
      let wallRight = Matter.Bodies.rectangle(width, height/2, 0.75 * squirrelSize, height, { 
        isStatic: true,
        collisionFilter: {
            category: Consts.CollisionCategoryWall,
            mask: Consts.CollisionCategorySquirrel
      }});

      Matter.World.add(world, [squirrelBody, floor, wallLeft, wallRight]);

      return {
        acorn: { handler: new AcornHandler(acornSignal) },
        physics: { engine: engine, world: world },
        scoreBoard: { score: 0, renderer: ScoreBoardRenderer },
		timer: { levelTimer: new LevelTimerSingleton(), renderer: TimerRenderer },
        squirrel: { body: squirrelBody, 
                    size: [squirrelSize, squirrelSize], 
                    handler: new SquirrelPoseHandler(squirrelPoseSwitchSignal),
                    renderer: SquirrelRenderer },
        floor: { body: floor, size: [width-2, squirrelSize], renderer:  WallRenderer },
        wallLeft: { body: wallLeft, size: [0.75 * squirrelSize, height], color: '#fff', renderer: WallRenderer },
        wallRight: { body: wallRight, size: [0.75 * squirrelSize, height], color: '#fff', renderer: WallRenderer },
      }
  }

  // Handle Game ending
  onEvent = (e) => {
    if(e.type === 'game-over') {
        this.gameOverText = 'Game Over';
        this.setState({ running: false });
    }
    if(e.type === 'success') {
        this.gameOverText = 'Level complete!';
        this.setState({ running: false });
    }
    if(e.type === 'pause') {
        this.setState({ running: false, paused: true });
    }
  }

  // Pause game
  pauseGame = () => {
    let levelTimer = new LevelTimerSingleton();
    this.setState({ levelTime: levelTimer.time });
    this.gameEngine.dispatch({ type: 'pause' });
  }

  // Resume from pause
  resume = () => {
    this.setState({ running: true, paused: false });
    let levelTimer = new LevelTimerSingleton();
    levelTimer.time = this.state.levelTime;
  }

  // Handle a reset
  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({ running: true });
    let levelTimer = new LevelTimerSingleton();
    levelTimer.resetTimer();
  }

  render() {
      return (
        <ImageBackground source={CommonImages.forestBackground} style={styles.imageContainer}>

            <GameEngine 
                ref={(ref) => { this.gameEngine = ref }}
                style={styles.gameContainer}
                systems={[ Physics, 
                           MoveSquirrel, 
                           CreateAcorns, 
                           GameStop, 
                           AcornHitsSquirrel, 
                           AcornHitsFloor, 
                           GarbageCollection
                        ]}
                running={this.state.running}
                onEvent={this.onEvent}
                entities={ this.entities }
            />

            <PauseButton onPress={this.pauseGame} />

            {!this.state.running && !this.state.paused && 
            <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
                <View style={styles.fullScreen}>
                    <Text style={styles.gameOverText}>{this.gameOverText}</Text>
                </View>
            </TouchableOpacity>}

            {!this.state.running && this.state.paused &&
            <TouchableOpacity style={styles.fullScreenButton} onPress={this.resume}>
                <View style={styles.fullScreen}>
                    <Image source={CommonImages.play} />
                </View>
            </TouchableOpacity>}

        </ImageBackground>
      );
  }
  
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Consts.MAX_WIDTH,
    height: Consts.MAX_HEIGHT
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Consts.MAX_WIDTH,
    height: Consts.MAX_HEIGHT,
  },
});
