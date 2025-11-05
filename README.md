# Bioprocess Optimization Builder

A web application for defining constraint and optimization goals and objectives in bioprocess engineering, built with **JavaScript**, **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

Developed by using Test-Driven Development (TDD) principles to ensure modular and maintainable code.

---

## Features Overview

### **1.Constraint Builder**
Define bioprocess constraints with an intuitive token-based interface.

![constraint-builder](https://github.com/user-attachments/assets/20d02541-4047-4446-9e53-5c4455c306ab)

### **2. Objective Definition**
set optimization goals and objectives for bioprocess parameters.

![define-objectives](https://github.com/user-attachments/assets/982bc3a1-c940-4c7f-9aca-4ae8824ce6df)

### **3. Review,  Simulation and Results**
View optimization results through interactive charts and summaries.

![review-and-simulation](https://github.com/user-attachments/assets/576bb842-a555-4b7f-baf3-ced1bdb2540e)


## Key Technical Decisions

### **Test-Driven Development (TDD)**
- Comprehensive tests written for the integrity of each component with over 130 tests.

### Modular Architecture
- Hooks are used for logic separation.
- Components are isolated based on their reponsibilities.

## Assumptions and Limitations

### **Assumptions and Limitations**

1. **Backend Integration**: The application assumes the data shared between components is managed via a backend service. The current implementation uses mock data for demonstration purposes.

2. **Constraint Validation**: Basic validation is implemented but may not cover all edge cases. E.g: (`<= <= <=`). These responsibilities are delegated to the backend.

3. **Single Session**: There is no data persistence across sessions due to the lack of backend integration.

3. **Parameters and Objectives**: Fixed set of parameters and objectives are used, although it can be extended or deleted as needed.

## Getting Started

### Prerequisites
- ```Node.js >= 18.x```
- ```npm >= 9.x```

### Installation
1. Clone the repository:
   ```bash
   gh repo clone ilkermeliksitki/differential-bio-ui
   cd differential-bio-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
    npm run dev
    ```
4. Open your browser and navigate to `http://localhost:5173`

5. Run tests:
   ```bash
   npm run test
   ```
