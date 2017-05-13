import { Action } from '@ngrx/store';
import { FilterActions } from '../actions/filter.actions';
import { TodoFilter } from '../models/filter.model';

export default function visibilityFilter(state: TodoFilter = 'SHOW_ALL', action: Action): TodoFilter {
  switch (  action.type ) {
    case FilterActions.SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state;
  }
}
