const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');

// Fonction pour gérer l'animation de mise à l'échelle
function animateButton(button) {
    button.classList.add('button-scale');

    // Retirer la classe après l'animation (200ms)
    setTimeout(() => {
        button.classList.remove('button-scale');
    }, 200);
}

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    animateButton(registerBtn); // Ajouter animation au click
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    animateButton(loginBtn); // Ajouter animation au click
});

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('emailSignUp').value;
    const password = document.getElementById('passwordSignUp').value;

    // Vérification de la présence de '@' dans l'email
    if (!email.includes('@')) {
        signUpButton.style.backgroundColor = 'red';
        signUpButton.textContent = 'Invalid email';

        // Réinitialisation du bouton après 2 secondes
        setTimeout(() => {
            signUpButton.style.backgroundColor = '#512da8';
            signUpButton.textContent = 'Sign Up';
        }, 2000);

        return; // Arrête l'exécution de la fonction
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Registration successful') {
            signUpButton.style.backgroundColor = 'green';
            signUpButton.textContent = 'Success!';

            // Réinitialisation du bouton après 2 secondes
            setTimeout(() => {
                signUpButton.style.backgroundColor = '#512da8';
                signUpButton.textContent = 'Sign Up';
            }, 2000);
        } else if (data.message === 'Email already exists') {
            signUpButton.style.backgroundColor = 'red';
            signUpButton.textContent = 'Email already exists';

            // Réinitialisation du bouton après 2 secondes
            setTimeout(() => {
                signUpButton.style.backgroundColor = '#512da8';
                signUpButton.textContent = 'Sign Up';
            }, 2000);
        } else {
            signUpButton.style.backgroundColor = 'red';
            signUpButton.textContent = 'Error registering user';

            // Réinitialisation du bouton après 2 secondes
            setTimeout(() => {
                signUpButton.style.backgroundColor = '#512da8';
                signUpButton.textContent = 'Sign Up';
            }, 2000);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        signUpButton.style.backgroundColor = 'red';
        signUpButton.textContent = 'Error user already exists';

        // Réinitialisation du bouton après 2 secondes
        setTimeout(() => {
            signUpButton.style.backgroundColor = '#512da8';
            signUpButton.textContent = 'Sign Up';
        }, 2000);
    });

    animateButton(signUpButton); // Ajouter animation au click
});

signInForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('emailSignIn').value;
    const password = document.getElementById('passwordSignIn').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Login successful') {
            window.location.href = 'page.html'; // Redirection vers page.html si connexion réussie
        } else {
            signInButton.style.backgroundColor = 'red';
            signInButton.textContent = 'Email or password incorrect';

            // Réinitialisation du bouton après 2 secondes
            setTimeout(() => {
                signInButton.style.backgroundColor = '#512da8';
                signInButton.textContent = 'Sign In';
            }, 2000);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        signInButton.style.backgroundColor = 'red';
        signInButton.textContent = 'Email or password incorrect';

        // Réinitialisation du bouton après 2 secondes
        setTimeout(() => {
            signInButton.style.backgroundColor = '#512da8';
            signInButton.textContent = 'Sign In';
        }, 2000);
    });

    animateButton(signInButton); // Ajouter animation au click
});
