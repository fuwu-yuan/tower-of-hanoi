import {Board, Entities, GameStep} from "@fuwu-yuan/bgew";
import {Piece} from "../entities/piece";
import {Column} from '../entities/column'
import {BackgroundMappingSettings} from "../settings/background-mapping";

export class MainStep extends GameStep {
  name: string = "main";

  level: number = 12;
  startingColumn = 1;
  columns: Column[] = [new Column(0), new Column(1), new Column(2)];

  grabbedPiece: Piece|null = null;
  grabbedPieceMouseDelta:{x:number,y:number} = {x:0,y:0};

  constructor(board: Board) {
    super(board);

    // Background
    this.board.addEntity(new Entities.Image('/assets/images/background.jpeg', 0, 0, this.board.width, this.board.height));

    // Init pieces
    for (let i = 0; i < this.level; i++) {
      let piece = new Piece(this.level-i, this.columns[this.startingColumn]);
      piece.onMouseEvent('mousedown', this.grabPiece(piece));
      piece.onMouseEvent('mouseup', this.releasePiece(piece));
      this.columns[this.startingColumn].add(piece);
    }
    this.board.addEntities(this.columns[0].concat(this.columns[1]).concat(this.columns[2]));
  }

  grabPiece(piece: Piece) {
    return (event: MouseEvent, x: number, y: number) => {
      if (piece === piece.column[piece.column.length-1]) {
        this.grabbedPiece = piece;
        this.grabbedPieceMouseDelta = {x: x-piece.x, y: y-piece.y};
      }
    }
  }

  releasePiece(piece: Piece) {
    return (event: MouseEvent) => {
      if (this.grabbedPiece) {
        let reset = true;
        let initialCol = this.grabbedPiece.column;
        this.grabbedPiece.column.remove(this.grabbedPiece);
        for (let i = 0; i < 3; i++) {
          if (this.grabbedPiece.x < BackgroundMappingSettings.COLUMNS_X[i] && this.grabbedPiece.x + this.grabbedPiece.width > BackgroundMappingSettings.COLUMNS_X[i]) {
            if (this.columns[i].length === 0 || this.columns[i][this.columns[i].length-1].size > this.grabbedPiece.size) {
              this.columns[i].add(this.grabbedPiece);
              reset = false;
            }
          }
        }
        if (reset) {
          initialCol.add(this.grabbedPiece);
        }
        this.grabbedPiece = null;
      }
    }
  }

  onEnter(): void {
    this.board.onMouseEvent('mousemove', (event, x, y) => {
      if (this.grabbedPiece !== null) {
        this.grabbedPiece.x = x-this.grabbedPieceMouseDelta.x;
        this.grabbedPiece.y = y-this.grabbedPieceMouseDelta.y;
      }
    });
  }

  onLeave(): void {
  }

  update(delta: number) {

  }
}
