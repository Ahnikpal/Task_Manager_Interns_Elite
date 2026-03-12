Task Manager — Client-Side Todo List Application

A simple, responsive Task Manager / Todo List web application that runs completely in the browser.
This project allows users to add, manage, complete, and delete tasks while storing all data locally using the browser's localStorage API.

This project was developed as part of the IntersElite Internship Program – Minor Project Assignment.

Project Objective

The objective of this project is to design and develop a fully functional, responsive Todo List application that works entirely on the client side without requiring a backend server.

The application enables users to:

Add tasks

Mark tasks as completed

Delete tasks

Filter tasks (All / Active / Completed)

Store tasks permanently using localStorage

This ensures tasks remain saved even after refreshing or reopening the browser. 

AhnikPal_WD-FSWD-A4JAN-8770_Min…

Project Description

Task Manager is a lightweight productivity web application built using HTML, CSS, and Vanilla JavaScript.

It provides a clean and user-friendly interface that helps users organize their daily activities efficiently.

Core Features

✔ Add Tasks
Users can enter a task and add it using the Add button or Enter key.

✔ Mark Tasks as Complete
Tasks can be toggled between pending and completed using a checkbox.

✔ Delete Tasks
Each task includes a delete button to remove it permanently.

✔ Data Persistence
Tasks are stored using localStorage, ensuring they remain available after page refresh.

✔ Filter Tasks
Users can filter tasks using:

All

Active

Completed

✔ Empty State Message
Displays a message like "You're all caught up!" when no tasks exist.

✔ Responsive Design
The application works smoothly on desktop and mobile devices.

Technologies Used
Technology	Purpose
HTML5	Structure of the web page
CSS3 (Flexbox / Grid)	Styling and responsive layout
JavaScript (ES6+)	Application logic and DOM manipulation
localStorage API	Persistent client-side storage
Vercel	Hosting and deployment

These technologies allow the application to run fully in the browser without any backend server. 

AhnikPal_WD-FSWD-A4JAN-8770_Min…

Setup Instructions
Option 1 — Run Locally

Clone the repository:

git clone https://github.com/Ahnikpal/Task_Manager_Interns_Elite.git

Navigate into the project folder:

cd Task_Manager_Interns_Elite

Open the application:

Simply open index.html in your browser.

No installation or server setup is required.

Option 2 — Live Demo

You can view the live deployed project here:

Live Demo:
https://task-manager-interns-elite.vercel.app
Challenges Faced
1. Unique Task Identification

Using task text alone was unreliable because users can add duplicate tasks.
This was solved by assigning a unique ID using Date.now() to each task.

2. Syncing UI with localStorage

Ensuring the UI and stored data stayed synchronized required careful logic.
The solution was to:

Update the task array

Re-render the UI

Save to localStorage

3. Event Delegation

Since tasks are dynamically created, attaching event listeners individually was inefficient.
This was solved using event delegation on the parent container.

4. Maintaining Filter State

Keeping the correct filter active after adding or deleting tasks required tracking the active filter as a state variable.

5. Responsive Design

Ensuring the UI worked well across screen sizes required Flexbox and media queries. 

AhnikPal_WD-FSWD-A4JAN-8770_Min…

Key Learnings

Understanding localStorage and JSON data handling

Implementing event delegation in JavaScript

Improving DOM manipulation skills

Building responsive layouts using Flexbox

Managing application state and UI rendering

Repository & Deployment

GitHub Repository

https://github.com/Ahnikpal/Task_Manager_Interns_Elite

Live Demo

https://task-manager-interns-elite.vercel.app

Author

Ahnik Pal
Computer Science & Engineering Student

IntersElite Internship Program — March 2026
