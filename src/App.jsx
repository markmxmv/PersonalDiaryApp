import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useLocaStorage } from './hooks/use-localstorage.hook.js';

function mapItems(items) {
	if(!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {

	const [items, setItems] = useLocaStorage('data');

	const addItem = item => {
		setItems([...mapItems(items), {
			id: items.length?Math.max(...items.map(i => i.id)) + 1:1,
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
				<JournalList items={mapItems(items)}/>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem}></JournalForm>
			</Body>
		</div>
	);
}

export default App;
