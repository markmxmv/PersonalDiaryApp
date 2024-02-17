import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm() {
    
	const [inputData, setInputData] = useState('');

	const inputChange = (event) => {
		setInputData(event.target.value);
		console.log(inputData);
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const forProps = Object.fromEntries(formData);
		console.log(forProps);
	};
    
	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type="text" name="title"/>
			<input type="date" name="date"/>
			<input type="text" name='tag' value={inputData} onChange={inputChange}/>
			<textarea name="post" id="" cols="30" rows="10"></textarea>
			<Button text='Save'></Button>
		</form>
	);
}

export default JournalForm;