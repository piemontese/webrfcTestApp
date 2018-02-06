import { TestBed, inject } from '@angular/core/testing';

import { DataTableDetailService } from './data-table-detail.service';

describe('DataTableDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTableDetailService]
    });
  });

  it('should be created', inject([DataTableDetailService], (service: DataTableDetailService) => {
    expect(service).toBeTruthy();
  }));
});
