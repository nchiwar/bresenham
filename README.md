Bresenham Line Drawing Game
A web-based educational tool and game to teach the Bresenham Line Drawing Algorithm using React, Tailwind CSS, p5.js, and Python (via Pyodide).
Features

Tutorial: Animated introduction to the Bresenham algorithm with audio narration.
Game: Interactive experience where players select two points on a grid, calculate slope and algorithm constants, and visualize the line drawing process.
Frontend: Built with React, Tailwind CSS for styling, and p5.js for canvas animations.
Backend Logic: Bresenham algorithm implemented in Python, executed in the browser using Pyodide.

Setup

Clone the repository:git clone <repository-url>
cd bresenham-game


Install dependencies:npm install


Start the development server:npm start



Dependencies

React: Frontend framework
Tailwind CSS: Styling
p5.js: Canvas animations
Pyodide: Python execution in the browser

Usage

Navigate to the app in your browser
Switch between Tutorial and Game modes using the buttons.
In Game mode:
Click two points on the grid to define a line segment.
Enter coordinates and calculate constants ((\Delta x), (\Delta y), (P_0)).
View the iteration table and animated line drawing.


Audio narration file (path-to-narration.mp3) must be hosted and linked in Tutorial.js.
Pyodide runs Python in the browser, so avoid file I/O or network calls in Python code.
