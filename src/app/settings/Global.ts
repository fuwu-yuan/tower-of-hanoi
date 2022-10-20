import {version} from '../../../package.json';

export class Global {
  public static GAME_NAME: string = "MyGame";
  public static GAME_VERSION = version;
  public static CANVAS_WIDTH: number = 799*1.7;
  public static CANVAS_HEIGHT: number = 400*1.7;
}
