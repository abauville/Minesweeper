
export class HtmlBoard {
  constructor(htmlBoard) {
    this.board = htmlBoard;
    console.log("board", this.board);
  }

  fillHtmlGrid(game) {
    const grid = game.grid;
    this.board.innerHTML = "";
    let colsHTML = "";
    grid.forEach((cellValue, index) => {
      colsHTML += `<td
                    data-action="click->game#handleClick
                    contextmenu->game#flagCell"
                    data-index="${index}"
                    class="unopened">${cellValue}</td>`;
      if (((index + 1) % game.nx) === 0) {
        this.board.insertAdjacentHTML("beforeend", `<tr>${colsHTML}</tr>`);
        colsHTML = "";
      }
    });
  }

  applyVisibility2Html(game) {
    const grid = game.grid;
    const visGrid = game.visibilityGrid;
    const cells = this.board.querySelectorAll("td");
    const states = ['unopened', 'flagged', 'question'];
    cells.forEach((cell, index) => {
      // cell.class = "stuff";
      cell.className = "";
      if (visGrid[index] === 1) {
        let className = "mine";
        if (grid[index] >= 0) {
          className += `-neighbour-${grid[index]}`;
          // className += ` opened`;
        }
        cell.classList.add(className);
        cell.classList.add("opened");
      } else {
        cell.classList.add(states[-visGrid[index]]);
      }
    });
  }

  removeActions(game) {
    const cells = this.board.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.dataset.action = "";
    });
  }
}
