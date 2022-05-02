/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import { randomUniqueArray } from "../helpers";

export class Game {
  constructor(nx, ny, nMines) {
    this.nx = nx;
    this.ny = ny;
    this.n = this.nx * this.ny;
    this.nMines = nMines;
    this.grid = this.initGrid();
    this.visibilityGrid = this.initGrid();
  }

  initGrid() {
    const grid = [];
    for (let i = 0; i < this.n; i += 1) {
      grid.push(0);
    }
    return grid;
  }

  placeMines(forbiddenIndex) {
    console.log("placeMines, forbidden:", forbiddenIndex);
    const mineIndices = randomUniqueArray(this.n, this.nMines, forbiddenIndex);
    console.log(mineIndices);
    this.nMines = mineIndices.length; // in the unlikely where it takes too long to put mines
    let i, j;
    mineIndices.forEach((ind) => {
      this.grid[ind] = -1;
      this.fillLocal(ind);
    });
  }

  fillLocal(index) {
    this.forEachNeighbour(index, (i) => { if (this.grid[i] !== -1) { this.grid[i] += 1; } });
  }

  openCell(index) {
    this.visibilityGrid[index] = 1;
    if (this.grid[index] !== 0) { return; }
    const horizon = [index];
    while (horizon.length > 0) {
      this.openCellNeighborhood(horizon);
    }
  }

  openCellNeighborhood(horizon) {
    this.forEachNeighbour(horizon.shift(), (i) => {
      if (this.grid[i] === 0 && this.visibilityGrid[i] === 0) {
        horizon.push(i);
      }
      this.visibilityGrid[i] = 1;
    });
  }

  forEachNeighbour(index, callback) {
    const iGlob = this.getI(index);
    const jGlob = this.getJ(index);
    for (let i = Math.max(iGlob - 1, 0); i < Math.min(iGlob + 2, this.ny); i += 1) {
      for (let j = Math.max(jGlob - 1, 0); j < Math.min(jGlob + 2, this.nx); j += 1) {
        callback(this.getIndex(i, j));
      }
    }
  }

  getI(index) {
    return Math.floor(index / this.nx);
  }

  getJ(index) {
    const i = Math.floor(index / this.nx);
    return index - i * this.nx;
  }

  getIndex(i, j) {
    return i * this.nx + j;
  }

  isLost(event) {
    const index = event.currentTarget.dataset.index;
    return this.grid[index] === -1;
  }

  isWon(event) {
    // let win_status = true;
    return !(this.visibilityGrid.some((cell, index) => {
      return cell <= 0 && this.grid[index] !== -1; // unopened cell without mine?
    }));
  }

  revealGrid(event) {
    this.visibilityGrid.forEach((cell, i) => { this.visibilityGrid[i] = 1 });
  }
}
