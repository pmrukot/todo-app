import tasksJson from "../tasks.json";
import React, {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface Task {
    title: string;
    description: string;
    priority: string;
    due_date: string;
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const response = async () =>
    sleep(50).then(() => tasksJson)
const FetchDataFromJson: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [counter, setCounter] = useState(0);
    const fetchData = async () => {
        try {
            const response = async () =>
                sleep(3000).then(() => tasksJson)
            const data = await response();
            setTasks(data);
            console.log(data)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    // useEffect( () => {
    //      response().then( (data) => {
    //         setTasks([data[counter]])
    //     }).catch( (error) => {
    //         console.log(error)
    //      });
    //  }, [ counter ])
    // console.log(counter)
    return (
        <div>
            <h1>Lista Zadań</h1>
            {/*<button onClick={() => setCounter( (value) => value + 1)} >*/}
            <button onClick={fetchData} >
                Fetch Data
            </button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>Priorytet: {task.priority}</p>
                        <p>Termin: {task.due_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export {FetchDataFromJson}