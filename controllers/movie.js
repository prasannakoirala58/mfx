const asyncHandler = require('../middlewares/asyncHandler');
const CustomError = require('../utils/customError');

const { cloudinary_upload, cloudinary_delete } = require('../helper/imageUploader');
const upload = require('../helper/multerConfig');

const { MAX_FILE_SIZE } = require('../config');

// models
const Movie = require('../models/movie');
const Show = require('../models/show');

// Multer middleware for uploading movie poster and banner
exports.uploadMovieImages = upload.fields([
  { name: 'poster', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
]);

/**
 * 	user controller for movies
 */

// get all movies && search movie
exports.userGetAllMovies = asyncHandler(async (req, res, next) => {
  const { searchKey } = req.query;

  /**
   * if searched by user then give matched result
   */
  const movieNameRegex = new RegExp(searchKey, 'i');

  const movies = await Movie.find(
    {
      $or: [{ title: movieNameRegex }],
      status: { $ne: 'deleted' },
    },
    {
      createdAt: 0,
      updatedAt: 0,
    }
  ).sort({
    release_date: -1,
  });

  return res.status(200).json({
    status: 'success',
    message: 'movies list fetched',
    data: {
      totalMovies: movies.length,
      movies,
    },
  });
});

// get movie detail
exports.getMovieById = asyncHandler(async (req, res, next) => {
  const { movieId } = req.params;

  if (!movieId) return next(new CustomError('Please add movie id', 400));

  const movie = await Movie.findOne({ _id: movieId }, { createdAt: 0, updatedAt: 0 });

  res.status(200).json({
    status: 'success',
    message: 'movies details fetched',
    data: {
      movie,
    },
  });
});

/**
 * 	Admin controllers for movies
 */

// add movie
exports.addMovie = asyncHandler(async (req, res, next) => {
  let movie;
  try {
    let {
      title,
      description,
      release_date,
      language,
      duration,
      genre,
      actors,
      adult,
      trailer_link,
    } = req.body;

    console.log('la back samma ni code pugyo hai');
    console.log(req.files);

    if (!req.files) return next(new CustomError('Please upload poster and banner image', 400));

    const { poster, banner } = req.files;
    // console.log(`Poster buffer: ${poster[0].buffer}`);
    // console.log(`Banner buffer: ${banner[0].buffer}`);

    const fileSize = MAX_FILE_SIZE;
    console.log(MAX_FILE_SIZE);

    if (poster.size / (1024 * 1024) > fileSize || banner.size / (1024 * 1024) > fileSize) {
      return next(new CustomError(`Maximum image size is ${MAX_FILE_SIZE} MB`));
    }

    if (!poster || !banner)
      return next(new CustomError('Please upload poster and banner image', 400));

    genre = genre.split(',');
    language = language.split(',');
    actors = actors.split(',');

    const time = duration.split(':');
    duration = Number(time[0]) * 60 + Number(time[1]);

    let status = new Date(release_date) <= Date.now() ? 'released' : 'coming soon';

    console.log(status);
    console.log(new Date(release_date) <= Date.now());

    const pubIdPoster = `${poster[0].originalname.split('.')[0]}-poster`;
    const pubIdBanner = `${banner[0].originalname.split('.')[0]}-banner`;

    const posterURL = await cloudinary_upload(
      poster[0].buffer,
      'tempPoster.jpg',
      'movies/poster',
      pubIdPoster,
      false
    );
    const bannerURL = await cloudinary_upload(
      banner[0].buffer,
      'tempBanner.jpg',
      'movies/banner',
      pubIdBanner,
      true
    );

    const movieData = {
      title,
      description,
      release_date,
      status,
      language,
      duration,
      genre,
      actors,
      adult,
      trailer_link,
      images: { poster: posterURL, banner: bannerURL },
    };

    console.log('This is posterURL', posterURL);
    console.log('This is banner URL', bannerURL);

    movie = await Movie.create(movieData);

    res.status(201).json({
      status: 'success',
      message: 'movie added successfully',
      data: { movie },
    });
  } catch (err) {
    if (movie) {
      // If there was an error saving the user, delete the uploaded
      // profile picture and document from Cloudinary
      if (movie.images.poster) {
        await cloudinary_delete(movie.images.poster);
      }
      if (user.images.banner) {
        await cloudinary_delete(movie.images.banner);
      }
    }

    next(err);
  }
});

// delete movie
exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const { movieId } = req.params;

  if (!movieId) return next(new CustomError('Provide MovieId', 400));

  await Movie.updateOne({ _id: movieId }, { $set: { status: 'deleted' } });

  return res.status(200).json({
    status: 'success',
    message: 'Movie deleted successfully',
    data: {},
  });
});

// get all added movies
exports.getAllMovies = asyncHandler(async (req, res, next) => {
  let { sortBy, order, page, perPage } = req.query;

  sortBy = sortBy || 'title';
  order = order || 1;
  page = page || 1;
  perPage = perPage || 5;

  const totalMovies = await Movie.countDocuments({ status: { $ne: 'deleted' } });
  const releasedMovies = await Movie.countDocuments({ status: 'released' });
  const comingSoonMovies = await Movie.countDocuments({ status: 'coming soon' });

  const movies = await Movie.find(
    { status: { $ne: 'deleted' } },
    { title: 1, status: 1, release_date: 1 }
  )
    .sort({
      [`${sortBy}`]: order,
    })
    .skip(page * parseInt(perPage))
    .limit(perPage);

  for (let movie of movies) {
    movie._doc.shows = await Show.countDocuments({
      movie: movie._id,
      status: 'starting soon',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'movies list fetched',
    data: {
      totalMovies,
      releasedMovies,
      comingSoonMovies,
      movies,
    },
  });
});

// get all released movies
exports.getAllReleasedMovies = asyncHandler(async (req, res, next) => {
  const movies = await Movie.find({ status: 'released' }, { title: 1 }).sort({
    release_date: -1,
  });

  return res.status(200).json({
    status: 'success',
    message: 'movies list fetched',
    data: {
      totalMovies: movies.length,
      movies,
    },
  });
});
