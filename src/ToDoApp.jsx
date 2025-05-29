import { useState } from "react";

function ToDoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  const handleAdd = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const handleDelete = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const toggleComplete = (indexToToggle) => {
    setTasks(
      tasks.map((task, index) =>
        index === indexToToggle ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  const saveEdit = (index) => {
    if (editText.trim() === "") return;
    setTasks(
      tasks.map((task, i) => (i === index ? { ...task, text: editText } : task))
    );
    setEditIndex(-1);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const tableStyle = {
    width: "90%",
    margin: "20px auto",
    borderCollapse: "collapse",
    backgroundColor: "#343a40",
    color: "white",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
  };

  const thTdStyle = {
    border: "1px solid #dee2e6",
    padding: "12px",
    textAlign: "center",
    fontSize: "16px",
  };

  const headerStyle = {
    backgroundColor: "#007BFF",
    fontSize: "18px",
  };

  const inputStyle = {
    padding: "8px",
    fontSize: "16px",
    width: "250px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const actionButtonStyle = {
    margin: "0 5px",
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#dc3545",
  };

  const cancelButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#6c757d",
  };

  return (
    <div style={{ backgroundColor: "#1c1c1c", paddingTop: "18px", paddingBottom: "18px", border: "1px solid", borderRadius: "25px" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "#ffc107", marginBottom: "20px", fontSize: "32px", fontFamily: "fantasy" }}>
          TO DO LIST APP
        </h2>

        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={inputStyle}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd} style={buttonStyle}>
          Add Task
        </button>

        {tasks.length > 0 ? (
          <>
            <table style={tableStyle}>
              <thead style={headerStyle}>
                <tr>
                  <th style={thTdStyle}>ID</th>
                  <th style={thTdStyle}>Task</th>
                  <th style={thTdStyle}>Status</th>
                  <th style={thTdStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((item, index) => {
                  const actualIndex = indexOfFirstTask + index;
                  return (
                    <tr key={item.id}>
                      <td style={thTdStyle}>{item.id}</td>
                      <td
                        style={{
                          ...thTdStyle,
                          textDecoration: item.completed ? "line-through" : "none",
                          cursor: editIndex === actualIndex ? "not-allowed" : "pointer",
                          userSelect: "none",
                          color: editIndex === actualIndex ? "#999" : "white",
                        }}
                        onClick={() => {
                          if (editIndex !== actualIndex) toggleComplete(actualIndex);
                        }}
                      >
                        {editIndex === actualIndex ? (
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            autoFocus
                            style={{
                              width: "90%",
                              padding: "6px",
                              fontSize: "16px",
                              borderRadius: "4px",
                              border: "1.5px solid #007BFF",
                            }}
                          />
                        ) : (
                          item.text
                        )}
                      </td>
                      <td style={thTdStyle}>
                        {item.completed ? "✔️ Done" : "❌ Pending"}
                      </td>
                      <td style={thTdStyle}>
                        {editIndex === actualIndex ? (
                          <>
                            <button
                              onClick={() => saveEdit(actualIndex)}
                              style={actionButtonStyle}
                            >
                              ✔
                            </button>
                            <button
                              onClick={() => setEditIndex(-1)}
                              style={cancelButtonStyle}
                            >
                              ✗
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(actualIndex, item.text)}
                              style={actionButtonStyle}
                            >
                              ✎
                            </button>
                            <button
                              onClick={() => handleDelete(actualIndex)}
                              style={deleteButtonStyle}
                            >
                              ❌
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={{ marginTop: "15px" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  style={{
                    margin: "0 5px",
                    padding: "5px 10px",
                    backgroundColor: currentPage === number ? "#007BFF" : "#f0f0f0",
                    color: currentPage === number ? "#fff" : "#000",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {number}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p style={{ marginTop: "20px", fontSize: "18px", color: "white" }}>
            No tasks yet. Add some!
          </p>
        )}
      </div>
    </div>
  );
}

export default ToDoApp;