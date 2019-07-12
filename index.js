const express = require(`express`);
const path = require(`path`);
const logger = require(`./midleware/logger`);

const members = require(`./Members`);

const app = express();

// Init middleware
app.use(logger);

/// Gets All Members
app.get(`/api/members`, (req, res) => res.json(members));

// Set static folder
app.get(`/`,(req, res) => {
    //res.send(`<h1>ようこそ</h1>`);
    res.sendFile(path.join(__dirname, `public`, `index.html`));
});

app.get(`/about`,(req, res) => {
    //res.send(`<h1>ようこそ</h1>`);
    res.sendFile(path.join(__dirname, `public`, `about.html`));
});

//app.use(express.static(path.join(__dirname, `public`)));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`セーバースタートポート　${PORT}`));