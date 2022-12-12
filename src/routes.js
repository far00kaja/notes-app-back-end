const { addNoteHandler, getAllNotesHandler, get, getNoteByIdHandler, editNoteByIdHandler, deleteByIdHandler } = require("./handlers");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
        // cors origin bisa ditambahkan per api
        // options: {
        //     cors: {
        //         origin: ['*']
        //     }
        // }
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteByIdHandler
    }
]

module.exports = routes;