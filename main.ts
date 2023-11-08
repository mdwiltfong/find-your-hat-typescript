import promptSync from "prompt-sync";
import config from "./config";
const prompt = promptSync({ sigint: true });

enum CellValue {
  fieldCharacter = "░",
  pathCharacter = "*",
  hat = "^",
  hole = "O",
}

enum Direction {
  down = "d",
  up = "u",
  left = "l",
  right = "r",
}
class Field {
  private fieldMatrix: string[][] = new Array<string[]>(config.height);
  private field: string = "";
  private numOfHoles: number = config.numberOfHoles;
  constructor() {
    for (let i = 0; i < config.height; i++) {
      this.fieldMatrix[i] = new Array<string>(config.width);
    }
    this.generateField();
    this.generateHoles();
    this.generateHat();
    this.renderField();
  }
  private generateField(): void {
    for (let i = 0; i < config.height; i++) {
      for (let j = 0; j < config.width; j++) {
        this.fieldMatrix[i][j] = CellValue.fieldCharacter;
      }
    }
    this.fieldMatrix[0][0] = CellValue.pathCharacter;
  }
  private generateHoles(): void {
    for (let index = 0; index < this.numOfHoles; index++) {
      let rndRow = Math.floor(Math.random() * config.width);
      let rndCol = Math.floor(Math.random() * config.height);
      while (this.fieldMatrix[rndRow][rndCol] == CellValue.hole) {
        rndRow = Math.floor(Math.random() * config.width);
        rndCol = Math.floor(Math.random() * config.height);
      }
      this.fieldMatrix[rndRow][rndCol] = CellValue.hole;
    }
  }
  private generateHat(): void {
    let rndRow = Math.floor(Math.random() * config.width);
    let rndCol = Math.floor(Math.random() * config.height);
    while (
      this.fieldMatrix[rndRow][rndCol] == CellValue.hole ||
      this.fieldMatrix[rndRow][rndCol] == CellValue.pathCharacter
    ) {
      rndRow = Math.floor(Math.random() * config.width);
      rndCol = Math.floor(Math.random() * config.height);
    }
    this.fieldMatrix[rndRow][rndCol] = CellValue.hat;
  }
  private renderField(): void {
    this.field = this.fieldMatrix.map((row) => row.join("")).join("\n");
  }
  getField(): string {
    return this.field;
  }
}

class Game {
  private field: Field;
  private isPlaying: boolean = true;
  constructor() {
    this.field = new Field();
  }
  public play(): void {
    while (this.isPlaying) {
      console.log(this.field.getField());
      let directionInput = prompt("Which direction? ");
      this.checkUserInput(directionInput);
    }
  }
  private checkUserInput(userInput: String) {
    const sanitizedInput = userInput.toLowerCase().trim();
    const feedBack = "You must enter the letters 'd','l','u'";
    switch (sanitizedInput) {
      case Direction.down:
        break;
      case Direction.left:
        break;
      case Direction.right:
        break;
      case Direction.up:
        break;
      default:
        console.log(feedBack);
    }
  }
}

new Game().play();
