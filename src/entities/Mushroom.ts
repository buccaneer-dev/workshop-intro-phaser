import Phaser from 'phaser';
import Enemy from './Enemy';

export default class Mushroom extends Enemy {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'mushroom');

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
    }
}
