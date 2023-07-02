import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencySearchComponent } from './agency-search.component';

describe('AgencySearchComponent', () => {
  let component: AgencySearchComponent;
  let fixture: ComponentFixture<AgencySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
