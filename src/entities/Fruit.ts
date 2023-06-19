import Phaser from 'phaser';

export default class Fruit extends Phaser.Physics.Arcade.Sprite {
    key: string;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key);
        this.key = key;

        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.setOrigin(0.5, 0.5);
        this.createAnimations();

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    createAnimations() {
        this.scene.anims.create({
            key: this.key,
            frames: this.anims.generateFrameNumbers(this.key, {
                start: 0,
                end: 16,
            }),
            frameRate: 20,
            repeat: -1,
        });
    }

    update(_time: number, _delta: number) {
        if (this.body) {
            this.play(this.key, true);
        }
    }
    pickup() {
        this.destroy();
    }
}
