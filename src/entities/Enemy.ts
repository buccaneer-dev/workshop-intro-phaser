import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    gravity: number;
    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.gravity = 500;
        this.speed = 150;

        this.body!.gravity.y = this.gravity;
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(_time: number, _delta: number) {}

    hit(
        _player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
    ) {}
}
