import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    velocityX: number;
    velocityY: number;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    jumpCount: number;
    consecutiveJumps: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.velocityX = 200;
        this.velocityY = 400;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;

        this.body!.gravity.y = 500;

        this.setSize(22, 26);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);

        this.cursors = this.scene.input.keyboard!.createCursorKeys();

        this.createAnimations();

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    die() {
    }

    update(): void {
        if (!this.body) {
            return;
        }

        const { left, right, up } = this.cursors;
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
        const isOnFloor = this.body!.blocked.down;
        const canWallJump = this.body!.blocked.right || this.body!.blocked.left;

        if (left.isDown) {
            this.setVelocityX(-this.velocityX);
            this.setFlipX(true);
        } else if (right.isDown) {
            this.setVelocityX(this.velocityX);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }

        if (
            isUpJustDown &&
            (this.jumpCount < this.consecutiveJumps || canWallJump)
        ) {
            this.setVelocityY(-this.velocityY);
            this.jumpCount++;
        }

        if (isOnFloor) {
            this.jumpCount = 0;
        } else {
            this.play(this.body!.velocity.y < 0 ? 'jump' : 'fall', true);
            return;
        }

        if (this.body!.velocity.x !== 0) {
            this.play('run', true);
        } else {
            this.play('idle', true);
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player-run', {
                start: 0,
                end: 11,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player-idle', {
                start: 0,
                end: 10,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player-jump', {
                start: 0,
                end: 0,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('player-fall', {
                start: 0,
                end: 0,
            }),
            frameRate: 20,
            repeat: -1,
        });
    }
}
