/*
 * Copyright 2019 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TestBed, async } from '@angular/core/testing';

import { EndpointService } from '../config/endpoint-service';

describe('EndpointService', () => {
  let service: EndpointService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [EndpointService]
    }).compileComponents();

    service = TestBed.get(EndpointService);
  }));

  it('should be able to get the REST endpoint', () => {
    const endpoint = service.defaultRestEndpoint;

    const testEndpoint = service.getRestEndpoint();

    expect(testEndpoint).toEqual(endpoint);
  });
});
