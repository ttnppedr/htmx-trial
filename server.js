import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/users', async (req, res) => {
    setTimeout(async () => {
        const limit = +req.query.limit || 10;
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
        );
        const users = await response.json();

        res.send(`
              <h1 class="text-2xl font-bold my-4">Users</h1>
              <ul>
                  ${users.map((user) => `<li>${user.name}</li>`).join('')}
              </ul>
          `);
    }, 2000);
});

app.post('/convert', (req, res) => {
    setTimeout(() => {
        const fahrenheit = parseFloat(req.body.fahrenheit);
        const celsius = (fahrenheit - 32) * (5 / 9);

        res.send(`
          <p>
            ${fahrenheit} degree Fahrenheit is equal to ${celsius.toFixed(
            2
        )} degree Celsius.
          </p>
        `);
    }, 2000);
});

let counter = 0;

app.get('/poll', (req, res) => {
    counter++;

    const data = { value: counter };

    res.json(data);
});

let currentTempurature = 20;

app.get('/get-temperature', (req, res) => {
    currentTempurature += Math.random() * 2 - 1;
    res.send(currentTempurature.toFixed(1) + '°C');
});

app.post('/search/api', async (req, res) => {
    const searchTerm = req.body.search.toLowerCase();

    if (!searchTerm) {
        return res.send('<tr></tr>');
    }

    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
    );
    const contacts = await response.json();

    const searchResults = contacts.filter((contact) => {
        const name = contact.name.toLowerCase();
        const email = contact.email.toLowerCase();

        return name.includes(searchTerm) || email.includes(searchTerm);
    })

    setTimeout(() => {
        const searchResultsHTML = searchResults.map(
            (contact) => `
                <tr>
                    <td><div class="my-4 p-2">${contact.name}</div></td>
                    <td><div class="my-4 p-2">${contact.email}</div></td>
                </tr>
            `).join('');

        res.send(searchResultsHTML);
    }, 1000);
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
