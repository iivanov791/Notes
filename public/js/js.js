function onLiClick (event) {

    event.target.toggleAttribute('checked');
    event.target.nextSibling.classList.toggle('deleted');
    let li = event.target.parentNode;
    let ul = li.parentNode;

    event.target.hasAttribute('checked') ? ul.append(li) : ul.insertBefore(li, ul.firstChild);
}