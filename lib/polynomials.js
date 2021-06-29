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
  first_degree: (x) => {
    solvers.FirstDegreeSolver(x)
  }
};
