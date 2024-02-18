import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useState } from 'react';

function App() {

	const INITIAL_DATA = [
		{
			id: 1,
			title: 'Preparing for renewing courses',
			text: 'Горные походы открывают удивительные природные ландшафты',
			date: new Date()
		},
		{
			id: 2,
			title: 'Mountains tour',
			text: 'Think that it will take a lot of time',
			date: new Date()
		}
	];
	const [items, setItems] = useState(INITIAL_DATA);

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
