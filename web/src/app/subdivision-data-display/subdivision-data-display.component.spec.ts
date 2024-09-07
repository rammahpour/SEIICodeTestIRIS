import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import { SubdivisionService } from './subdivision.service';
import { of } from 'rxjs';
import { Subdivision, SubdivisionStatusCode } from './subdivision-model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;
  let subdivisionService: jasmine.SpyObj<SubdivisionService>;
  let de: DebugElement;

  const mockSubdivisions: Subdivision[] = [
    { id: 1, name: 'Subdivision A', subdivisionStatusId: 1, subdivisionStatusCode: SubdivisionStatusCode.Active, latitude: 10, longitude: 20, nearMapImageDate: new Date('2023-01-01')  },
    { id: 2, name: 'Subdivision B', subdivisionStatusId: 2, subdivisionStatusCode: SubdivisionStatusCode.Builtout, latitude: 30, longitude: 40, nearMapImageDate: new Date('2023-01-01')  },
    { id: 2, name: 'Subdivision C', subdivisionStatusId: 3, subdivisionStatusCode: SubdivisionStatusCode.Future, latitude: 50, longitude: 60, nearMapImageDate: new Date('2023-01-01')  }
  ];

  beforeEach(async () => {
    const subdivisionServiceSpy = jasmine.createSpyObj('SubdivisionService', ['getSubdivisions']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubdivisionDataDisplayComponent],
      providers: [
        { provide: SubdivisionService, useValue: subdivisionServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    subdivisionService = TestBed.inject(SubdivisionService) as jasmine.SpyObj<SubdivisionService>;

    // Mock the service call
    subdivisionService.getSubdivisions.and.returnValue(of({ subdivisions: mockSubdivisions }));

    fixture.detectChanges(); // Trigger the ngOnInit lifecycle
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display subdivisions on initialization', () => {
    component.ngOnInit();
    expect(component.subdivisions.length).toBe(3);
    expect(component.filteredSubdivisions.length).toBe(3);

    const subdivisionElements = de.queryAll(By.css('li'));
    expect(subdivisionElements.length).toBe(3);
    expect(subdivisionElements[0].nativeElement.textContent).toContain('Subdivision A');
  });

  it('should filter subdivisions based on filter criteria', () => {
    component.filterCriteria = 'Active';
    component.applyFilterAndSort();
    expect(component.filteredSubdivisions.length).toBe(1);
    expect(component.filteredSubdivisions[0].name).toBe('Subdivision A');
  });

  it('should sort subdivisions by name', () => {
    component.sortCriteria = 'name';
    component.applyFilterAndSort();
    expect(component.filteredSubdivisions[0].name).toBe('Subdivision A');
    expect(component.filteredSubdivisions[1].name).toBe('Subdivision B');
    expect(component.filteredSubdivisions[2].name).toBe('Subdivision C');
  });

  it('should sort subdivisions by nearMapImageDate', () => {
    component.sortCriteria = 'nearMapImageDate';
    component.applyFilterAndSort();
    expect(component.filteredSubdivisions[0].name).toBe('Subdivision A');
    expect(component.filteredSubdivisions[2].name).toBe('Subdivision C');
  });

  it('should update filter criteria when onFilterChange is called', () => {
    const mockEvent = { target: { value: 'Future' } } as unknown as Event;
    component.onFilterChange(mockEvent);
    expect(component.filterCriteria).toBe('Future');
  });

  it('should update sort criteria when onSortChange is called', () => {
    const mockEvent = { target: { value: 'nearMapImageDate' } } as unknown as Event;
    component.onSortChange(mockEvent);
    expect(component.sortCriteria).toBe('nearMapImageDate');
  });

  it('should return correct id from trackBySubdivision', () => {
    const subdivision = mockSubdivisions[0];
    const trackById = component.trackBySubdivision(0, subdivision);
    expect(trackById).toBe(subdivision.id);
  });
});
