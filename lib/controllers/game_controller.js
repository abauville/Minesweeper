import { Controller } from '@hotwired/stimulus';
import { Game } from "../models/game";
import { HtmlBoard } from "../models/html_board";


export default class extends Controller {
  static get targets() {
    return ['prompt', 'board', 'nx', 'ny', 'nMines'];
  }

  connect() {
    
    
    this.start();

    const tableContainer = document.querySelector("#table-container");
    tableContainer.addEventListener("resize", event => this.changeBoardSize(event));
  }

  start(event) {
    if (event) {
      event.preventDefault();
    }
    this.promptTarget.innerText = "";
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
        // this.game.revealGrid(event);
        // this.board.applyVisibility2Html(this.game);
      }
      
    }

    if (this.game.isLost(event)) {
      
      this.endGame(event.currentTarget, "You lose!");
      event.currentTarget.classList.add("clicked");
      console.log("lost:", event.currentTarget);
      
      return "lose";
    }
    if (this.game.isWon(event)) {
      this.endGame(event, "You win! Congratulations!");
      return "win";
    }
    this.openCell(event);
    return "continue";
  }

  openCell(event) {
    console.log(event);
    this.game.openCell(Number(event.currentTarget.dataset.index));
    this.board.fillHtmlGrid(this.game);
    this.board.applyVisibility2Html(this.game);
  }

  questionCell(event) {
    this.flagCell(event, -2);
  }

  flagCell(event, flagId = -1) {
    console.log("flag");    
    event.preventDefault();
    const index = event.currentTarget.dataset.index;
    const status = this.game.visibilityGrid[index];

    if (status === 0) {
      this.game.visibilityGrid[index] = flagId;
    }
    this.board.fillHtmlGrid(this.game);
    this.board.applyVisibility2Html(this.game);
  }

  endGame(event, msg) {
    this.board.removeActions(this.game);
    this.game.revealGrid(event);
    this.board.applyVisibility2Html(this.game);
    this.promptTarget.innerHTML = msg;
    return msg;
  }
}
