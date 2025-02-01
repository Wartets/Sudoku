# Sudoku

Sudoku is a web application that allows you to play Sudoku with customizable grid sizes and difficulty levels. The site features an interactive interface where you can adjust the size of the grid (with n×n blocks) and the percentage of pre-filled cells. It also provides real-time validation, ensuring that errors are flagged immediately. Once the Sudoku puzzle is completed correctly, a congratulatory message is displayed.

## Features

- **Customizable Grid Size:** Choose the size of the Sudoku grid by selecting the block size (n×n blocks, each block being n×n cells).
- **Adjustable Difficulty:** Set the percentage of pre-filled cells to control the difficulty level of the puzzle.
- **Responsive Design:** The layout adapts for both desktop and mobile devices. On mobile, the settings are placed above the grid, and cell sizes are adjusted to fit the screen.
- **Real-Time Validation:** The app checks your inputs as you fill in the grid, flagging incorrect entries.

## Files

- **index.html:** Contains the structure of the page, including the settings and Sudoku grid.
- **styles.css:** Provides the styling, ensuring a sleek design and responsiveness across devices.
- **script.js:** Handles the logic for generating the Sudoku puzzle, checking user inputs, and validating the game.

## How to Use (off-line)

1. **Clone or Download the Repository:**  
   Clone the repository to your machine or download it as a ZIP file and extract it.

2. **Open the Site:**  
   Open the `index.html` file in your web browser.

3. **Set Up Your Game:**  
   - Select the grid size by entering a number (e.g., 3 for a 9x9 grid with 3x3 blocks).
   - Set the percentage of pre-filled cells to adjust the puzzle's difficulty.
   - Click "Générer Sudoku" to generate a new puzzle.

4. **Play the Game:**  
   Fill in the grid. The app will validate your entries in real time. If there are any errors, they will be highlighted. Once you complete the puzzle, a message will appear congratulating you.
   
---