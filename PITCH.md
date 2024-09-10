# Phase 2 Project Pitch: React Single Page Application

## Project Overview
The goal of this project is to build a **React Single Page Application** from scratch that incorporates the essential features of modern web applications. This project aims to showcase the group's proficiency in React fundamentals, including component-based architecture, state management, client-side routing, and interactions with APIs using both GET and POST requests.

The project also provides an opportunity to demonstrate the use of controlled forms for user input, custom styling using either CSS or a UI framework, and deployment strategies for both the frontend and backend.

## Project Requirements
This application will meet the following criteria:

1. **React Components**: The app will be built using **at least 5 components** to maintain a modular and organized codebase.
   
2. **Client-Side Routing**: Implement **at least 3 routes** using React Router to ensure seamless navigation, including a **nav bar** for easy route access.

3. **API Integration**: 
   - A RESTful backend will be set up using **json-server**, with both **GET and POST requests**. A controlled form will handle the POST request to add new data, and an appropriate state update will trigger the UI re-render.
   - Additionally, data will be fetched from the **OMDb API** (https://www.omdbapi.com/) to enrich the application with movie-related information. This API will provide functionality for searching movies and retrieving details about them.

4. **State Management**: Ensure that upon a successful POST request, the state is updated to display the newly added item in the app without needing to reload or refetch the entire dataset.

5. **Custom Styling**: Write custom **CSS from scratch** or use a modern UI framework such as React Bootstrap or Material UI to give the application a polished and professional look.

## Technical Implementation
1. **Frontend**: The frontend will be developed using **React** and **Create-React-App** to generate the initial codebase. React Router will handle client-side routing.
   
2. **Backend**: A simple **json-server** will serve as the backend, handling API requests. The backend will be deployed separately to ensure scalability and flexibility.

3. **API Interaction**: 
    - **GET**: Fetch data from the json-server API and the **OMDb API** to display in the application.
    - **POST**: Submit data via a controlled form to the json-server API and immediately update the UI using state management.

4. **State Management**: React’s `useState` will be used to manage application state, particularly to update the UI after adding new data.

5. **Routing**: The app will implement three primary routes:
   - **Home**: Displays the main content.
   - **List**: Displays a list of items fetched from the API.
   - **Add New**: Displays a form to add new data.

## Stretch Goals
Once the core functionality is complete, the group plans to explore additional features:
- **External API Integration**: Incorporate additional data from a third-party API to further enhance the app's functionality.
- **Additional Features**: Enhance the app by adding more routes, deeper data interactions, or advanced state management techniques.

## Deployment Strategy
1. **Backend**: The backend will be deployed using **Render** or another Node.js-compatible hosting service.
2. **Frontend**: The frontend will be deployed using **Netlify** with **Continuous Deployment** enabled, ensuring that any updates pushed to the GitHub repository are automatically reflected on the live site.

## Project Management
1. **GitHub Repository**: 
   - The repository will be well-organized with a detailed **README.md** documenting the project’s setup, installation instructions, and features.
   - A **commit history** with frequent commits (goal: **30+ commits**) and descriptive commit messages.


## Conclusion
This project will demonstrate the group's proficiency in React and full-stack web development, covering key topics such as client-side routing, state management, API integration, and application deployment. The team is excited to tackle this project and enhance their skill set by solving real-world problems with modern development techniques.
