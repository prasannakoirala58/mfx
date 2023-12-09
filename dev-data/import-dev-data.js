const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./../models/movie');
const Show = require('./../models/show');
const CinemaHall = require('./../models/cinemaHall');

dotenv.config({ path: '../.env' });

const DB = process.env.DB_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

// Read Json File
const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`, 'utf-8'));
const shows = JSON.parse(fs.readFileSync(`${__dirname}/shows.json`, 'utf-8'));
const halls = JSON.parse(fs.readFileSync(`${__dirname}/halls.json`, 'utf-8'));

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Movie.create(movies);
    // await Show.create(shows);
    await CinemaHall.create(halls);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB COLLECTION
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    // await Show.deleteMany();
    await CinemaHall.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
