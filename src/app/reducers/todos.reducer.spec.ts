import todosReducer from './todos.reducer';
import { TodoActions } from '../actions/todo.actions';

describe('Todos store', () => {
  let actual;
  const todoActions = new TodoActions();

  const state = {
    data: [
      {id: 1, title: 'Item 1', completed: false},
      {id: 2, title: 'Item 2', completed: false}
    ],
    pending: false,
    error: null
  };

  it('should return current state when no valid actions have been made', () => {
    actual = todosReducer(state, {type: 'INVALID_ACTION', payload: {}});

    expect(actual).toEqual(state);
  });

  it('should set pending to true when GET_TODOS is dispatched', () => {
    actual = todosReducer(state, todoActions.getTodos() );

    expect(actual.pending).toBeTruthy();
    expect(actual.error).toBeNull();
    expect(actual.data).toEqual(state.data);
  });

  it('should set new data when GET_TODOS_SUCCESS is dispatched', () => {
    const initialState = {
      data: [],
      pending: true,
      error: null
    };

    actual = todosReducer(initialState, todoActions.getTodosSucces(state.data.slice()));

    expect(actual.pending).toBeFalsy();
    expect(actual.data).toEqual(state.data);
  });

  it('should add new item to data when ADD_TODO_SUCCESS is dispatched', () => {
    const newTodo = {
      id: 123,
      title: 'New title',
      completed: false
    };

    const expected = {
      data: state.data.concat(newTodo),
      pending: false,
      error: null
    };

    actual = todosReducer(state, todoActions.addTodoSuccess(newTodo));

    expect(actual).toEqual(expected);
  });

  it('should mark todo as completed when TOGGLE_COMPLETE is dispatched', () => {
    const item = state.data[1];
    actual = todosReducer(state, todoActions.toggleTodo(item));
    const [selectedItem] = actual.data.filter(todo => todo.id === item.id);

    expect(selectedItem.completed).toBeTruthy();
  });

  it('should remove todo when REMOVE_TODO is dispatched', () => {
    const item = state.data[1];
    actual = todosReducer(state, todoActions.removeTodo(item));

    expect(actual.data.findIndex(todo => todo.id === item.id)).toEqual(-1);
  });

});
