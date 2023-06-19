import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.createAnimations();
    }

    die() {
    }

    update(): void {
        if (!this.body) {
            return;
        }
        this.play('idle',true)
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player-idle', {
                start: 0,
                end: 10,
            }),
            frameRate: 20,
            repeat: -1,
        });
    }
}
