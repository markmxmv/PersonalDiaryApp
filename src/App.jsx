import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useEffect, useState } from 'react';

function App() {

	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
	
		if (data) {
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);

	useEffect(() => {
		if (items.length) {
			localStorage.setItem('data', JSON.stringify(items));
		}
		console.log(items);
	}, [items]);

	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			id: oldItems.length?Math.max(...oldItems.map(i => i.id)) + 1:1,
			title: item.title,
			text: item.text,
			date: new Date(item.date)
		}]);
	};




	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton />
				<JournalList items={items}/>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem}></JournalForm>
			</Body>
		</div>
	);
}

export default App;
