import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  private stickman!: Phaser.Physics.Matter.Sprite

  constructor () {
    super('game')
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.atlas('stickman', 'assets/stickman.png', 'assets/stickman.json')
    this.load.image('tiles', 'assets/sheet.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/game.json')
  }

  create() {
    this.createStickmanAnimations()
    const map = this.make.tilemap({ key: 'tilemap' })
    const tileset = map.addTilesetImage('world', 'tiles')

    const ground = map.createLayer('ground', tileset)
    ground.setCollisionByProperty({ collides: true })

    this.matter.world.convertTilemapLayer(ground)
    const { width, height } = this.scale
    this.stickman = this.matter.add.sprite(width * 0.5, height * 0.5, 'stickman')
      .play('player-idle')

    this.stickman.setScale(0.7).setFixedRotation()

    this.cameras.main.startFollow(this.stickman)
  }

  update() {
    const speed = 5
    if (this.cursors.left.isDown) {
      this.stickman.flipX = true
      this.stickman.setVelocityX(-speed)
      this.stickman.play('player-walk', true)
    } else if (this.cursors.right.isDown) {
      this.stickman.flipX = false
      this.stickman.setVelocityX(speed)
      this.stickman.play('player-walk', true)
    } else {
      this.stickman.setVelocityX(0)
      this.stickman.play('player-idle', true)
    }
  }

  private createStickmanAnimations() {
    this.anims.create({
      key: 'player-idle',
      frames: [{ key: 'stickman', frame: 'stickman.png' }]
    })
    this.anims.create({
      key: 'player-walk',
      frameRate: 10,
      frames: this.anims.generateFrameNames('stickman', {
        start: 2,
        end: 9,
        prefix: 'stickman',
        suffix: '.png'
      }),
      repeat: -1,
    })
  }
}