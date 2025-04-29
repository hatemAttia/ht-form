import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHtmlNativeComponent } from './form-html-native.component';

describe('FormHtmlNativeComponent', () => {
  let component: FormHtmlNativeComponent;
  let fixture: ComponentFixture<FormHtmlNativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHtmlNativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormHtmlNativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
