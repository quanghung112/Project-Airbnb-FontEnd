import { TestBed } from '@angular/core/testing';

import { LoginLogoutServiceBackendApiService } from './login-logout-service-backend-api.service';

describe('LoginLogoutServiceBackendApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginLogoutServiceBackendApiService = TestBed.get(LoginLogoutServiceBackendApiService);
    expect(service).toBeTruthy();
  });
});
