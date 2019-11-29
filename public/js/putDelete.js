function onSubmitRewriteListForm (event) {
    // const form = event.target;
    // console.log('clicked');
    event.preventDefault();
    const data = {
        content: []
    };
    // console.log(form);
    const listTitle = document.getElementById('listTitle');
    const inputs = document.getElementsByName('Task');
    const listId = document.getElementById('id');
    // console.log(noteId.value);

    // console.log(element);
    data._id = listId.value;
    data.title = listTitle.value;
    for (let input of inputs) {
        data.content.push (input.value)
    }
    // data[element.created_at] = date;
    console.log(data);


    fetch('/api/lists', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .finally(() => {
            window.location.href='/';
            console.log('We are good');
        });
}

function onDeleteListClick(event) {
    event.preventDefault();

    const thisId = document.getElementById('id');
    const id = thisId.value;

    if (confirm('Are you sure?')) {
        fetch('/api/lists', {
            method: 'DELETE',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                window.location.reload();
                document.getElementById('id').remove();
            });
    }
}


function onAddTaskBtnClick(event) {
    event.preventDefault();
    let div = document.createElement('div');
    let input = document.createElement('input');
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML='X';
    deleteBtn.setAttribute('onclick', 'onDeleteTaskClick(event)');
    input.type = 'text';
    input.name = 'Task';
    input.placeholder = 'Task...';
    div.append(input);
    div.append(deleteBtn);
    let divTask = document.getElementById('divTask');
    divTask.insertBefore(div, event.target);
}


function onDeleteTaskClick(event) {
    event.preventDefault();
    const form = event.target.parentNode;
    form.parentNode.removeChild(form);
    return false;
}