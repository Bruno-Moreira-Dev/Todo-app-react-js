import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import TaskDetails from './components/TaskDetails';

import './App.css';

const App = () => {
	const [ tasks, setTasks ] = useState([
		{
			id: '1',
			title: 'Estudar Programação',
			completed: false
		},
		{
			id: '2',
			title: 'Ler Livros',
			completed: true
		},
		{
			id: '3',
			title: 'Aprender Reactjs',
			completed: true
		}
	]);

	useEffect(() => {
		const fetchTasks = async () => {
			const { data } = await axios.get('https://jsonplaceholder.cypress.io/todos?_limit=10');

			setTasks(data);
		};

		fetchTasks();
	}, []);

	const handleTaskClick = (taskId) => {
		const newTasks = tasks.map((task) => {
			if (task.id === taskId) {
				return { ...task, completed: !task.completed };
			}

			return task;
		});

		setTasks(newTasks);
	};

	const handleTaskAddition = (taskTitle) => {
		const newTasks = [
			...tasks,
			{
				id: uuidv4(),
				title: taskTitle,
				completed: false
			}
		];

		setTasks(newTasks);
	};

	const handleTaskDeletion = (taskId) => {
		const newTasks = tasks.filter((task) => task.id !== taskId);

		setTasks(newTasks);
	};

	return (
		<Router>
			<div className="container">
				<Header />
				<Route
					path="/"
					exact
					render={() => (
						<div>
							<AddTask handleTaskAddition={handleTaskAddition} />
							<Tasks
								tasks={tasks}
								handleTaskClick={handleTaskClick}
								handleTaskDeletion={handleTaskDeletion}
							/>
						</div>
					)}
				/>
				<Route path="/:taskTitle" exact component={TaskDetails} />
			</div>
		</Router>
	);
};

export default App;
