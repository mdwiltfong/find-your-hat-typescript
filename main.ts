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
  private characterRowLocation: number = 0 ;
  private characterColumnLocation: number = 0;
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
      this.generateRndPositions(CellValue.hole);
    }
  }
  private generateHat(): void {
    this.generateRndPositions(CellValue.hat);
  }
  private generateRndPositions(cellValue: string): void {
    let rndRow = Math.floor(Math.random() * config.width);
    let rndCol = Math.floor(Math.random() * config.height);
    while (
      this.fieldMatrix[rndRow][rndCol] == CellValue.hole ||
      this.fieldMatrix[rndRow][rndCol] == CellValue.pathCharacter
    ) {
      rndRow = Math.floor(Math.random() * config.width);
      rndCol = Math.floor(Math.random() * config.height);
    }
    this.fieldMatrix[rndRow][rndCol] = cellValue;
  }
  private renderField(): void {
    this.field = this.fieldMatrix.map((row) => row.join("")).join("\n");
  }
  getField(): string {
    return this.field;
  }
  
  updatePath(inputDirection: string): boolean {
    const convertInputDirection = inputDirection.toString().toLocaleLowerCase();
    switch (convertInputDirection) {
      case Direction.up:
        if (this.characterRowLocation === 0) {
          console.log(`Can't go up.`);
          this.renderField();
          return true;
        } else {
          this.characterRowLocation--;
          if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hole) {
            console.log('You fell in a hole... Game Over!');
            return false;
          } else if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hat) {
            console.log('You won!');
            return false;
          }
          this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] = CellValue.pathCharacter;
          this.fieldMatrix[this.characterRowLocation + 1][this.characterColumnLocation] = CellValue.fieldCharacter;
          this.renderField();
          return true;
        }
      case Direction.down:
        if (this.characterRowLocation === this.fieldMatrix.length - 1) {
          console.log(`Can't go down.`);
          this.renderField();
          return true;
        } else {
          this.characterRowLocation++;
          if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hole) {
            console.log('You fell in a hole... Game Over!');
            return false;
          } else if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hat) {
            console.log('You won!');
            return false;
          }
          this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] = CellValue.pathCharacter;
          this.fieldMatrix[this.characterRowLocation - 1][this.characterColumnLocation] = CellValue.fieldCharacter;
          this.renderField();
          return true;
        }
      case Direction.right:
        if (this.characterColumnLocation === this.fieldMatrix.length - 1) {
          console.log(`Can't go right.`);
          this.renderField();
          return true;
        } else {
          this.characterColumnLocation++;
          if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hole) {
            console.log('You fell in a hole... Game Over!');
            return false;
          } else if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hat) {
            console.log('You won!');
            return false;
          }
          this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] = CellValue.pathCharacter;
          this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation - 1] = CellValue.fieldCharacter;
          this.renderField();
          return true;
        }
      case Direction.left:
        if (this.characterColumnLocation === 0) {
          console.log(`Can't go left.`);
          this.renderField();
          return true;
        } else {
          this.characterColumnLocation--;
          if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hole) {
            console.log('You fell in a hole... Game Over!');
            return false;
          } else if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hat) {
            console.log('You won!');
            return false;
          }
          this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] = CellValue.pathCharacter;
          
          this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation + 1] = CellValue.fieldCharacter;
          this.renderField();
          return true;
        }
      default:
        console.log(`Invalid key, try using the keys ${Direction.down} (down), ${Direction.up} (up), ${Direction.right} (right) or ${Direction.left} (left)`);
        return true;
    } 
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
      this.isPlaying = this.field.updatePath(directionInput);
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
