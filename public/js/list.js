function onAddInputBtnClick (event) {
    event.preventDefault();
    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.name = 'Task';
    input.placeholder = 'Task...';
    let divInput = document.getElementById('inputDiv');
    divInput.insertBefore(input, event.target);
}

function onSubmitAddNewList(event) {
    event.preventDefault();

    const form = event.target;
    const data = {
        content: []
    };


    const listTitle = document.getElementById('listTitle');
    const inputs = document.getElementsByName('Task');


        data.title = listTitle.value;
        for (let input of inputs) {
            data.content.push (input.value)
        }


    fetch('/api/lists', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .finally(() => {
            form.reset();
        });

}


