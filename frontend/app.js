document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.transaction-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const accountNumber = document.getElementById('accountNumber').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const transactionType = document.getElementById('transactionType').value;
  
      try {
        const response = await fetch('/api/transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            accountNumber,
            amount,
            transactionType
          })
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Transaction successful:', data);
          alert('Transaction successful!');
          form.reset();
        } else {
          throw new Error('Transaction failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Transaction failed. Please try again.');
      }
    });
  });
  