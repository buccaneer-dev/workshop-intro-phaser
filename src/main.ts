import Phaser from 'phaser';
import PlayScene from './scenes/Play';
import LoadScene from './scenes/Load';
import MenuScene from './scenes/Menu';

export interface IGameConfig extends Phaser.Types.Core.GameConfig {
    mapOffset: number;
    width: number;
    height: number;
    zoom: number;
    levels: number;
}

const MAP_WIDTH = 1600;
const WIDTH = 1024;
const HEIGHT = 640;

const SHARED_CONFIG = {
    mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
    width: WIDTH,
    height: HEIGHT,
    zoom: 1.2,
    levels: 2,
};

const scenes = [LoadScene, MenuScene, PlayScene];
const createScene = (Scene: any) => new Scene(SHARED_CONFIG);
const initScenes = () => scenes.map(createScene);

const config: IGameConfig = {
    type: Phaser.AUTO,
    parent: 'app',
    ...SHARED_CONFIG,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true,
        },
    },
    pixelArt: true,
    backgroundColor: '#a5e5ff',
    scene: initScenes(),
    scale: {
        parent: 'app',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        max: {
            width: 1024,
            height: 640,
        },
    },
};

export default new Phaser.Game(config);
