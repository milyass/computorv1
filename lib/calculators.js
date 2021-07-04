module.exports = {
  discriminant: (a, b, c) => b * b - 4 * a * c,
  sq_root_calc: (n) => {
    if (n == 0) return 0;
    let min = 1;
    let max = 1;
    let mid;
    while (max * max < n) {
      max++;
    }
    min = max - 1;
    mid = (max + min) / 2;
    while (mid * mid != n) {
      if (mid * mid > n) {
        max = mid;
      } else {
        min = mid;
      }
      if (mid == (max + min) / 2) {
        break;
      }
      mid = (max + min) / 2;
    }

    return mid;
  },
  normal_solutions(a, b, D) {
    return [
      (-1 * b + this.sq_root_calc(D)) / (2 * a),
      (-1 * b - this.sq_root_calc(D)) / (2 * a),
    ];
  },
  complex_solution(a, b, D) {
    return [(-1 * b) / (2 * a), this.sq_root_calc(D * -1) / (2 * a)];
  },
  one_solution: (a, b) => (-1 * b) / (2 * a),
  maximum_number: (num_array) => {
  let max_num = 0
  for (let index = 0; index < num_array.length; index++) {
      const curr_num = num_array[index];
      if(curr_num > max_num) max_num = curr_num
    }
    return max_num
  }
};
