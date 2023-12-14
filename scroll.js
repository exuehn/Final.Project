fetch ('sketch.js')
.then(response => response.text())
.then(code => {
  
  // Display the code in the <pre> element
  document.getElementById('codeDisplayOne').innerText = code;
  document.getElementById('codeDisplayTwo').innerText = code;

})

.catch(error => {

  console.error('Error fetching code:', error);
  
});