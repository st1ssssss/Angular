import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSideBarComponent } from './edit-side-bar.component';

describe('EditSideBarComponent', () => {
  let component: EditSideBarComponent;
  let fixture: ComponentFixture<EditSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
