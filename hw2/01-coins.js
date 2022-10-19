/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  let dollars = 0;
  let quarters = 0;
  let dimes = 0;
  let nickels = 0;
  let pennies = 0;

  if (input > 10) return 'Error: input cannot be larger than 10';
  dollars = input - (input % 1);
  input = input % 1;
  quarters = (input - (input % 0.25)) / 0.25;
  input = input % 0.25;
  dimes = (input - (input % 0.1)) / 0.1;
  input = input % 0.1;
  nickels = (input - (input % 0.05)) / 0.05;
  pennies = Math.round((input % 0.05) * 100);

  return (
    dollars +
    ' dollar(s), ' +
    quarters +
    ' quarter(s), ' +
    dimes +
    ' dime(s), ' +
    nickels +
    ' nickel(s), ' +
    pennies +
    ' pennies'
  );
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
