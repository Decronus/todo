import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const toDoList = useSelector((state) => state.toDo.toDoList);
  const filtredToDoList = useSelector((state) => state.toDo.filtredToDoList);

  const addToDo = (name) => {
    const toDo = {
      name,
      id: Math.floor(Math.random() * 10 ** 10),
      completed: false,
    };
    dispatch({ type: "ADD_TODO", payload: toDo });
  };

  const toggleToDo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const removeToDo = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const filterToDo = (activeFilter) => {
    dispatch({ type: "FILTER_TODO", payload: activeFilter });
  };

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <button onClick={() => addToDo(prompt("Введите название дела"))}>
          Добавить дело
        </button>
        <select
          onChange={(event) => filterToDo(event.target.value)}
          style={{
            display: toDoList.length > 0 ? "block" : "none",
            marginTop: "20px",
          }}
          defaultValue="all"
        >
          <option value="ALL">Все дела</option>
          <option value="COMPLETED">Только завершенные</option>
          <option value="ACTIVE">Только неоконченные</option>
        </select>
        <div>
          {toDoList.map((toDo) => (
            <div
              key={toDo.id}
              id={toDo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              <input
                type="checkbox"
                style={{ cursor: "pointer" }}
                onChange={() => toggleToDo(toDo.id)}
              />
              <span
                style={{
                  textDecorationLine: toDo.completed ? "line-through" : "none",
                }}
              >
                {toDo.name}
              </span>
              <span
                style={{
                  color: "red",
                  fontSize: "10px",
                  cursor: "pointer",
                }}
                onClick={() => removeToDo(toDo.id)}
              >
                Удалить
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
