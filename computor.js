const process = require("process");
const polynomials = require("./lib/polynomials");
const { output, chalk } = require("./lib/output");
const input = process.argv[2];

computor_v1 = (polynomial) => {
  try {
    if (!polynomial) throw new Error("no input.");
    const parsed = polynomials.parse(polynomial);
    if(!parsed) throw new Error("not parsed.")
    const {degree, reduced_form, a, b, c } = parsed
    if(reduced_form === undefined || degree === undefined) throw new Error("wrong format")
    output(chalk`Reduced form: {green ${reduced_form}}`, "bold");
    output(chalk`Polynomial degree: {yellow ${degree}}`, "bold");
    switch (true) {
      case degree === 0:
        polynomials.zero_degree(c)
        break;
      case degree === 1:
        polynomials.first_degree(c, b)
        break;
      case degree === 2:
        polynomials.second_degree(a, b, c)
        break;
      default:
        output(
          chalk`{cyan The polynomial degree is strictly greater than 2, I can't solve...}`,
          "italic"
        );
        break;
    }

  } catch (error) {
    output(chalk`{red ‼️ debug: ${error.message}}`, "bold");
    output(
      chalk`{green Computor V1} - node computor.js {cyan <Polynomial>}`,
      "italic"
    );
    process.exit(0);
  }
};

computor_v1(input);
