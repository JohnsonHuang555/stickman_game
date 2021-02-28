import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  constructor () {
    super('game')
  }

  preload() {
    this.load.atlas('stickman', 'assets/stickman.png', 'assets/stickman.json')
    this.load.image('tiles', 'assets/sheet.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/game.json')
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap' })
    const tileset = map.addTilesetImage('world', 'tiles')
    map.createLayer('ground', tileset)

    this.cameras.main.scrollY = 300
  }
}