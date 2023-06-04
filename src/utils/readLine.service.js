import readline from "readline";

import fs from 'fs';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const getValueByQuestion = (question) => {
    return new Promise((resolve) =>
      rl.question(question, (answer) => resolve(answer))
    );
}

export const getValuesBasedOnQuestions = async (questions) => {
    let answers = [];
    for (let i = 0; i < questions.length; i++) {
        answers.push(await getValueByQuestion(questions[i]));
    }
    return answers;
}

export const closeReadLine = () => {
    rl.close();
};