const express = require(`express`);
const path = require(`path`);
const logger = require(`./midleware/logger`);
const fs = require(`fs`);
const app = express();

// Init middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(`/`,(req, res) => {
    //res.send(`<h1>ようこそ</h1>`);
    res.sendFile(path.join(__dirname, `public`, `index.html`));
});

app.get(/^(.+)$/, function(req, res) {
    console.log(path.join(__dirname, `./public/`, req.params[0]+`.html`));
    try {
        if(fs.statSync(path.join(__dirname, `./public/`, req.params[0]
        +`.html`)).isFile()) {
            res.sendFile(req.params[0]+
                `.html`, {root: path.join(__dirname, `./public`)});
        }
    } catch(err) {
        res.sendFile(`404.html`, {root: path.join(__dirname, `./public`)});
    }
});

// Set static folder
//app.get(`/`,(req, res) => {
    //res.send(`<h1>ようこそ</h1>`);
//    res.sendFile(path.join(__dirname, `public`, `index.html`));
//});

//app.get(`/about`,(req, res) => {
//  res.sendFile(path.join(__dirname, `public`, `about.html`));
//});

//app.use(express.static(path.join(__dirname, `public`)));

const PORT = process.env.PORT || 5000;

// Members API Routes
app.use(`/api/members`, require(`./routes/api/members`));

app.listen(PORT, () => console.log(`セーバースタートポート　${PORT}`));