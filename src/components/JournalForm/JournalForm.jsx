import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';


function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title: 
			titleRef.current.focus();
			break;
		case !isValid.date: 
			dateRef.current.focus();
			break;
		case !isValid.text: 
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		let timerId;

		if(!isValid.date || !isValid.text || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(()=> {
				dispatchForm({type: 'RESET_VALIDITY' });
			}, 1000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
		
	};
    
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input ref={titleRef} isValid={isValid.title} placeholder='Title' autoComplete="off" onChange={onChange} type="text" name="title" value={values.title} appearence="title" />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="calendar icon" />
					<span>Date</span>
				</label>
				<Input ref={dateRef} isValid={isValid.date} placeholder='Date' autoComplete="off" onChange={onChange} value={values.date} type="date" name="date" id='date' />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="folder icon" />
					<span>Tags</span>
				</label>
				<Input autoComplete="off" onChange={onChange} value={values.tag} type="text" name='tag' id='tag' />
			</div>
					
			<textarea ref={textRef} placeholder='Your text' autoComplete="off" onChange={onChange} value={values.text} name="text" id="" cols="30" rows="10" className={cn(styles['input'], {
				[styles['invalid']]: !isValid.text
			})}></textarea>
			<Button text='Save'></Button>
		</form>
	);}

export default JournalForm;