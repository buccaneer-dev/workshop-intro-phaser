import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    velocityX: number;
    velocityY: number;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    jumpCount: number;
    consecutiveJumps: number;
    isAlive: boolean;
    hitVelocity: number;
    jumpSound:
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound
        | Phaser.Sound.WebAudioSound;
    hitSound:
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound
        | Phaser.Sound.WebAudioSound;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.velocityX = 200;
        this.velocityY = 400;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.isAlive = true;
        this.hitVelocity = 100;

        this.body!.gravity.y = 500;

        this.setSize(22, 26);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);

        this.cursors = this.scene.input.keyboard!.createCursorKeys();

        this.createAnimations();

        this.jumpSound = this.scene.sound.add('jump');
        this.hitSound = this.scene.sound.add('hit');

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    die() {
        if(!this.isAlive) return;

        this.isAlive = false;
        this.body!.checkCollision.none = true;

        this.setVelocity(
            this.body!.touching.right ? -this.hitVelocity : this.hitVelocity,
            -this.hitVelocity,
        );

        this.play('hit', true);
        this.hitSound.play();
    }

    update(): void {
        if (!this.isAlive || !this.body) {
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
            this.jumpSound.play();
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
        this.scene.anims.create({
            key: 'hit',
            frames: this.anims.generateFrameNumbers('player-hit', {
                start: 0,
                end: 6,
            }),
            frameRate: 20,
            repeat: 0,
        });
    }
}
