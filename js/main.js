const tasksList = document.querySelector('#tasksList')
const form =  document.querySelector('#form')
const inputElement = document.querySelector('#taskInput')
const submitBtn = document.querySelector('#submit')
const emptyList = document.querySelector('#emptyList')

let tasks = []

if(localStorage.getItem('tasks')){
	tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(element => {
	renderTask(element)
});
checkEmptyList()

function taskAction(event){
	if(event.target.dataset.action === 'delete'){
		const parentNote = event.target.closest('.list-group-item')

		const id = Number(parentNote.id)
		
		const index = tasks.findIndex(task => task.id === id)
		parentNote.remove()
		tasks.splice(index,1)
		saveToLocalStorage()
		checkEmptyList()
	}
	else{
		const parentNote = event.target.closest('.list-group-item')
		const id = Number(parentNote.id)
		const task = tasks.find( task => task.id === id)
		task.done = !task.done
		saveToLocalStorage()
		const taskTitle = parentNote.querySelector('.task-title')
		taskTitle.classList.toggle(`task-title--done`)
	}

	// if(tasksList.children.length === 1){
	// 	emptyList.classList.remove('none')
	// }
	
}

tasksList.addEventListener('click', taskAction)

function templateTask (text, id, done) {
	if(done === false){
		return `
            <li id="${id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`
	}
	else{
		return `
            <li id="${id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title task-title--done">${text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`
	}
	
	
}
function templateEmpty () {
 return `
            <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`
}
function taskAdd(event) {
	event.preventDefault()

	const text = inputElement.value

	const newTask = {
		id: Date.now(),
		text: text,
		done: false
	}

	tasks.push(newTask)
	saveToLocalStorage()


	renderTask(newTask)
	inputElement.value = ''
	inputElement.focus()
	checkEmptyList()
	// if(tasksList.children.length > 1){
	// 	emptyList.classList.add('none')
	// }
	
}
form.addEventListener('submit', taskAdd)

function checkEmptyList(){
	if(tasks.length === 0){
		tasksList.insertAdjacentHTML('afterbegin', templateEmpty())
	}
	else{
		const emptyList = document.querySelector('#emptyList')
		emptyList ? emptyList.remove() : null
	}
}
function saveToLocalStorage(){
	localStorage.setItem('tasks',JSON.stringify(tasks))
}
function renderTask(task){
	tasksList.insertAdjacentHTML("beforeend", templateTask(task.text, task.id, task.done))
}