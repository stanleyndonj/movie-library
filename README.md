
# React Single Page Application - Phase 2 Project

## Overview

This project is a React-based single page application (SPA) that demonstrates the use of components, client-side routing, state management, and interactions with a RESTful backend API using `json-server`. 

## Learning Goals

- Build a React single page application from scratch. 
- Utilize components, props, and state management.
- Implement client-side routing using React Router.
- Interact with a backend API (GET and POST requests) using `json-server`.
 
## Project Structure

The project is organized into two repositories:
1. **Frontend** - React app created using `create-react-app`.
2. **Backend** - A simple RESTful API using `json-server`.

## Features

- **Single Page Application (SPA)**: Uses React Router for navigating between three different routes.
- **Component-Based Architecture**: The app is built using at least 5 reusable components to maintain clean and organized code.
- **State Management**: Uses `useState` and `useEffect` to manage the state of the app.
- **Form Handling**: A controlled form for submitting POST requests to the backend.
- **API Integration**: The app interacts with a backend `json-server` API to handle data.

## Requirements

1. A React-based SPA with a single `index.html` file.
2. The app should have at least 5 components.
3. The app should have at least 3 client-side routes using React Router.
4. The app should use a `json-server` backend with both a GET and POST request.
5. State update after POST request (e.g., `setMovies([...movies, newMovie])`).
6. Add CSS styling to the application, either using CSS files or a framework (React Bootstrap, Material UI, etc.).

## Backend Setup

1. Clone the backend repository from GitHub.
2. Create a `db.json` file in the root directory with the following structure:
    ```json
    {
      "movies": [
        {
          "id": 1,
          "title": "Titanic",
          "year": 1997,
          "rating": 9.2
        },
        {
          "id": 2,
          "title": "Inception",
          "year": 2010,
          "rating": 8.8
        }
      ]
    }
    ```
3. Install `json-server` if you haven't:
    ```bash
    npm install -g json-server
    ```
4. Start the `json-server`:
    ```bash
    json-server --watch db.json --port 3000
    ```

## Frontend Setup

1. Clone the frontend repository from GitHub.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file for API configuration:
    ```bash
    REACT_APP_API_URL=https://your-backend-url.onrender.com
    ```
4. Start the frontend server:
    ```bash
    npm start
    ```

## Deployment

### Backend Deployment

1. Fork and clone the [json-server template](https://github.com/your-template-repo).
2. Deploy the backend to Render:
    - Follow instructions for deploying `json-server` on Render.
    - Ensure the deployed backend URL is used in your frontend `.env` file.

### Frontend Deployment

1. Build the React app for production:
    ```bash
    npm run build
    ```
2. Deploy the frontend to Netlify:
    - Import your frontend GitHub repository to Netlify.
    - Set up build commands:
        - **Build command**: `npm run build`
        - **Publish directory**: `build`
3. Add environment variable `REACT_APP_API_URL` on Netlify.

### Redirects for React Router

Add a `_redirects` file in the `public` directory of your React project:
```
/*    /index.html   200
```

## Stretch Goals

- Incorporate an external API to fetch additional data.
- Implement additional features such as search, filtering, or sorting.

## Environment Variables

Use `.env` files to manage environment variables for different stages:
- **.env.development**:
    ```bash
    REACT_APP_API_URL=http://localhost:3000
    ```
- **.env.production**:
    ```bash
    REACT_APP_API_URL=https://your-backend-url.onrender.com
    ```

## Conclusion

By completing this project, you'll have practiced building a full-stack React application that interacts with an API and uses modern front-end tools like React Router, state management, and client-side rendering. You can also deploy both the frontend and backend to platforms like Netlify and Render for others to see your work in action!

Feel free to expand this project by adding new features or improving the existing functionality.
