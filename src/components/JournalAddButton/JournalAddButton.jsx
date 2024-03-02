import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';


function JournalAddButton({clearForm}) {

	return (
		<CardButton className='journal-add' onClick={clearForm}>
			<img src="/add.svg" alt="" />
            New Memory
		</CardButton>
	);
}

export default JournalAddButton;