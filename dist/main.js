"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const config_1 = __importDefault(require("./config"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
var CellValue;
(function (CellValue) {
    CellValue["fieldCharacter"] = "\u2591";
    CellValue["pathCharacter"] = "*";
    CellValue["hat"] = "^";
    CellValue["hole"] = "O";
})(CellValue || (CellValue = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["feedBack"] = "You must enter the letters 'd','l','u'";
    ErrorMessages["invalidDirection"] = "Invalid key, try using the keys d (down), u (up), r (right) or l (left)";
    ErrorMessages["invalidMove"] = "Invalid Move ";
    ErrorMessages["gameOver"] = "You fell in a hole... Game Over!";
    ErrorMessages["youWon"] = "You won!";
})(ErrorMessages || (ErrorMessages = {}));
var Direction;
(function (Direction) {
    Direction["down"] = "d";
    Direction["up"] = "u";
    Direction["left"] = "l";
    Direction["right"] = "r";
})(Direction || (Direction = {}));
class Field {
    constructor() {
        this.fieldMatrix = new Array(config_1.default.height);
        this.field = "";
        this.numOfHoles = config_1.default.numberOfHoles;
        this.characterRowLocation = 0;
        this.characterColumnLocation = 0;
        for (let i = 0; i < config_1.default.height; i++) {
            this.fieldMatrix[i] = new Array(config_1.default.width);
        }
        this.generateField();
        this.generateHoles();
        this.generateHat();
        this.renderField();
    }
    generateField() {
        for (let i = 0; i < config_1.default.height; i++) {
            for (let j = 0; j < config_1.default.width; j++) {
                this.fieldMatrix[i][j] = CellValue.fieldCharacter;
            }
        }
        this.fieldMatrix[0][0] = CellValue.pathCharacter;
    }
    generateHoles() {
        for (let index = 0; index < this.numOfHoles; index++) {
            this.generateRndPositions(CellValue.hole);
        }
    }
    generateHat() {
        this.generateRndPositions(CellValue.hat);
    }
    generateRndPositions(cellValue) {
        let rndRow = Math.floor(Math.random() * config_1.default.width);
        let rndCol = Math.floor(Math.random() * config_1.default.height);
        while (this.fieldMatrix[rndRow][rndCol] == CellValue.hole ||
            this.fieldMatrix[rndRow][rndCol] == CellValue.pathCharacter) {
            rndRow = Math.floor(Math.random() * config_1.default.width);
            rndCol = Math.floor(Math.random() * config_1.default.height);
        }
        this.fieldMatrix[rndRow][rndCol] = cellValue;
    }
    renderField() {
        this.field = this.fieldMatrix.map((row) => row.join("")).join("\n");
    }
    getField() {
        return this.field;
    }
    updatePath(inputDirection) {
        const convertInputDirection = inputDirection.toString().toLocaleLowerCase();
        switch (convertInputDirection) {
            case Direction.up:
                if (this.characterRowLocation === 0) {
                    console.log(`Can't go up.`);
                    this.renderField();
                    return true;
                }
                else {
                    this.characterRowLocation--;
                    if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hole) {
                        console.log("You fell in a hole... Game Over!");
                        return false;
                    }
                    else if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hat) {
                        console.log("You won!");
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
                }
                else {
                    this.characterRowLocation++;
                    if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hole) {
                        console.log("You fell in a hole... Game Over!");
                        return false;
                    }
                    else if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hat) {
                        console.log("You won!");
                        return false;
                    }
                    this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] = CellValue.pathCharacter;
                    this.fieldMatrix[this.characterRowLocation - 1][this.characterColumnLocation] = CellValue.pathCharacter;
                    this.renderField();
                    return true;
                }
            case Direction.right:
                if (this.characterColumnLocation === this.fieldMatrix.length - 1) {
                    console.log(`Can't go right.`);
                    this.renderField();
                    return true;
                }
                else {
                    this.characterColumnLocation++;
                    if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hole) {
                        console.log("You fell in a hole... Game Over!");
                        return false;
                    }
                    else if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hat) {
                        console.log("You won!");
                        return false;
                    }
                    this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] = CellValue.pathCharacter;
                    this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation - 1] = CellValue.pathCharacter;
                    this.renderField();
                    return true;
                }
            case Direction.left:
                if (this.characterColumnLocation === 0) {
                    console.log(`Can't go left.`);
                    this.renderField();
                    return true;
                }
                else {
                    this.characterColumnLocation--;
                    if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hole) {
                        console.log("You fell in a hole... Game Over!");
                        return false;
                    }
                    else if (this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] === CellValue.hat) {
                        console.log("You won!");
                        return false;
                    }
                    this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation] = CellValue.pathCharacter;
                    this.fieldMatrix[this.characterRowLocation][this.characterColumnLocation + 1] = CellValue.pathCharacter;
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
    constructor() {
        this.isPlaying = true;
        this.field = new Field();
    }
    play() {
        while (this.isPlaying) {
            console.log(this.field.getField());
            let directionInput = prompt("Which direction? ");
            this.checkUserInput(directionInput);
            this.isPlaying = this.field.updatePath(directionInput);
        }
    }
    checkUserInput(userInput) {
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
//# sourceMappingURL=main.js.map