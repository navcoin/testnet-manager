import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

// declare var TradingView;

@Component({
  selector: 'app-create-testnet',
  templateUrl: './create-testnet.component.html',
  styleUrls: ['./create-testnet.component.scss']
})
export class CreateTestnetComponent implements OnInit {

  isLinear = false;
  testnetNameFormGroup: FormGroup;
  testnetNameCtrl: FormControl;

  gitFormGroup: FormGroup;
  gitUrlCtrl: FormControl;

  gitBranchGroup: FormGroup;
  gitBranchCtrl: FormControl;


  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // build the name control
    this.testnetNameCtrl = new FormControl('', Validators.required);
    this.testnetNameFormGroup = this._formBuilder.group({});
    this.testnetNameFormGroup.addControl("testnetNameCtrl", this.testnetNameCtrl);

    this.gitUrlCtrl = new FormControl('https://github.com/NAVCoin/navcoin-core.git', Validators.required);
    this.gitFormGroup = this._formBuilder.group({});
    this.gitFormGroup.addControl("gitUrlCtrl", this.gitUrlCtrl);

    this.gitBranchCtrl = new FormControl('v4.1.2-devnet', Validators.required);
    this.gitBranchGroup = this._formBuilder.group({});
    this.gitBranchGroup.addControl("gitBranchCtrl", this.gitBranchCtrl);

  }

}
