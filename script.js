const addInput = document.querySelector('#addInput');
const textInput = document.querySelector('#text-input');
const taskContainer = document.querySelector('#taskContainer');



addInput.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskInput = textInput.value;
    const taskAtWork = `
                    <div class="todo-worked__task">
                        <h2 class="task-name">${taskInput}</h2>
                        <div class="buttons">
                            <button class="input-button" id="buttonDone"><img src="icons/Check-green.svg" alt="" srcset=""></button>
                            <button class="input-button delete" data-action="delete" id="buttonDelete"><img class="check" src="icons/delete.svg" alt="" srcset=""></button>
                        </div>
                    </div>`;
    
    taskContainer.insertAdjacentHTML('beforeend', taskAtWork)

    textInput.value = '';
    textInput.focus();
})

taskContainer.addEventListener('click', function (event) {
    if (event.target.dataset.action == 'delete') {
        const parentElement = event.target.closest('.todo-worked__task');
        parentElement.remove();
        
    }
});