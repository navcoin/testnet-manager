import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatHorizontalStepper,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBarModule, MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,

    BrowserAnimationsModule,

    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule

  ],
  declarations: [


  ],
  providers: [
  ],

  exports: [
    BrowserAnimationsModule,

    FlexLayoutModule,

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatStepperModule

  ]
})
export class SharedMaterialModule { }
