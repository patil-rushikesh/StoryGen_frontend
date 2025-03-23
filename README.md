# StoryGen Frontend

## Project Overview

StoryGen Frontend is the client-side interface for the **StoryGen** project, allowing users to interact with the backend APIs for **paraphrasing text** and **story generation**. It is built using **React** and **Vite**, ensuring a fast and optimized development experience.

---

## Project Structure

```
📂 STORYGEN_FRONTEND
├── 📂 public          # Static assets (e.g., images, videos)
│   ├── horror.mp4
│   ├── logo.png
├── 📂 src             # Source files
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── 📄 .gitignore      # Ignore specific files in git
├── 📄 eslint.config.js # Linting configuration
├── 📄 index.html      # Root HTML file
├── 📄 package-lock.json  # Lock file for dependencies
├── 📄 package.json    # Project dependencies and scripts
├── 📄 README.md       # Documentation
└── 📄 vite.config.js  # Vite configuration
```

---

## Technologies Used

- **React.js** - JavaScript library for building UI components
- **Vite** - Lightning-fast build tool for frontend projects
- **ESLint** - Ensures code quality and consistency
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library

---

## Project Dependencies

### Main Dependencies (from `package.json`)
```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.0.15",
    "gsap": "^3.12.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.15"
  }
}
```
📌 **Description:**
- `@tailwindcss/vite`: Enables Tailwind CSS with Vite for fast styling.
- `gsap`: A powerful animation library for UI elements.
- `react` & `react-dom`: Core dependencies for building React applications.
- `tailwindcss`: A utility-first CSS framework for responsive design.

### Dev Dependencies
```json
{
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "vite": "^6.2.0"
  }
}
```
📌 **Description:**
- `@eslint/js`: JavaScript linting configurations.
- `@types/react` & `@types/react-dom`: TypeScript definitions for React.
- `@vitejs/plugin-react`: React plugin for Vite.
- `eslint` & related plugins: Ensures code quality and best practices.
- `globals`: Provides predefined global variables.
- `vite`: Development server and build tool for modern frontend projects.

---

## Important Configuration Files

### `index.css`
📌 **Description:**
- This file contains the global styles for the application.
- It imports Tailwind CSS for utility-based styling.
- Defines a `.nav` class for styling the navigation bar with padding, flexbox layout, and alignment.
```css
@import "tailwindcss";

.nav {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

### `main.jsx`
📌 **Description:**
- The entry point for rendering the React application.
- Imports `StrictMode` from React to highlight potential issues in development mode.
- Uses `createRoot` from React DOM to render the `App` component into the `root` element in `index.html`.
- Imports `index.css` to apply global styles.
```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## Fixes & Improvements

### **Issue: Importing Video File Incorrectly**

#### Fix:
The following import in `App.jsx` is unnecessary:
```javascript
import "./../public/horror.mp4";
```
Instead, reference the video file directly in the `<video>` tag:
```jsx
<source src="/horror.mp4" type="video/mp4" />
```

### **Dropdown Default Selection Handling**

#### Fix:
Replace the `selected` attribute in `<option>` with `value` in the `<select>` tag:
```jsx
<select
  className="border border-gray-300 p-2 rounded-md"
  value={selectedOption}
  onChange={(e) => setSelectedOption(e.target.value)}
>
  <option value="" disabled>Select an option</option>
```

### **Consider Backend API Integration**
- The current `generateStory` function is a placeholder.
- Future improvements should replace it with an API call to the backend for dynamic story generation.

---

## How to Run the Project

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd STORYGEN_FRONTEND
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open the application in your browser:
   ```
   http://localhost:5173
   ```

---

