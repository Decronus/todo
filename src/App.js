import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const toDoList = useSelector((state) => state.toDo.toDoList);
  const activeFilter = useSelector((state) => state.toDo.activeFilter);

  const toDoListFiltration = (toDo) => {
    switch (activeFilter) {
      case "ALL": {
        return toDo;
      }
      case "COMPLETED": {
        if (toDo.completed) return toDo;
        break;
      }
      case "ACTIVE": {
        if (!toDo.completed) return toDo;
        break;
      }
      default:
        return toDo;
    }
  };

  const [toDoName, setToDoName] = useState("");
  const inputChange = (event) => {
    setToDoName(event.target.value);
  };

  const addToDo = (name) => {
    if (!toDoName) return;
    const toDo = {
      name: toDoName,
      id: Math.floor(Math.random() * 10 ** 10),
      completed: false,
    };
    dispatch({ type: "ADD_TODO", payload: toDo });
    setToDoName("");
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
        <input
          type="text"
          placeholder="Введите название дела"
          onChange={inputChange}
          value={toDoName}
        />
        <button onClick={addToDo}>Добавить дело</button>
        {/* <button onClick={() => addToDo(prompt("Введите название дела"))}>
          Добавить дело
        </button> */}
        <select
          onChange={(event) => filterToDo(event.target.value)}
          style={{
            display: toDoList.length > 0 ? "block" : "none",
            marginTop: "20px",
          }}
          value={activeFilter}
        >
          <option value="ALL">Все дела</option>
          <option value="COMPLETED">Только завершенные</option>
          <option value="ACTIVE">Только неоконченные</option>
        </select>
        <div>
          {toDoList
            .filter((toDo) => toDoListFiltration(toDo))
            .map((toDo) => (
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
                  checked={toDo.completed}
                />
                <span
                  style={{
                    textDecorationLine: toDo.completed
                      ? "line-through"
                      : "none",
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
