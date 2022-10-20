import {Component} from '@angular/core';
import {Global as settings} from "./settings/Global";
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hanoi Tower';
  currentYear: number = new Date().getFullYear();
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faMailBulk = faMailBulk;

  getNameAndVersion() {
    return `${settings.GAME_NAME} v${settings.GAME_VERSION}`;
  }
}
