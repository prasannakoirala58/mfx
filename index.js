const app = require('./app');
const http = require('http');
const { PORT } = require('./config');
const cloudinary = require('cloudinary');
require('./utils/db').connect();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`App is running on port:${PORT}`));
