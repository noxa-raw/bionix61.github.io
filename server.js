const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint pour gérer l'inscription
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Vérifier si l'email existe déjà
    fs.readFile('email.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error checking email' });
            return;
        }

        // Split data en un tableau de lignes
        const existingEmails = data.split('\n').filter(e => e.trim() !== '');

        // Vérifier si l'email existe déjà
        if (existingEmails.includes(email)) {
            console.log(`Email already exists: ${email}`);
            res.status(409).json({ message: 'Email already exists' });
        } else {
            // Ajouter l'email et le mot de passe à leurs fichiers respectifs
            fs.appendFile('email.txt', email + '\n', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Error writing email' });
                    return;
                }
            });

            fs.appendFile('password.txt', password + '\n', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Error writing password' });
                    return;
                }

                console.log(`Registration successful for email: ${email}`);
                res.status(200).json({ message: 'Registration successful' });
            });
        }
    });
});

// Endpoint pour gérer la connexion
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Lire les fichiers email.txt et password.txt
    fs.readFile('email.txt', 'utf8', (err, emailData) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error reading email data' });
            return;
        }

        fs.readFile('password.txt', 'utf8', (err, passwordData) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error reading password data' });
                return;
            }

            // Split data en tableaux de lignes
            const emails = emailData.split('\n').filter(e => e.trim() !== '');
            const passwords = passwordData.split('\n').filter(p => p.trim() !== '');

            // Vérifier si l'email et le mot de passe correspondent
            const index = emails.indexOf(email);
            if (index !== -1 && passwords[index] === password) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Email or password incorrect' });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
