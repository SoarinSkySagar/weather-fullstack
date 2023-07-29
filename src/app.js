import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import hbs from "hbs";
import { geocode } from "../utils/geocode.js";
import { getWeather } from "../utils/getWeather.js";

//Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const name = 'Sagar Rana';

const app = express();

app.use(cors());
//setup hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

//set up static path
app.use(express.static(path.join(__dirname, '../public')));

//setup directories
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    });
});

app.get('/weather', async (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address query first!'
        });
    }
    const location = req.query.address;
        const weatherData = await new Promise((resolve) => {
            geocode(location, getWeather, (data) => resolve(data))
        });
    res.send(weatherData);
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        p: 'Page not found.',
        name
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});