import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { TodoFilter } from '../models/filter.model';

@Injectable()
export class FilterActions {
  static SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
  setVisibilityFilter(filter: TodoFilter ): Action {
    return {
      type: FilterActions.SET_VISIBILITY_FILTER,
      payload: filter
    };
  }
}
