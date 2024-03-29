import { useContext } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';


function JournalList({items, setItem}) {
	const { userId } = useContext(UserContext);

	if (items.filter(i => i.userId === userId).length === 0) {
		return <p>Add your first memory</p>;
	}
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<>
			{items
				.filter(el => el.userId === userId)
				.sort(sortItems)
				.map(el => (
					<CardButton key={el.id} onClick={() => setItem(el)}>
						<JournalItem 
							title={el.title}
							text={el.text}
							date={el.date}
						/>
					</CardButton>
				))}
		</>
	);
}

export default JournalList;