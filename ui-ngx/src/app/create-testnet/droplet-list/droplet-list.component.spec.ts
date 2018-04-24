import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropletListComponent } from './droplet-list.component';

describe('DropletListComponent', () => {
  let component: DropletListComponent;
  let fixture: ComponentFixture<DropletListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropletListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
