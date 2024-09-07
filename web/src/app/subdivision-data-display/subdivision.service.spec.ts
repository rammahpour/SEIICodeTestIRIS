import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubdivisionService } from './subdivision.service';
import { ISubdivisionData, SubdivisionStatusCode } from './subdivision-model';

describe('SubdivisionService', () => {
  let service: SubdivisionService;
  let httpMock: HttpTestingController;

  const mockSubdivisions: ISubdivisionData = {
    subdivisions: [
      { id: 1, name: 'Subdivision A', subdivisionStatusCode: SubdivisionStatusCode.Active, latitude: 10, longitude: 20, nearMapImageDate: new Date('2023-01-01') },
      { id: 2, name: 'Subdivision B', subdivisionStatusCode: SubdivisionStatusCode.Future, latitude: 30, longitude: 40, nearMapImageDate: new Date('2023-02-01') },
      { id: 3, name: 'Subdivision C', subdivisionStatusCode: SubdivisionStatusCode.Builtout, latitude: 50, longitude: 60, nearMapImageDate: new Date('2023-03-01') },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubdivisionService],
    });

    service = TestBed.inject(SubdivisionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve subdivisions from the API via GET', () => {
    service.getSubdivisions().subscribe((subdivisions) => {
      expect(subdivisions).toEqual(mockSubdivisions);
    });

    const req = httpMock.expectOne('http://localhost:3000/v1/subdivisions');
    expect(req.request.method).toBe('GET');
    req.flush(mockSubdivisions);
  });
});
