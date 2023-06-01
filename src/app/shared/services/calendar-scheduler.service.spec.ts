import { TestBed } from '@angular/core/testing';

import { CalendarSchedulerService } from './calendar-scheduler.service';

describe('CalendarSchedulerService', () => {
  let service: CalendarSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
