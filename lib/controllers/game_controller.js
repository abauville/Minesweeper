import { Controller } from '@hotwired/stimulus';
import { Game } from "../models/game";
import { HtmlBoard } from "../models/html_board";


export default class extends Controller {
  static get targets() {
    return ['prompt', 'board', 'nx', 'ny', 'nMines'];
  }

  connect() {
    this.promptTarget.innerText = "Hey!";
    
    this.start();

    const tableContainer = document.querySelector("#table-container");
    tableContainer.addEventListener("resize", event => this.changeBoardSize(event));
  }

  start(event) {
    if (event) {
      event.preventDefault();
    }
    this.game = new Game(
      Number(this.nxTarget.value), 
      Number(this.nyTarget.value),
      Number(this.nMinesTarget.value)
    );
    console.log(this.boardTarget);
    this.board = new HtmlBoard(this.boardTarget);
    this.board.fillHtmlGrid(this.game);
    this.firstClick = true;
  }

  handleClick(event) {
    if (event.altKey) {
      this.questionCell(event);
    } else {
      if (this.firstClick) {
        this.game.placeMines(Number(event.currentTarget.dataset.index));
        this.firstClick = false;
        this.board.fillHtmlGrid(this.game);
        // this.game.revealGrid(event);
        // this.board.applyVisibility2Html(this.game);
      }
      this.openCell(event);
    }

    if (this.game.isLost(event)) {
      console.log("lost:", event.currentTarget);
      this.endGame(event, "You lose!");
      event.currentTarget.classList.add("clicked");
      return "lose";
    }
    if (this.game.isWon(event)) {
      this.endGame(event, "You win! Congratulations!");
      return "win";
    }
    return "continue";
  }

  openCell(event) {
    console.log(event);
    this.game.openCell(Number(event.currentTarget.dataset.index));
    this.board.applyVisibility2Html(this.game);
  }

  questionCell(event) {
    this.flagCell(event, -2);
  }

  flagCell(event, flagId = -1) {
    event.preventDefault();
    const index = event.currentTarget.dataset.index;
    const status = this.game.visibilityGrid[index];

    if (status === 0) {
      this.game.visibilityGrid[index] = flagId;
    }
    this.board.applyVisibility2Html(this.game);
  }

  endGame(event, msg) {
    this.board.removeActions(this.game);
    this.game.revealGrid(event);
    this.board.applyVisibility2Html(this.game);
    this.promptTarget.innerHTML = msg;
    return msg;
  }

  changeBoardSize(event) {
    console.log("Resize!!!");
  }
}
