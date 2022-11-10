const defaultState = {
  toDoList: [],
  activefilter: "ALL",
};

export const toDoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      return { ...state, toDoList: [...state.toDoList, action.payload] };
    }

    case "TOGGLE_TODO": {
      const id = action.payload;
      return {
        ...state,
        toDoList: [
          ...state.toDoList.map((toDo) => {
            if (toDo.id === id) {
              toDo.completed = !toDo.completed;
            }
            return toDo;
          }),
        ],
      };
    }

    case "REMOVE_TODO": {
      const id = action.payload;
      return {
        ...state,
        toDoList: [...state.toDoList.filter((toDo) => toDo.id !== id)],
      };
    }

    case "FILTER_TODO": {
      let activeFilter = action.payload;
      return {
        ...state,
        activeFilter: activeFilter,
      };
    }

    default:
      return state;
  }
};
