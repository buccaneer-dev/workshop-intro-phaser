import Phaser from 'phaser';
import { IGameConfig } from '../main';

export default class LoadScene extends Phaser.Scene {
    config!: IGameConfig;

    constructor(config: IGameConfig) {
        super('LoadScene');
        this.config = config;
    }

    preload() {
        this.load.image('terrain_tiles', './assets/tilesets/Terrain.png');
        this.load.tilemapTiledJSON('level_0', './assets/tilemaps/level_0.json');

        this.load.spritesheet('cherry', './assets/fruit/Cherries.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('player-idle', './assets/player/Idle.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('player-run', './assets/player/Run.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('player-jump', './assets/player/Jump.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('player-fall', './assets/player/Fall.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('player-hit', './assets/player/Hit.png', {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet('mushroom-run', './assets/mushroom/Run.png', {
            frameWidth: 32,
            frameHeight: 32,
        });

        const label = this.add.text(
            this.config.width / 2,
            this.config.height / 2,
            'loading',
        );
        label.setOrigin(0.5, 0.5);
    }

    create() {
        this.scene.start('PlayScene');
    }
}
