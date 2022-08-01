import { Component} from '@angular/core';
import { MainService } from '../../services/main.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MainService]
})
export class MainComponent {
  public title: String = 'Welcome to GestArmory';
  public slogan: String = 'GestArmory is a unique tool to register the ammunition and create the legal documents like waybill, auxiliar books, and many more for your armory store with just a few clicks, saving a lot of time in the process.';
  public info: String = "";

  constructor(
    private _mainService: MainService,
    ) {

  }

}
