import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    gravity: number;
    speed: number;
    alive: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.alive = true;

        this.gravity = 500;
        this.speed = 150;

        this.body!.gravity.y = this.gravity;
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);

        this.setListeners();
    }

    setListeners() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.scene.events.on(
            Phaser.Scenes.Events.DESTROY,
            () => {
                this.alive = false;
            },
            this,
        );
        this.scene.events.on('shutdown', this.destroy, this);
    }

    update(_time: number, _delta: number) {}

    hit(
        _player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
    ) {}
}
