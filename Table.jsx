import { useEffect, useState } from 'react';
import './Table.css';


function Table() {
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
        <table className='content'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER ID</th>
                    <th>TITLE</th>
                    <th>COMPLETED</th>
                </tr>
            </thead>

            <tbody>
                {
                    lists && lists.length ?
                        lists.map((list) => (<tr key={list.id}>

                            <td>{list.id}</td>
                            <td>{list.userId}</td>
                            <td>{list.title}</td>
                            <td className={list.completed ? "completed" : "notcompleted"}>{list.completed.toString()}</td>
                        </tr>))
                        : null}
            </tbody>
        </table>
    );
}

export default Table;
