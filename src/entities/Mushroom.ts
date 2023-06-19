import Phaser from 'phaser';
import Enemy from './Enemy';

export default class Mushroom extends Enemy {
    velocityX: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'mushroom');

        this.velocityX = 30;
        this.setSize(28, 22);
        this.setOffset(2, 8);

        this.setBounceX(1);
        this.setVelocityX(Math.random() < 0.5 ? -this.velocityX : this.velocityX);

        this.createAnimations();

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        if (!this.body) return;

        if (this.body!.velocity.x > 0) {
            this.setFlipX(true);
        } else {
            this.setFlipX(false);
        }

        this.play('m-run', true);
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'm-run',
            frames: this.anims.generateFrameNumbers('mushroom-run', {
                start: 0,
                end: 13,
            }),
            frameRate: 20,
            repeat: -1,
        });
    }
}
