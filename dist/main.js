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
            let rndRow = Math.floor(Math.random() * config_1.default.width);
            let rndCol = Math.floor(Math.random() * config_1.default.height);
            while (this.fieldMatrix[rndRow][rndCol] == CellValue.hole) {
                rndRow = Math.floor(Math.random() * config_1.default.width);
                rndCol = Math.floor(Math.random() * config_1.default.height);
            }
            this.fieldMatrix[rndRow][rndCol] = CellValue.hole;
        }
    }
    generateHat() {
        let rndRow = Math.floor(Math.random() * config_1.default.width);
        let rndCol = Math.floor(Math.random() * config_1.default.height);
        while (this.fieldMatrix[rndRow][rndCol] == CellValue.hole ||
            this.fieldMatrix[rndRow][rndCol] == CellValue.pathCharacter) {
            rndRow = Math.floor(Math.random() * config_1.default.width);
            rndCol = Math.floor(Math.random() * config_1.default.height);
        }
        this.fieldMatrix[rndRow][rndCol] = CellValue.hat;
    }
    renderField() {
        this.field = this.fieldMatrix.map((row) => row.join("")).join("\n");
    }
    getField() {
        return this.field;
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