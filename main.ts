import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

const hat: string = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {}
