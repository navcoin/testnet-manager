import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerService} from "../services/server/server.service";
import {ServerVO} from "../services/server/server.vo";
import {LocalStorageService} from "../services/local-storage/local-storage.service";

// declare var TradingView;

@Component({
  selector: 'app-create-testnet',
  templateUrl: './create-testnet.component.html',
  styleUrls: ['./create-testnet.component.scss']
})
export class CreateTestnetComponent implements OnInit {

  isLinear = true;
  testnetNameFormGroup: FormGroup;
  testnetNameCtrl: FormControl;

  gitFormGroup: FormGroup;
  gitUrlCtrl: FormControl;

  gitBranchGroup: FormGroup;
  gitBranchCtrl: FormControl;

  ngrokGroup: FormGroup;
  ngrokCtrl: FormControl;

  doTokenGroup: FormGroup;
  doTokenCtrl: FormControl;

  serverGroup: FormGroup;
  doServerCtrl: FormControl;

  globalSettingsGroup: FormGroup;
  globalSettingTokenCtrl: FormControl;
  globalSettingCallBackCtrl: FormControl;



  constructor(
    private _formBuilder: FormBuilder,
    private _serverService: ServerService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    // build the name control
    this.testnetNameCtrl = new FormControl(null, Validators.required);
    this.testnetNameFormGroup = this._formBuilder.group({});
    this.testnetNameFormGroup.addControl("testnetNameCtrl", this.testnetNameCtrl);

    this.gitUrlCtrl = new FormControl('https://github.com/NAVCoin/navcoin-core.git', Validators.required);
    this.gitFormGroup = this._formBuilder.group({});
    this.gitFormGroup.addControl("gitUrlCtrl", this.gitUrlCtrl);

    this.gitBranchCtrl = new FormControl('v4.1.2-devnet', Validators.required);
    this.gitBranchGroup = this._formBuilder.group({});
    this.gitBranchGroup.addControl("gitBranchCtrl", this.gitBranchCtrl);

    this.ngrokCtrl = new FormControl(this._localStorageService.callBackURL, Validators.required);
    this.ngrokGroup = this._formBuilder.group({});
    this.ngrokGroup.addControl("ngrokCtrl", this.ngrokCtrl);

    this.doTokenCtrl = new FormControl(this._localStorageService.token, Validators.required);
    this.doTokenGroup = this._formBuilder.group({});
    this.doTokenGroup.addControl("doTokenCtrl", this.doTokenCtrl);

    this.doServerCtrl = new FormControl('', Validators.required);
    this.serverGroup = this._formBuilder.group({});
    this.serverGroup.addControl("doServerCtrl", this.doServerCtrl);



    this.globalSettingTokenCtrl = new FormControl(this._localStorageService.token);
    this.globalSettingCallBackCtrl = new FormControl(this._localStorageService.callBackURL);
    this.globalSettingsGroup = this._formBuilder.group({});
    this.globalSettingsGroup.addControl("globalSettingTokenCtrl", this.globalSettingTokenCtrl);
    this.globalSettingsGroup.addControl("globalSettingCallBackCtrl", this.globalSettingCallBackCtrl);

  }

  onCreate($event: MouseEvent) {
    $event.preventDefault();

    const serverVO: ServerVO = {} as ServerVO;

    serverVO.token = this.doTokenCtrl.value;
    serverVO.name = this.testnetNameCtrl.value;
    serverVO.servers = parseInt(this.doServerCtrl.value.toString(), 10);
    serverVO.callbackUrl = this.ngrokCtrl.value;
    serverVO.repoBranch = this.gitBranchCtrl.value;
    serverVO.repoUrl = this.gitUrlCtrl.value;

    this._serverService.createServers(serverVO);

  }

  onSaveToken($event: MouseEvent) {
    $event.preventDefault();
    this._localStorageService.token = this.globalSettingTokenCtrl.value.toString();
    this.doTokenCtrl.setValue(this.globalSettingTokenCtrl.value.toString())
  }

  onClearToken($event: MouseEvent) {
    $event.preventDefault();
    this._localStorageService.clearToken();
    this.globalSettingTokenCtrl.setValue('');
    this.doTokenCtrl.setValue('')
  }


  onSaveCallback($event: MouseEvent) {
    $event.preventDefault();
    this._localStorageService.callBackURL = this.globalSettingCallBackCtrl.value.toString();
    this.ngrokCtrl.setValue(this.globalSettingCallBackCtrl.value.toString())
  }

  onClearCallback($event: MouseEvent) {
    $event.preventDefault();
    this._localStorageService.clearCallback();
    this.globalSettingCallBackCtrl.setValue('');
    this.ngrokCtrl.setValue('')
  }

}
