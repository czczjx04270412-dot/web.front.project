const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const list = document .getElementById('list');



let todos = [];
function render(){

    let html = '';

    todos.forEach((todo,index) =>{
        html +=`
        <div class='task'>
        <span>${todo}</span>
        <button class="delete" data-index="${index}">X</button>
        </div>
        `;
    });
    list.innerHTML = html;    

};

function addTodo(){

    const value = input.value.trim();
    if( value ===''){
        alert('不能輸入空内容');
        return;
    }

    todos.push(value);
    input.value='';
    render();
};
list.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const index = event.target.dataset.index;
        todos.splice(index, 1);
        render();
    }
});




 addBtn.addEventListener('click',() =>{
    addTodo();
 }); 
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});




