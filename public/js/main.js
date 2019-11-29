function onSubmitAddClientForm (event) {
    event.preventDefault();

    const form = event.target;
    const data = {};

    const noteTitle = document.getElementById('noteTitle');
    const expiredDate = document.getElementById('expiredDate');
    const noteBody = document.getElementById('noteBody');
    // const date = new Date();

    for (const element of form) {
        // console.log(element);
        data.title = noteTitle.value;
        data.content = noteBody.value;
        data.expired_at = expiredDate.value;
        // data[element.created_at] = date;
    }

    // console.log(data);

    fetch('/api/notes', {
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

