<h1 align="center">MFX <img src="./client/src/assets/images/favicon.png" width="40" height="40"/></h1>
<p align="center">
    An online movie ticket booking web application built with <a href="https://www.mongodb.com/mern-stack" target="_blank">MERN</a> stack
</p>

<br>

<h3 align="center">⬇️ Live project link ⬇️
<br>
<a href="https://mfx.vercel.app" target="_blank">Vercel deployment 🔗</a>
</h1>

<br>

# How to run the project locally 📑

- Clone the repo to your local machine.
- Navigate to the root folder and in your terminal, run: [npm install]()
- Navigate to the client directory and run: [npm install]() there as well
- run: [npm install -g concurrently]()
- From the project root, run: [npm run dev]()
- Goto: [localhost:3000]() to see the app running.
- Note: Not a good practice but, I have removed the .env file from .gitignore,
  just for simplicity's sake

<br>

# Overview 📑

MFX allows users to order tickets for a show and gather information about movies and venues. To purchase show tickets, the customer must first register to the application. When selecting a show, the user is presented with a seating configuration from which he can select seats. He'll be redirected to the payment input screen.
After completing the payment a ticket mail will be sent to the user email address with ticket details.
The suggested application allows users to reserve a movie from a theatre for a specific date & time. The user can display their booking history as a theatre ticket, saving time.

<br>

# Features ⭐

## Customer Features 🪄

- [x] Register themselves
- [x] Login to the application
- [x] View currently released & coming soon movies
- [x] Search movie
- [x] Get movie details
- [x] Watch movie trailer
- [x] Get list of available shows for a particular movie
- [x] Sort list of shows price & date wise
- [x] View available & booked seats from seatmap (seat configuration)
- [x] Select seat from available seats & get total price.
- [x] Get ticket on mail after booking
- [x] View booking history
- [x] Give their feedback

<br>

## Admin Features ⚙️

- [x] Login to admin panel
- [x] View list of added movies
- [x] Add new movie
- [x] Delete movie from list
- [x] View list of added shows
- [x] Add new show
- [x] Update show details
- [x] View shows history
- [x] Get show analytics (like earnings, available seats, booked seats, etc.)
- [x] Add & delete cinema hall
- [x] View list of customer feedbacks & load older feedbacks

## Common Features

- [x] Forgot password
- [x] Reset password
- [x] Login
- [x] Logout
- [x] Pagination, searching & sorting

<br>
<br>

# Technologies Used 💻

<br>

## Backend

<br>

<div align="left">
<img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg" alt="Node.js"/> 
<img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg" alt="Mongodb"/>
<img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="Express.js"/>
</div>
<br>

- [Node.js](https://nodejs.org/) for building backend & web server.
- [Express.js](https://expressjs.com/) for building REST API.
- [MongoDB](https://www.mongodb.com/docs/) as a database to store user information & chats.

## Frontend

<br>
<div align="left">
<img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg"  alt="React.js"/> 
<img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-ar21.svg" alt="Tailwind.css" /> 
<img src="https://www.vectorlogo.zone/logos/axios/axios-ar21.svg" alt="axios" />

</div>
<br>

- [React.js](https://reactjs.org/) for user interface.
- [Context API](https://reactjs.org/docs/context.html) to manage state of application.
- [Axios](https://axios-http.com/) for client side data fetching & api handling.
- [Tailwind CSS](https://tailwindcss.com/) to give custom styling to all components.
- [Vite](https://vitejs.dev/) for managing frontend development environment.

<br>

## Deployment 🌨️

<br>
<div align="left">
<img src="https://github.com/gilbarbara/logos/blob/main/logos/cloudinary.svg"  alt="Cloudinary"/>
</div>
<br>

- Movie media ( images ) is managed on [Cloudinary](https://cloudinary.com/) storage.
- Database is hosted on [mongodb atlas](https://www.mongodb.com/atlas/database) cloud platform

<br>

# Inspiration 📑

- Heavy inspiration taken from the app movie-buzz.
- [Inspiration from repo](https://github.com/uttamsutariya/movie-buzz) by uttamsutariya. Thanks!

<br>

# Challenges & Learnings 📑

# 1. Database Integration:

- Challenge: Configuring MongoDB Atlas and connecting it to the project.

- Learning: Understanding the process of setting up a cloud-based database and integrating it
  into a web application.

# 2. Cloudinary Integration:

- Challenge: Replacing Amazon S3 with Cloudinary for image storage.

- Learning: Understanding different cloud storage services and adapting the application to use
  a new provider.

# 3. React Context for State Management:

- Challenge: Understanding and modifying the state management using React Context.

- Learning: Exploring the benefits of React Context and how it can be effectively
  used for state management in a React application.

# 4. API Security:

- Challenge: Implementing secure API endpoints and handling authentication.

- Learning: Understanding best practices for securing backend APIs, implementing JWT,
  and handling user authentication.

# 5. Error Handling and Logging:

- Challenge: Implementing robust error handling and logging on the backend.

- Learning: Understanding how to utilize tools and techniques for effective error
  detection, logging, and debugging in a production environment.

# 6. Mailing System Troubleshooting:

- Challenge: Identifying and resolving issues with the existing mailing system.

- Learning: Troubleshooting common problems related to email delivery, such as
  SMTP configuration issues.

# 7. Choosing a New Mailing Service:

- Challenge: Evaluating and selecting an alternative mailing service (SendGrid)
  to replace the existing one, configuring the SendGrid API and integrating it into the application.

- Learning: Understanding the features,and documentation of SendGrid and implementing
  it for seamless email delivery.

# 8. Testing with Mailsac:

- Challenge: Implementing a testing strategy for emails using Mailsac.

- Learning: Testing if the emails are working or not using a dummy disposable
  email testing service, Mailsac.

# 9. Deployment to Vercel:

- Challenge: Deploying the application to Vercel and configuring environment variables.

- Learning: Gaining experience with the deployment process and managing environment
  variables in a production environment.

- Challenge: Faced deployment issues on Vercel due to read-only file system,
  hindering the original file writing process for Cloudinary integration,
  as it used the method of first writing to the file system.

- Learning: Adapted the application's file handling workflow to align with
  Vercel's constraints, ensuring successful deployment. Explored alternative
  methods, eliminated temporary file writing, instead used base64 encoded
  dataUri for handling cloudinary image uploads.

<br>
