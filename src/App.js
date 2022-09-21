import { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const editTodo = todoList.find((i) => i.id === editId);
      const updateTodoList = todoList.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo }) :
          { id: t.id, todo: t.todo }
      );
      setTodoList(updateTodoList);
      setTodo("");
      setEditId(0);
      return;
    }
    if (todo !== " ") {
      setTodoList([{ id: `${todo}-${Date.now()}`, todo }, ...todoList]);
      console.log("setTodo", setTodoList);
      setTodo("");
    }
  };
  const handleDelete = (id) => {
    const delTodo = todoList.filter((to) => to.id !== id);
    console.log("deleted todo", delTodo)
    setTodoList([...delTodo]);

  };
  const handleEdit = (id) => {
    const editTodo = todoList.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className='app__container'>
        <div className='todo__container'>
          <h1>To Do List</h1>
          <form onSubmit={handleSubmit}>
            <input className='todo__input' placeholder='write here....' type="text" value={todo} onChange={(e) => setTodo(e.target.value)} ></input>
            <button type="submit" className='todo__addbutton'>{editId ? "Ëdit" : "Add"}</button>
          </form>
          <ul>
            {
              todoList.map((t) => (
                <li>
                  <span key={t.id}>{t.todo}</span>
                  <div className='btn__container'>
                    <button className='todo__editbutton' onClick={() => handleEdit(t.id)}>edit</button>
                    <button className='todo__deletebutton' onClick={() => handleDelete(t.id)}>delete</button>
                  </div>
                </li>
              ))
            }

          </ul>


        </div>
      </div>
    </div>
  );
}

export default App;
