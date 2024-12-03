// Handle form submission
document.getElementById('pollForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from reloading the page

  // Get the selected answer
  const formData = new FormData(event.target);
  const selectedValue = formData.get('color');

  // Display results
  const resultText = `You voted for ${selectedValue}`;
  document.getElementById('resultText').textContent = resultText;
  document.getElementById('result').style.display = 'block'; // Show results
});
