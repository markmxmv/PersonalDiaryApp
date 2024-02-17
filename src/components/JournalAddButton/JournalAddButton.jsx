import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';


function JournalAddButton() {

	return (
		<CardButton className='journal-add'>
			<img src="/add.svg" alt="" />
            New Memory
		</CardButton>
	);
}

export default JournalAddButton;