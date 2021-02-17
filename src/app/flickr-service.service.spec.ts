import { TestBed } from '@angular/core/testing';

import { FlickrServiceService } from './flickr-service.service';

describe('FlickrServiceService', () => {
  let service: FlickrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlickrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
