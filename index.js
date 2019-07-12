const express = require(`express`);
const path = require(`path`);
const moment = require(`moment`);

const members = require(`./Members`);

const app = express();

const logger = (req, res, next) => {
    console.log(
        `${req.portocol}://${req.get(`host`)}${
            req.originalUrl
        }: ${moment().format()}`
    );
    next();
};

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