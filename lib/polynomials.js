const calculators = require("./calculators");
const output = require("./output");
const solvers = require("./solvers")

module.exports = {
  second_degree: (a, b, c) => {
    const discriminant = solvers.DiscriminantSolver(a, b, c)
    switch (true) {
        case discriminant < 0:
            solvers.NegativeDiscriminantSolver(a, b, discriminant)
            break;
        case discriminant > 0:
            solvers.PositiveDiscriminantSolver(a, b, discriminant)
            break;
        case discriminant === 0:
            solvers.NullDiscriminantSolver(a, b)
            break;
        default:
            break;
    }
    return;
  },
  first_degree: (a, b) => {
    solvers.FirstDegreeSolver(a, b)
  },
  zero_degree: (c) => {
    solvers.ZeroDegreeSolver(c)
  },
  parse(polynomial){
    const reduced_poly = polynomial.split('=')
    if(!reduced_poly[1] || !Array.isArray(reduced_poly)) throw new Error('reduced left side empty.')
    if(reduced_poly[1] === ' 0') return polynomial
    const reduced_rside = [...reduced_poly[1]]
    const flipSigns = reduced_rside.map((char, i) => {
        if(i === 0) return
        if(i === 1 && char !== '-') return `- ${char}`
        if(char === '+') return '-'
        if(char === '-')  return '+'
        return char
    }).join('')
    let reformatted = `${reduced_poly[0]}${flipSigns} = 0`
    const max_degree = this.degree(reformatted)
    if(max_degree > 10) {
      return {
        degree: max_degree,
        reduced_form: '🤯  Equation Too Long For Output...',
      }
    }
    reformatted = reformatted.startsWith('-') ? `${reformatted}` : `+ ${reformatted}`
    const poly_parts = {}
    for (let index = 0; index < max_degree + 1; index++) {
      const testregx = new RegExp(`[-+] ?([0-9]*\\.[0-9]+|[0-9]+) \\* X\\^${index}`, 'g')
      const matched = [...reformatted.matchAll(testregx)].map(matched => matched[0])
      .map(x => Number(x.replace(` * X^${index}`, '').replace(' ', '')))
      const reduced = matched.length > 0 && matched.reduce((acc, curr) =>  acc + curr)
      if(reduced !== false) poly_parts[` * X^${index}`] = reduced
    }
    let reduced_form = ''
    for (const [key, value] of Object.entries(poly_parts))
    if(!isNaN(value)){
      value < 0 ? reduced_form += `- ${value * -1}${key} ` : reduced_form += `+ ${value}${key} `
    }
    reduced_form = reduced_form.startsWith('-') ? `${reduced_form}` :  reduced_form.slice(2)
    reduced_form += '= 0'
    return {
      degree: max_degree,
      poly_parts,
      reduced_form,
      a: poly_parts[' * X^2'],
      b: poly_parts[' * X^1'],
      c: poly_parts[' * X^0']
    }
  },
  degree: (polynomial) => {
    const regexp = new RegExp(/X\^[0-9]*/g)
    const x_powers = [...polynomial.matchAll(regexp)].map(matched => matched[0])
    const power = x_powers.map(x => parseInt(x.replace('X^', '')))
    const degree = calculators.maximum_number(power)
    return degree
  },
};
