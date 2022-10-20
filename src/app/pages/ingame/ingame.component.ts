import {AfterContentInit, AfterViewInit, Component} from '@angular/core';
import {MainStep} from "../../steps/main";
import {Board, Network} from '@fuwu-yuan/bgew';
import {environment} from "../../../environments/environment";
import {Global as GlobalSettings} from "../../settings/Global";

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements AfterViewInit,AfterContentInit {

  board: Board|null = null;

  constructor(
  ) {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    this.board = new Board(
      GlobalSettings.GAME_NAME,
      GlobalSettings.GAME_VERSION,
      GlobalSettings.CANVAS_WIDTH,
      GlobalSettings.CANVAS_HEIGHT,
      document.getElementById("game"),
      "transparent");

    if(!environment.production) {
      console.log("APP IS IN DEV MODE");
      this.board.networkManager = new class extends Network.NetworkManager {
        get apiUrl(): string { return "http://127.0.0.1:8081/api"; }
        get wsUrl(): string { return "ws://127.0.0.1:8081/"; }
      }(this.board);
    }

    /* Init and start board */
    this.initSteps(this.board);
    this.board.start();
  }

  initSteps(board: Board) {
    /* Init steps */
    if (board) {
      let mainStep = new MainStep(board);
      board.step = mainStep; // First shown step
      /* All Steps */
      board.addSteps([
        mainStep
      ]);
    }
  }
}
