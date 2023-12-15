import { ButtonOrder } from '../ButtonOrder/ButtonOrder'
import styles from './InputsArea.module.scss'
import stylesBtnOrder from '../ButtonOrder/ButtonOrder.module.scss'
import { useState } from 'react'

export const InputsArea = ({ stylesCreateBtn, onFormSubmit, allPriorities }) => {
	const [inputLength, setInputLenght] = useState('')
	const [inputValue, setInputValue] = useState('')

	const [inputError, setInputError] = useState(false)
	const [priorityError, setPriorityError] = useState('')

	const [activeBtnLow, setActiveBtnLow] = useState(false)
	const [priorityValueLow, setPriorityValueLow] = useState('')

	const [activeBtnMedium, setActiveBtnMedium] = useState(false)
	const [priorityValueMedium, setPriorityValueMedium] = useState('')

	const [activeBtnHigh, setActiveBtnHigh] = useState(false)
	const [priorityValueHigh, setPriorityValueHigh] = useState('')

	allPriorities = [priorityValueLow, priorityValueMedium, priorityValueHigh]

	const checkInputValue = () => {
		if (inputValue == '' || (priorityValueLow == '' && priorityValueMedium == '' && priorityValueHigh == '')) {
			setInputError(true)
			setPriorityError('You must choose task priority!')
		} else {
			onFormSubmit(
				inputValue,
				allPriorities,
				setActiveBtnLow(false),
				setActiveBtnMedium(false),
				setActiveBtnHigh(false),
				setPriorityValueLow(''),
				setPriorityValueMedium(''),
				setPriorityValueHigh('')
			)
			setInputValue('')
			setInputLenght('')
			setPriorityError('')
			setInputError(false)
		}
	}

	return (
		<form
			className={styles.inputsArea}
			onSubmit={e => {
				e.preventDefault()
			}}>
			<div className={styles.inputArea}>
				<p className={styles.numberOfLetters} onChange={() => {}}>
					{inputLength == '' ? '0/40' : `${inputLength}/40`}
				</p>
				<input
					type='text'
					value={inputValue}
					maxLength={40}
					placeholder={inputError ? 'The field cannot be empty...' : 'Enter your task...'}
					className={inputError ? styles.inputTextError : styles.inputText}
					onChange={e => {
						setInputLenght(e.target.textLength)
						setInputValue(e.target.value)
						setInputError(false)
					}}
					onKeyDown={e => {
						if (e.key == 'Enter') {
							checkInputValue()
						}
					}}
				/>
			</div>
			<h2 className={styles.h2}>Choose Task Priority</h2>
			<div className={styles.orderBtns}>
				<ButtonOrder
					className={activeBtnLow ? `${stylesBtnOrder.btnLowOrderActive}` : `${stylesBtnOrder.btnLowOrder}`}
					value={priorityValueLow}
					onClick={e => {
						if (e.target) {
							setActiveBtnLow(activeBtnLow => !activeBtnLow)
							setActiveBtnMedium(false)
							setActiveBtnHigh(false)
						}

						if (activeBtnLow) {
							setPriorityValueLow('')
						} else {
							setPriorityValueLow('low')
							setPriorityError('')
						}
					}}
					icon={<i className='fa-solid fa-award'></i>}
					text='Low'
				/>
				<ButtonOrder
					className={activeBtnMedium ? `${stylesBtnOrder.btnMediumOrderActive}` : `${stylesBtnOrder.btnMediumOrder}`}
					value={priorityValueMedium}
					onClick={e => {
						if (e.target) {
							setActiveBtnMedium(activeBtnMedium => !activeBtnMedium)
							setActiveBtnLow(false)
							setActiveBtnHigh(false)
						}

						if (activeBtnMedium) {
							setPriorityValueMedium('')
						} else {
							setPriorityValueMedium('medium')
							setPriorityError('')
						}
					}}
					icon={<i className='fa-solid fa-award'></i>}
					text='Medium'
				/>
				<ButtonOrder
					className={activeBtnHigh ? `${stylesBtnOrder.btnHighOrderActive}` : `${stylesBtnOrder.btnHighOrder}`}
					value={priorityValueHigh}
					onClick={e => {
						if (e.target) {
							setActiveBtnHigh(activeBtnHigh => !activeBtnHigh)
							setActiveBtnLow(false)
							setActiveBtnMedium(false)
						}

						if (activeBtnHigh) {
							setPriorityValueHigh('')
						} else {
							setPriorityValueHigh('high')
							setPriorityError('')
						}
					}}
					icon={<i className='fa-solid fa-award'></i>}
					text='High'
				/>
				<p className={styles.priorityTextEror}>{priorityError}</p>
			</div>

			<input
				type='submit'
				className={stylesCreateBtn ? styles.submitBtnLight : styles.submitBtnDark}
				value='Create New Task'
				onClick={checkInputValue}
			/>
		</form>
	)
}
