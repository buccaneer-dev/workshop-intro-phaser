import Phaser from 'phaser';
import { IGameConfig } from '../main';

export default class MenuScene extends Phaser.Scene {
    config!: IGameConfig;
    spaceKey!: Phaser.Input.Keyboard.Key;

    constructor(config: IGameConfig) {
        super('MenuScene');
        this.config = config;
    }

    preload() {}

    create() {
        const titleLabel = this.add.text(
            this.config.width / 2,
            200,
            'Super Frog',
            {
                font: '50px Arial',
                color: '#fff',
            },
        );
        titleLabel.setOrigin(0.5, 0.5);

        const startLabel = this.add.text(
            this.config.width / 2,
            400,
            'press space key to start',
            { font: '25px Arial', color: '#fff' },
        );
        startLabel.setOrigin(0.5, 0.5);

        this.spaceKey = this.input.keyboard!.addKey('space');

        this.cameras.main.setBackgroundColor('#3CB043');
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start('PlayScene');
        }
    }
}
