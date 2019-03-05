import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbImgComponent } from './thumb-img.component';

describe('ThumbImgComponent', () => {
  let component: ThumbImgComponent;
  let fixture: ComponentFixture<ThumbImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
