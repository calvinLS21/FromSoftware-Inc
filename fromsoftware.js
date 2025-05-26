document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.querySelector('form');
    if (!feedbackForm) return; // Exit if form not found

    // Add name attributes to radio buttons and inputs for proper grouping
    const radioGroups = [
        {
            label: 'Did you find the website easy to navigate through',
            name: 'navigation',
            options: ['Very Easy', 'Easy', 'Neutral', 'Difficult', 'Very Difficult']
        },
        {
            label: 'How would you rate the speed of the website',
            name: 'speed',
            options: ['It is very fast', 'It is fast', 'It is slow']
        },
        {
            label: 'How would you rate the perfomance of the website',
            name: 'performance',
            options: ['Great', 'Good', 'Fair', 'Poor']
        },
        {
            label: 'Where you able to find the services you were looking for',
            name: 'services',
            options: ['I found the services', 'I found some of the services', 'I found no services at all']
        }
    ];

    // Update radio buttons with name and value attributes
    radioGroups.forEach(group => {
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            if (label.textContent.includes(group.label)) {
                const inputs = label.querySelectorAll('input[type="radio"]');
                inputs.forEach((input, index) => {
                    input.name = group.name;
                    input.value = group.options[index] || input.nextSibling.textContent.trim();
                });
            }
        });
    });

    // Validate form data
    function validateForm() {
        let isValid = true;
        let errorMessage = '';

        // Validate radio button groups
        radioGroups.forEach(group => {
            const radios = document.querySelectorAll(`input[name="${group.name}"]`);
            const checked = Array.from(radios).some(radio => radio.checked);
            if (!checked) {
                isValid = false;
                errorMessage += `Please select an option for "${group.label}".\n`;
            }
        });

        // Validate favorite game input
        const favoriteGameInput = document.querySelector('input[name="favorite_game"]');
        if (!favoriteGameInput || !favoriteGameInput.value.trim()) {
            isValid = false;
            errorMessage += 'Please enter your favorite FromSoftware game.\n';
        } else if (favoriteGameInput.value.trim().length < 3) {
            isValid = false;
            errorMessage += 'Favorite game must be at least 3 characters long.\n';
        }

        // Validate suggestions (optional)
        const suggestionsInput = document.querySelector('textarea[name="suggestions"]');
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

        // Collect form data
        const formData = {
            navigation: document.querySelector('input[name="navigation"]:checked')?.value || '',
            speed: document.querySelector('input[name="speed"]:checked')?.value || '',
            performance: document.querySelector('input[name="performance"]:checked')?.value || '',
            services: document.querySelector('input[name="services"]:checked')?.value || '',
            favorite_game: document.querySelector('input[name="favorite_game"]')?.value.trim() || '',
            suggestions: document.querySelector('textarea[name="suggestions"]')?.value.trim() || ''
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
            resultDiv.textContent = 'Feedback submitted successfully!';
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

    // Add name attributes to text inputs if missing
    const favoriteGameInput = document.querySelector('input[type="text"]');
    if (favoriteGameInput && !favoriteGameInput.name) {
        favoriteGameInput.name = 'favorite_game';
    }

    const suggestionsInput = document.querySelector('textarea');
    if (suggestionsInput && !suggestionsInput.name) {
        suggestionsInput.name = 'suggestions';
    }
});

// Add CSS for form feedback and reset button
const style = document.createElement('style');
style.textContent = `
    .form-result {
        margin-top: 0.625rem;
        font-size: 0.875rem;
        text-align: center;
        padding: 0.625rem;
        border-radius: 0.25rem;
        background: #090229;
    }
    .reset-button {
        background-color: #32238f;
        color: white;
        border: none;
        padding: 0.625rem 1.25rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        margin-top: 0.625rem;
        transition: background-color 0.3s ease;
    }
    .reset-button:hover {
        background-color: #4b3be0;
    }
`;
document.head.appendChild(style);