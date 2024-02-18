import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import cn from 'classnames';

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true
	});
	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({...state, title: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
		}
		if (!formProps.text?.trim().length) {
			setFormValidState(state => ({...state, text: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, text: true}));
		}
		if (!formProps.date) {
			setFormValidState(state => ({...state, date: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, date: true}));
		}

		if (!isFormValid) {
			return;
		}
		onSubmit(formProps);
		
	};
    
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input type="text" name="title" className={cn(styles['input-title'], {
					[styles['invalid']]: !formValidState.title
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="calendar icon" />
					<span>Date</span>
				</label>
				<input type="date" name="date" id='date' className={cn(styles['input'], {
					[styles['invalid']]: !formValidState.date
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="folder icon" />
					<span>Tags</span>
				</label>
				<input type="text" name='tag' id='tag' className={cn(styles['input'], {
					[styles['invalid']]: !formValidState.text
				})}/>
			</div>
			
			<textarea name="text" id="" cols="30" rows="10" className={`${styles['input']} ${formValidState.text ? '' : styles['invalid']}`}></textarea>
			<Button text='Save'></Button>
		</form>
	);
}

export default JournalForm;