document.getElementById('pollForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form from reloading the page

  const formData = new FormData(event.target);
  const selectedValue = formData.get('color');

  if (!selectedValue) {
    alert('Please select a color');
    return;
  }

  // Send the selected value to the Netlify function
  try {
    const response = await fetch('/.netlify/functions/submit-poll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: selectedValue }),
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById('resultText').textContent = `You voted for ${selectedValue}`;
      document.getElementById('result').style.display = 'block'; // Show results
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    alert('Error submitting vote: ' + error);
  }
});
