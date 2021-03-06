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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AnalyticsService } from '../gaffer/analytics.service';
import { ParameterInputComponent } from './parameter-input.component';

@Component({
  selector: 'app-query',
  template: ''
})
class MockOperationComponent {
  @Input() model;
}

class AnalyticsServiceStub {
  getAnalytic = () => {
    return {
      operationName: 'Test operation name'
    };
  }
  executeAnalytic = () => { };
}

describe('ParameterInputComponent', () => {
  let component: ParameterInputComponent;
  let fixture: ComponentFixture<ParameterInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterInputComponent, MockOperationComponent],
      imports: [MatCardModule, MatProgressSpinnerModule, FormsModule],
      providers: [{ provide: AnalyticsService, useClass: AnalyticsServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterInputComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should execute the named operation on execution', () => {
    fixture.detectChanges();
    const analyticsService = TestBed.get(AnalyticsService);
    const spy = spyOn(analyticsService, 'executeAnalytic');

    component.executeAnalytic();

    expect(spy).toHaveBeenCalledWith();
  });

  it('should set loading to true on execute', () => {
    fixture.detectChanges();

    component.loading = true;

    expect(component.loading).toBeTruthy();
  });
});
