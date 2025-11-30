# CRUD Todo App

## Frontend (Client)
Users are met with a _responsive_, minimalistic UI complete with _login_, _registration_, and _dashboard_ views/routes.

A demo can be found 

### Tech Stack:
- **Vue 3** (Composition API)
- **Vue Router**
- **Pinia** (for state management)
- **Vee Validitate** & **Zod** (for form validation)
- **Tailwind CSS 3**

## Backend (Server)
Based on the user's actions (such as a _login_ form submission), the client sends requests (say a _POST_ request) to the backend API.

Then, the backend responds with a response; this API is capable of handling _GET_, _POST_, _PATCH_, and _DELETE_ requests.

Moreover, the backend sets a CSRF cookie for the client via a _GET_ request which is required when authenticating users.

Users are able to create, edit, and delete, todo tasks; user account information and user todo list information are stored in a SQL database.

### Tech Stack
- **Django**
- **PostgreSQL** (data storage)
- **Djangorestframework** (for creating a REST API)

## Testing
- ...
