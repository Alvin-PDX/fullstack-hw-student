/** Exercise 02 - Reverse **/

// Add your code here
const button = document.getElementById('reverse');
const input = document.getElementById('input');
const interface = document.querySelector('main');
const output = document.createElement('p');
interface.appendChild(output);

const reverseNumber = (inputNum) => {
  let numLen = inputNum.length;
  let outNum = '';
  for (let i = numLen - 1; i >= 0; i -= 1) {
    outNum += inputNum[i];
  }
  return outNum;
};

button.addEventListener('click', () => {
  output.innerHTML = input.value;
  let num = input.value.toString();
  if (num.length != 8)
    // throws this error if string isn't a number or isn't the right length
    output.innerHTML =
      'Must be an 8-digit long number'; 
  else output.innerHTML = reverseNumber(num);
});
