import Phaser from 'phaser';
import { IGameConfig } from '../main';

export default class MenuScene extends Phaser.Scene {
    config!: IGameConfig;

    constructor(config: IGameConfig) {
        super('MenuScene');
        this.config = config;
    }

    preload() {}

    create() {
    }

    update() {
    }
}
