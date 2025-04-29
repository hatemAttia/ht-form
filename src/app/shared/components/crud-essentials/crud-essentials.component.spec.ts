import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEssentialsComponent } from './crud-essentials.component';

describe('CrudEssentialsComponent', () => {
  let component: CrudEssentialsComponent;
  let fixture: ComponentFixture<CrudEssentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudEssentialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudEssentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
