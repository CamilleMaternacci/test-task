import styles from './App.module.scss'
import stylesColorSwitch from './components/ButtonSwitch/ButtonSwitch.module.scss'
import stylesHeaders from './components/HeaderTasksSides/HeaderTasksSides.module.scss'
import styleLi from './components/LiItem/LiItem.module.scss'
import { HeaderApp } from './components/HeaderApp/HeaderApp'
import { useState } from 'react'
import { HeaderTasksSides } from './components/HeaderTasksSides/HeaderTasksSides'
import { InputsArea } from './components/InputsArea/InputsArea'
import { LiItem } from './components/LiItem/LiItem'
import { ModalEdit } from './components/ModalEdit/ModalEdit'

function App() {
	const [colorSwitch, setColorSwitch] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [editInput, setEditInput] = useState('')
	const [editId, setEditId] = useState('')
	const [filter, setFilter] = useState('all')
	const [todos, setTodos] = useState([
		{
			nameTask: 'Sample task',
			priority: <i className={`fa-solid fa-award ${styleLi.btnPriorityMedium}`}></i>,
			done: false,
			id: 1,
		},
	])

	return (
		<div className={colorSwitch ? styles.appLight : styles.appDark}>
			<div className={colorSwitch ? styles.appAreaLight : styles.appAreaDark}>
				<HeaderApp
					stylesHeader={colorSwitch ? true : false}
					stylesBtnDark={!colorSwitch ? stylesColorSwitch.buttonDarkActive : stylesColorSwitch.buttonSwitchDark}
					onClickLight={() => setColorSwitch(true)}
					onClickDark={() => setColorSwitch(false)}
				/>
				<div className={styles.mainArea}>
					<div className={colorSwitch ? styles.leftSideAreaLight : styles.leftSideAreaDark}>
						<HeaderTasksSides
							styles={stylesHeaders.leftSideHeader}
							icon={<i className='fa-regular fa-pen-to-square'></i>}
							text='Make New Task'
						/>
						<div className={styles.inputsArea}>
							<InputsArea
								stylesCreateBtn={colorSwitch ? true : false}
								onFormSubmit={(newTodoName, selectedPriority) => {
									if (selectedPriority[0] == 'low') {
										selectedPriority = <i className={`fa-solid fa-award ${styleLi.btnPriorityLow}`}></i>
									} else if (selectedPriority[1] == 'medium') {
										selectedPriority = <i className={`fa-solid fa-award ${styleLi.btnPriorityMedium}`}></i>
									} else if (selectedPriority[2] == 'high') {
										selectedPriority = <i className={`fa-solid fa-award ${styleLi.btnPriorityHigh}`}></i>
									}

									setTodos(prevTodos => [
										...prevTodos,
										{ nameTask: newTodoName, done: false, priority: selectedPriority, id: prevTodos.length + 1 },
									])
								}}
							/>
						</div>
					</div>
					<div className={colorSwitch ? styles.rightSideAreaLight : styles.rightSideAreaDark}>
						<HeaderTasksSides
							stylesHeaderTasks={colorSwitch ? true : false}
							icon={<i className='fa-regular fa-note-sticky'></i>}
							text='All Tasks'
						/>
						<div className={styles.taskGroupArea}>
							<select value={filter} className={styles.select} onChange={e => {
								setFilter(e.target.value)
								console.log(e.target.value);
							}}>
								<option value='all'>All Task</option>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
							<button
								className={styles.btnClearAll}
								onClick={() => {
									setTodos([])
								}}>
								Clear All
							</button>
						</div>
						<ul className={styles.ulList}>
							{todos.map(({ id, nameTask, priority, done }) => (
								<LiItem
									key={id}
									stylesLi={colorSwitch ? `${styleLi.liLight}` : `${styleLi.liDark}`}
									stylesDeleteBtn={colorSwitch ? `${styleLi.btnDeleteLight}` : `${styleLi.btnDeleteDark}`}
									taskName={nameTask}
									priorityIcon={priority}
									editIcon={<i className='fa-solid fa-file-pen'></i>}
									taskDoneIcon={<i className='fa-solid fa-check'></i>}
									deleteIcon={<i className='fa-solid fa-trash-can'></i>}
									done={done}
									editTask={() => {
										setShowModal(true)
										setTodos(prevTodos =>
											prevTodos.map(todo => {
												if (todo.id == id) {
													setEditInput(todo.nameTask)
													setEditId(todo.id)
												}
												return todo
											})
										)
									}}
									deleteTask={() => setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))}
									taskDone={() => {
										setTodos(prevTodos =>
											prevTodos.map(todo => {
												if (todo.id !== id) {
													return todo
												}

												return {
													...todo,
													done: true,
												}
											})
										)
									}}
								/>
							))}
						</ul>
						{showModal && (
							<ModalEdit
								stylesModal={colorSwitch ? true : false}
								editInputValue={editInput}
								editIdItem={editId}
								onEditSubmit={(newEditTodo, idTest) =>
									setTodos(
										prevTodos =>
											prevTodos.map(todo => {
												if (todo.id !== idTest) {
													return todo
												}

												return {
													...todo,
													nameTask: newEditTodo,
													id: idTest,
												}
											}),
										setShowModal(false)
									)
								}
								onClickCloseModal={() => setShowModal(false)}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
