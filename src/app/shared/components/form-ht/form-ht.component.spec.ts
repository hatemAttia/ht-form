import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHtComponent } from './form-ht.component';

describe('FormHtComponent', () => {
  let component: FormHtComponent;
  let fixture: ComponentFixture<FormHtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormHtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
