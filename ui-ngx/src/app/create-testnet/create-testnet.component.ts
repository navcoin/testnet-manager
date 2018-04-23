import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

// declare var TradingView;

@Component({
  selector: 'app-create-testnet',
  templateUrl: './create-testnet.component.html',
  styleUrls: ['./create-testnet.component.scss']
})
export class CreateTestnetComponent implements OnInit {

  isLinear = false;
  testnetGroupName: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.testnetGroupName = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

}
