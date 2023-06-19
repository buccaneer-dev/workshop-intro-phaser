import Phaser from 'phaser';
import Player from '../entities/Player';
import { IGameConfig } from '../main';

export interface IGameZones {
    start: Phaser.Types.Tilemaps.TiledObject;
    end: Phaser.Types.Tilemaps.TiledObject;
    spawns: Phaser.Types.Tilemaps.TiledObject[];
    colliders: Phaser.Types.Tilemaps.TiledObject[];
}

export default class PlayScene extends Phaser.Scene {
    platforms!: Phaser.Tilemaps.TilemapLayer;
    player!: Player;
    config!: IGameConfig;

    constructor(config: IGameConfig) {
        super('PlayScene');
        this.config = config;
    }

    // called once after preload for initialization
    create() {
        const layers = this.createLevel();
        this.platforms = layers.platforms!;
       
        this.player = new Player(this, 50,50);

        this.addColliders();

        this.setupCamera();
    }

    createLevel() {
        const map = this.make.tilemap({
            key: `level_0`,
        });
        const tileset = map.addTilesetImage('Terrain', 'terrain_tiles');
        const platforms = map.createLayer('Platforms', tileset!);

        return { platforms };
    }

    addColliders() {
        this.platforms.setCollisionByProperty({ collide: true });
        this.physics.add.collider(this.player, this.platforms);
    }
    
    getZones(zones: Phaser.Tilemaps.ObjectLayer) {
    }

    setupCamera() {
        const { height, width, mapOffset, zoom } = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 300);
        this.cameras.main
            .setBounds(0, 0, width + mapOffset, height)
            .setZoom(zoom);
        this.cameras.main.startFollow(this.player);
    }

    createEnemies(spawns: Phaser.Types.Tilemaps.TiledObject[]) {
    }

    createFruits(fruitsObj: Phaser.Types.Tilemaps.TiledObject[]) {

    }

    createEnv(envObj: Phaser.Types.Tilemaps.TiledObject[]) {

    }

    collectFruit(
        _player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        fruit:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
    ) {

    }

    createEnemyColliders(boxes: Phaser.Types.Tilemaps.TiledObject[]) {

    }

    // called 60 times per second after create for game logic
    update() {
        this.physics.collide(this.player, this.platforms);
    }

    onPlayerHit(
        _player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        _enemy:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
    ) {
        this.player.die();
    }

    createEndOfLevel(x: number, y: number) {
       
    }
}
