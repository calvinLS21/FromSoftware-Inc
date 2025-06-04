document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        document.querySelector('#nav-menu').classList.toggle('active');
      });
    }
  
 // Feedback form handling
    const feedbackForm = document.querySelector('form');
    if (!feedbackForm) return; // Exit if form not found
  
    // Validate form data
    function validateForm() {
      let isValid = true;
      let errorMessage = '';
  
      // Validate name and surname
      const nameInput = document.querySelector('input[name="Name"]');
      const surnameInput = document.querySelector('input[name="Surname"]');
      const favoriteGameInput = document.querySelector('input[name="Favourite Game"]');
      
      // Regular expression to check for numbers
      const noNumbersRegex = /^[^0-9]*$/;
      
      if (!nameInput.value.trim()) {
        isValid = false;
        errorMessage += 'Please enter your name.\n';
      } else if (!noNumbersRegex.test(nameInput.value.trim())) {
        isValid = false;
        errorMessage += 'Name cannot contain numbers.\n';
      }
      
      if (!surnameInput.value.trim()) {
        isValid = false;
        errorMessage += 'Please enter your surname.\n';
      } else if (!noNumbersRegex.test(surnameInput.value.trim())) {
        isValid = false;
        errorMessage += 'Surname cannot contain numbers.\n';
      }
  
      // Validate favorite game input
      if (favoriteGameInput && favoriteGameInput.value.trim().length < 3) {
        isValid = false;
        errorMessage += 'Favorite game must be at least 3 characters long.\n';
      } else if (favoriteGameInput && !noNumbersRegex.test(favoriteGameInput.value.trim())) {
        isValid = false;
        errorMessage += 'Favorite game cannot contain numbers.\n';
      }
  
      // Validate suggestions
      const suggestionsInput = document.querySelector('textarea[name="Improveent Suggestions"]');
      if (suggestionsInput && suggestionsInput.value.trim() && suggestionsInput.value.trim().length < 10) {
        isValid = false;
        errorMessage += 'Suggestions must be at least 10 characters long or left empty.\n';
      }
  
      return { isValid, errorMessage };
    }
  
    // Handle form submission
    function submitForm() {
      const { isValid, errorMessage } = validateForm();
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('form-result');
  
      if (!isValid) {
        resultDiv.textContent = errorMessage;
        resultDiv.style.color = '#ff4d4d';
        feedbackForm.appendChild(resultDiv);
        setTimeout(() => resultDiv.remove(), 5000);
        return;
      }
  
      // Collection of form data
      const formData = {
        name: document.querySelector('input[name="Name"]').value.trim(),
        surname: document.querySelector('input[name="Surname"]').value.trim(),
        navigation: document.querySelector('select[name="Navigation"]').value,
        speed: document.querySelector('select[name="Speed"]').value,
        performance: document.querySelector('select[name="Performance"]').value,
        services: document.querySelector('select[name="Services availability"]').value,
        favorite_game: document.querySelector('input[name="Favourite Game"]')?.value.trim() || '',
        suggestions: document.querySelector('textarea[name="Improveent Suggestions"]')?.value.trim() || ''
      };
  
      // Simulate sending data to a server
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(data => {
        resultDiv.textContent = 'Feedback submitted successfully! Form data sent without issues.';
        resultDiv.style.color = '#28a745';
        feedbackForm.reset();
        feedbackForm.appendChild(resultDiv);
        setTimeout(() => resultDiv.remove(), 5000);
      })
      .catch(error => {
        resultDiv.textContent = 'Error submitting feedback. Please try again.';
        resultDiv.style.color = '#ff4d4d';
        feedbackForm.appendChild(resultDiv);
        setTimeout(() => resultDiv.remove(), 5000);
      });
    }
  
    // Add event listener for form submission
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm();
    });
  
    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Form';
    resetButton.type = 'button';
    resetButton.classList.add('reset-button');
    resetButton.addEventListener('click', () => {
      feedbackForm.reset();
      const resultDiv = document.querySelector('.form-result');
      if (resultDiv) resultDiv.remove();
    });
    feedbackForm.appendChild(resetButton);
}); 
