const calculators = require("./calculators")
const {output, chalk} = require("./output")

module.exports = {
    DiscriminantSolver: (a, b, c) => {
        output(chalk`The Solution is...`, "italic")
        const discriminant = calculators.discriminant(a, b, c);
        output(chalk`Discriminant is {blue ${discriminant}} `,"bold");
        return discriminant
    },
    NegativeDiscriminantSolver: (a, b, discriminant) => {
        const solutions = calculators.complex_solution(a, b, discriminant) 
        output(chalk`Discriminant is {red Negative}, There are {yellow two} Complex Solutions...\n`, "bold")
        output("First Complex Solution: ", "blue")
        output(`${solutions[0]} + ${solutions[1]}i \n`, "bold")
        output("Second Complex Solution: ", "yellow")
        output(`${solutions[0]} - ${solutions[1]}i`, "bold")
        output('\nExplaination:', "bold")
        output(chalk`the letter {red 'i'} is an imaginary number which is {red √-1}`, "bold")
        output(`So the solution is actually:`, "italic")
        output(chalk`-b/2a => -${b}/${a * 2} = {green ${solutions[0]}}`, "italic")
        output(chalk`√-1 x √Δ => {red √-1} x {cyan √${discriminant * -1}}`, "italic")
        output(chalk`{green ${solutions[0]}} [+ or -] {cyan ${solutions[1]}}{red i}\n`, "bold")
    },
    PositiveDiscriminantSolver: (a, b, discriminant) => {
        const solutions = calculators.normal_solutions(a, b, discriminant);
        output(chalk`Discriminant is Strictly {green Positive}, There are {yellow two} Solutions...\n`, "italic")
        output("First Solution:", "cyan");
        output(chalk`${solutions[0]}\n`, "bold");
        output("Second Solution:", "blue");
        output(chalk`${solutions[1]}\n`, "bold");
    },
    NullDiscriminantSolver: (a, b) => {
        output(chalk`Discriminant is {magenta zero}, There is only {yellow one} Solution...\n`, "italic")
        const solution = calculators.one_solution(a, b)
        output(chalk`Solution is: {cyanBright ${solution}}`, "bold");
    },
    FirstDegreeSolver: (c, b) => {
        console.log('c =', c, 'b =', b );
        let solution = (c * -1)/ b
        if(isNaN(solution)) solution = 0 
        output(chalk`The Solution is...`, "italic")
        output(chalk`X = ${(c * -1)} / ${b}`, "italic")
        output(chalk`{cyanBright ${solution}}`, "bold");
    },
    ZeroDegreeSolver: (c) => {
        output(chalk`The Solution is...`, "italic")
        if(c === 0)
        output(chalk`{green In This Case Each Real Number Is A Solution}`, "bold");
        else 
        output(chalk`{magenta In This Case There Is No Solution}`, "bold");
    }
}