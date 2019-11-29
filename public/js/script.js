function onSubmitRewriteNoteForm(event) {

    const form = event.target;
    const data = {};
    // console.log(form);
    const noteTitle = document.getElementById('noteTitle');
    const expiredDate = document.getElementById('expiredDate');
    const noteBody = document.getElementById('noteBody');
    const noteId = document.getElementById('id');
    // console.log(noteId.value);

    for (const element of form) {
        // console.log(element);
        data._id = noteId.value;
        data.title = noteTitle.value;
        data.content = noteBody.value;
        data.expired_at = expiredDate.value;
        // data[element.created_at] = date;
    }


        fetch('/api/notes', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .finally(() => {
                window.location.href='/';
            });
}


function onDeleteBtnClick (event) {
    // console.log('click');
    event.preventDefault();

    const thisId = document.getElementById('id');
    const id = thisId.value;


    if (confirm('Are you sure?')) {
        fetch('/api/notes', {
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
                thisId.remove();
            });
    }
}