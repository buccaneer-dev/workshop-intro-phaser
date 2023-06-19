import Phaser from 'phaser';
import Player from '../entities/Player';
import Mushroom from '../entities/Mushroom';
import Enemies from '../groups/Enemies';
import Colliders from '../groups/Colliders';
import Fruits from '../groups/Fruits';
import Fruit from '../entities/Fruit';
import { IGameConfig } from '../main';

export interface IGameZones {
    start: Phaser.Types.Tilemaps.TiledObject;
    end: Phaser.Types.Tilemaps.TiledObject;
    spawns: Phaser.Types.Tilemaps.TiledObject[];
    colliders: Phaser.Types.Tilemaps.TiledObject[];
}

export default class PlayScene extends Phaser.Scene {
    platforms!: Phaser.Tilemaps.TilemapLayer;
    scoreLabel!: Phaser.GameObjects.Text;
    player!: Player;
    config!: IGameConfig;
    enemies!: Enemies;
    colliders!: Colliders;
    fruits!: Fruits;
    score!: number;

    constructor(config: IGameConfig) {
        super('PlayScene');
        this.config = config;
    }

    // called once after preload for initialization
    create() {
        const layers = this.createLevel();
        this.platforms = layers.platforms!;
        const zones = this.getZones(layers.zones!);
        this.enemies = this.createEnemies(zones.spawns);
        this.colliders = this.createEnemyColliders(zones.colliders);

        this.player = new Player(this, zones.start.x!, zones.start.y!);

        this.fruits = this.createFruits(layers.fruit!.objects);

        this.addColliders();

        this.score = 0;
        this.scoreLabel = this.add.text(90, 60, `Score: ${this.score}`, {
            font: '20px Arial',
            color: '#000',
        });

        this.scoreLabel.setScrollFactor(0);

        this.setupCamera();
    }

    createLevel() {
        const map = this.make.tilemap({
            key: `level_0`,
        });
        const tileset = map.addTilesetImage('Terrain', 'terrain_tiles');
        const platforms = map.createLayer('Platforms', tileset!);
        const zones = map.getObjectLayer('Zones');
        const fruit = map.getObjectLayer('Fruit');

        return { platforms, zones, fruit };
    }

    addColliders() {
        this.platforms.setCollisionByProperty({ collide: true });
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.enemies, this.colliders);
        this.physics.add.collider(
            this.player,
            this.enemies,
            this.onPlayerHit,
            undefined,
            this,
        );
        this.physics.add.overlap(
            this.player,
            this.fruits,
            this.collectFruit,
            undefined,
            this,
        );
    }
    
    getZones(zones: Phaser.Tilemaps.ObjectLayer) {
        const objects = zones.objects;
        return {
            start: objects.find((o) => o.name === 'start')!,
            spawns: objects.filter((o) => o.name === 'spawn')!,
            colliders: objects.filter((o) => o.name === 'collider')!,
        };
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
        const enemies = new Enemies(this);
        spawns.forEach((s) => {
            let enemy;
            switch (s.type) {
                case 'Mushroom':
                default:
                    enemy = new Mushroom(this, s.x!, s.y!);
            }
            enemies.add(enemy);
        });
        return enemies;
    }

    createFruits(fruitsObj: Phaser.Types.Tilemaps.TiledObject[]) {
        const fruits = new Fruits(this);

        fruitsObj.forEach((s) => {
            fruits.add(new Fruit(this, s.x!, s.y!, 'cherry'));
        });
        return fruits;
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
        fruit.destroy();
        this.score += 10;
        this.scoreLabel.setText(`Score: ${this.score}`);
    }

    createEnemyColliders(boxes: Phaser.Types.Tilemaps.TiledObject[]) {
        const colliders = new Colliders(this);
        boxes.forEach((c) => {
            const collider = this.physics.add
                .staticSprite(c.x!, c.y!, 'cherry')
                .setAlpha(0)
                .setSize(32, 32)
                .setOrigin(0.5, 1);
            colliders.add(collider);
        });
        return colliders;
    }

    // called 60 times per second after create for game logic
    update() {
        this.physics.collide(this.player, this.platforms);
        this.physics.collide(this.enemies, this.platforms);
        this.physics.collide(this.player, this.enemies);
        this.physics.collide(this.enemies, this.colliders);
        this.physics.overlap(this.player, this.fruits);
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
