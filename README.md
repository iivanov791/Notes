# Notes

This app created by Igor Ivanov himself. Alone

The structure of the app:
/ - default route returns the main page of the app
/notes - route returns page, where note creation is available
/lists - route returns page, where list creation is available
/notes/:noteId - returns note page, where editing and deleting is available
/lists/:listId - returns list page, Where editing and deleting is available

The structure of the DB: 
notes
note {
title
content
created_at
expired_at
}
lists 
list {
title: String,
content: Array,
checked: Array, (for future deploys)
created_at: Date
}
