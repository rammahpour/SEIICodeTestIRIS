import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubdivisionService } from './subdivision.service';
import { Subdivision } from './subdivision-model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css'],
})
export class SubdivisionDataDisplayComponent implements OnInit, OnDestroy {
  subdivisions: Subdivision[] = [];
  filteredSubdivisions: Subdivision[] = [];
  filterCriteria = 'All';
  sortCriteria = 'name';
  private subscription!: Subscription;


  constructor(private subdivisionService: SubdivisionService) {}

  ngOnInit(): void {
    this.subscription = this.subdivisionService.getSubdivisions().subscribe((data) => {
      this.subdivisions = data.subdivisions;
      this.applyFilterAndSort();
    });
  }

  applyFilterAndSort(): void {
    let filteredData = [...this.subdivisions];

    if (this.filterCriteria !== 'All') {
      filteredData = filteredData.filter(
        (subdivision) => subdivision.subdivisionStatusCode === this.filterCriteria
      );
    }

    filteredData.sort((a: any, b: any) => {
      if (this.sortCriteria === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortCriteria === 'nearMapImageDate') {
        return new Date(b.nearMapImageDate).getTime() - new Date(a.nearMapImageDate).getTime();
      }
      return 0;
    });

    this.filteredSubdivisions = filteredData;
  }

  onFilterChange(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.filterCriteria = filterValue;
    this.applyFilterAndSort();
  }

  onSortChange(event: Event): void {
    this.sortCriteria = (event.target as HTMLSelectElement).value;
    this.applyFilterAndSort();
  }

  trackBySubdivision(index: number, subdivision: Subdivision): number {
    return subdivision.id;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
