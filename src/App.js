import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [lists, setlists] = useState([])

  const [loading, setloading] = useState(false);

  async function getlist() {
    setloading(true);
    try {
      const respons = await fetch('https://dummy-json.mock.beeceptor.com/todos');
      const result = await respons.json();
      //if (result && result.list && result.list.length) {
      if (result && result.length > 0) {
        setlists(result)
        setloading(false);
      }
      console.log(result.length);
      console.log(result);
    } catch (e) {
      console.log(e)
      setloading(false);
    }

  }

  useEffect(() => {
    getlist();
  }, [])

  if (loading) {
    return <div>Loading data please wait !</div>
  }
  return (
    <div>
      <div className='tit'>User To Do List and Statuses</div>
      <div className='lists'>
        <span>ID</span>
        <span>USER ID</span>
        <span>TITLE</span>
        <span>COMPLETED</span>
      </div>
      <div>
        {
          lists && lists.length ?
            lists.map((list) => (<li className='list' key={list.id}>

              <span>{list.id}</span>
              <span>{list.userId}</span>
              <span>{list.title}</span>
              <span className={list.completed ? "completed" : "notcompleted" }>{list.completed.toString()}</span>
            </li>))
            : null}
      </div>
    </div>
  );
}

export default App;
