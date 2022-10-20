/** Exercise 03 - Form **/

// Add your code here
let form = document.querySelector('form');
let clear = document.getElementById('reset_button');

form.addEventListener('submit', (event) => {
  console.log('Saving value', form.elements);
  let inputs = form.elements;
  console.log(
    '~Form Submission~\n\nName: ' +
      inputs['name'].value +
      '\nEmail: ' +
      inputs['email'].value
  );
  if (inputs['feedback'].value == '') console.log('Feedback: None given.');
  else console.log('Feedback: ' + inputs['feedback'].value);
  if (inputs['newsletter'].checked)
    console.log('Newsletter: Please register me for the newsletter.');
  else console.log('Newsletter: No thanks.');
  //event.preventDefault();
});

clear.addEventListener('click', (event) => {
  let inputs = form.elements;
  inputs['name'].value = '';
  inputs['email'].value = '';
  inputs['feedback'].value = '';
  inputs['newsletter'].checked = false;
});
