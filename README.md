# 📝 Articula Project

A full-featured single-page application built using React and supporting libraries, created on **July 15, 2025** as the final project in the **Frontend Development Course by Al-Mubarmijoon Company**. The site allows authenticated users to create, edit, and publish articles, with multiple dynamic pages and routing logic.

> ⚠️ **Note**: This project was **not** built from a YouTube tutorial. It represents the final deliverable in a structured professional training program. The implementation was done entirely by me, with attention to realistic architecture, reusable components, and scalable routing.

## 🧰 Technologies Used

- HTML5
- CSS3
- React
- React Router
- Bootstrap React
- Swiper React
- AOS React
- Fonts via CDN
- Real backend APIs

## 🔐 Authentication & Permissions

- Login and logout functionality
- Register new user accounts
- Session-based and local storage authentication
- Conditional rendering based on login status
- Users Can Delete Their Account and Articles Only

> ⚠️ **Note**: Upon registration, a verification link is sent to the user's email address. The **account** must be **activated** by clicking this link before gaining access to protected features.

## 🧠 Functional Highlights

- **Article System**

  - Create, edit, and delete personal articles
  - View article details
  - Filter articles by category, tag, and live search
  - Paginated article list with control over items per page

- **User Management**

  - View user list in dashboard
  - Live filtering across multiple fields (name, email, etc.)
  - Delete user accounts (with permission restrictions)

- **Profile Features**

  - Edit profile information
  - Delete personal account from profile page

- **Dashboard Insights**

  - View summary of users and articles
  - Admin tools for managing content

- **FAQ System**

  - Browse frequently asked questions
  - Filter questions by category

- **Static Pages**
  - About Us
  - Contact
  - Vacancies
  - 404 Error page

## 🎨 Visual & UX Features

- Responsive design across all screen sizes
- Light and dark mode toggle
- RTL/LTR layout switch (content translation not available)
- Loading indicators and user feedback messages
- All colors and font sizes defined via CSS variables
- Conditional rendering for UI elements based on state

## ⚙️ React Hooks & Architecture

- Extensive use of `useState` and `useEffect`
- Shared state via `useContext`
- `useRef`
- Performance optimization via `useMemo` and `memo`
- Modular component structure
- Dynamic routing and layout control

## 📁 Project Structure

- public
  - images
- src
  - assets
    - css
      - css files...
    - js
      - CSRF_Token.js
    - images
  - bigComponents
    - jsx files
  - components
    - jsx files
  - sections_components
    - jsx files
  - special_components
    - jsx files
  - sub_sec_components
    - jsx files
  - other jsx and css files....
- index.html
- package-lock.json
- package.json
- README.md
- vite.config.js

## 🕰️ Project Timeline

- **Start Date**: July 15, 2025
- **Duration**: ~1 month
- **Type**: Final project in structured training program

## 📌 Notes

This project was developed as a capstone for the Frontend Development Course by Al-Mubarmijoon. It focuses on building a scalable SPA using React, with real-world features like authentication, dynamic routing, and content management. The architecture was designed to support future expansion and modularity.

## 🔗 Live Preview

View the project live here:

[Articula Project](https://abddalrahman.github.io/Articula-Project)
