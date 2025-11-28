Munees's high level notes/plans:

Our goal is to build a Task Management Application using MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application will allow users to manage their tasks, including creating, and updating(Deleting not allowed). The application will also have a user authentication system, with two user roles: Admin and Normal User. The Admin user will have additional permissions to delete tasks, while the Normal User will only have the ability to add and edit their own tasks.

Pages/routes:
Sign Up, Sign In, Dashboard (task list with 
pagination), and Add/Edit Task form. 


Repo type:
Mono repo architecture with concurrently for running multiple apps

Tech stack must use:
Axios, Shadcn, Node.js, Express.js, MongoDB, Mongoose, JWT, React.js, Vite, Tailwind CSS Version 4 or above, zustand for state management

Features:
  * Task feature: 
    - Each task should include: Title, Description, Status (Pending/Completed), and Created Date. 
  * Dark/Light theme switcher.
  * Responsive design.
  * User roles: Admin and Normal User.
    - Only Admin users should be able to delete tasks (hide delete option for normal users). - Should be done from the frontend and backend API.
