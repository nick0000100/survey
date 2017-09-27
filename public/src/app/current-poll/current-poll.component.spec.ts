import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPollComponent } from './current-poll.component';

describe('CurrentPollComponent', () => {
  let component: CurrentPollComponent;
  let fixture: ComponentFixture<CurrentPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
