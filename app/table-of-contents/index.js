import React, { Component } from "react";
import { ImageBackground, StatusBar, View, StyleSheet, ScrollView, Image } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from 'matter-js';

// COMMON RESOURCES

import { Consts } from '../../resources/constants';
import AcornHandler from '../../resources/AcornHandler';
import { CommonImages } from '../../resources/CommonImages';
import WallRenderer from '../../resources/renderers/WallRenderer';
import Physics from '../../resources/systems/Physics';
import { AcornHitsFloor } from '../../resources/systems/AcornCollisions';

// LOCAL RESOURCES

import Title from "./title";
import Heading from "./heading";
import Item from "./item";
import CreateAcorns from './systems/CreateAcorns';

export default class TableOfContents extends Component {
  constructor(props) {
    super(props);
    this.entities = this.setupWorld();
    this.state = {
      heading: props.contents.heading,
      items: props.contents.items,
      animation: "fadeInRight"
    };
  }

  setupWorld = () => {
      const width = Consts.MAX_WIDTH;
      const height = Consts.MAX_HEIGHT;
      const squirrelSize = Consts.SQUIRREL_SIZE;
      const acornSignal = 20;

      let engine = Matter.Engine.create({ enableSleeping: false });
      let world = engine.world; 

      let floor = Matter.Bodies.rectangle(width/2, height - squirrelSize/2, width - 2, squirrelSize, {
        isStatic: true,
        collisionFilter: {
            category: Consts.CollisionCategoryFloor,
            mask: Consts.CollisionCategorySquirrel | Consts.CollisionCategoryAcorn
      }});

      Matter.World.add(world, [floor]);

      return { 
        acorn: { handler: new AcornHandler(acornSignal) },
        floor: { body: floor, size: [width-2, squirrelSize], renderer:  WallRenderer },
        physics: { engine: engine, world: world }
      }
  }

  onItemPress = async data => {
    if (data.items) {
      let refs = [this.state.heading, "back"].concat(
        this.state.items.map(x => x.heading)
      );
      let tasks = refs
        .map(r => this.refs[r])
        .filter(r => r)
        .map(r => r.fadeOutLeft(400));

      await Promise.all(tasks);

      this.setState({
        heading: data.heading,
        items: data.items,
        parent: Object.assign({}, this.state),
        animation: "fadeInRight"
      });
    } else if (data.onPress) {
      data.onPress();
    }
  };

  render() {
    return (
        <ImageBackground source={CommonImages.forestBackground} style={styles.imageContainer}>

            <GameEngine
              ref={"engine"}
              running={!this.props.sceneVisible}
              systems={[ Physics, CreateAcorns, AcornHitsFloor ]}
              entities={ this.entities }
            >

              <StatusBar hidden={false} barStyle={"light-content"} />


              <ScrollView contentContainerStyle={styles.container}>


                <View
                  style={[
                    styles.headingContainer,
                  ]}
                >

                  <Heading
                    animation={this.state.animation}
                    key={this.state.heading}
                    ref={this.state.heading}
                    value={this.state.heading}
                  />

                </View>

                {this.state.items.map((x, i) => {
                  return (
                    <Item
                      key={x.heading}
                      ref={x.heading}
                      value={x.heading}
                      animation={this.state.animation}
                      delay={++i * 75}
                      onPress={_ => this.onItemPress(x)}
                    />
                  );
                })}

              </ScrollView>

            </GameEngine>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%"
  },
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
  headingContainer: {
    alignItems: "center",
    marginTop: "4.5%",
    marginBottom: "2.25%",
    alignSelf: "center",
    flexDirection: "row"
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
