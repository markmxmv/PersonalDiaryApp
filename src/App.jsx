import './App.css';
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem.jsx';
import CardButton from './components/CardButton/CardButton.jsx';

function App() {
	const data = [
		{
			title: 'Preparing for renewing courses',
			text: 'Горные походы открывают удивительные природные ландшафты',
			date: new Date()
		},
		{
			title: 'Mountains tour',
			text: 'Think that it will take a lot of time',
			date: new Date()
		}
	];

	return (
		<>
			<h1>Heading</h1>
			<p>Some text</p>
			<Button/>
			<CardButton>
				<JournalItem
					title={data[0].title}
					text={data[0].text}
					date={data[0].date}
				/>
			</CardButton>
			<JournalItem
				title={data[1].title}
				text={data[1].text}
				date={data[1].date}
			/>
		</>
	);
}

export default App;
