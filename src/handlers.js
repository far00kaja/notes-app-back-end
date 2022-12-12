const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);
    // const isSuccess = notes.filter((note) => note.id === id).length > 0;
    const isSuccess = notes.filter((note) => note.id === id).length > 0;


    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil Ditambahkan.',
            data: {
                noteId: id
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;

};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes
    }
});

const getNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const note = notes.filter((n) => n.id === id)[0];
    console.log('note : ', note);
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note
            }
        }
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    });
    response.code(404);
    return response;

}

const editNoteByIdHandler = (req, h) => {
    const { id } = req.params;
    const { title, body, tags } = req.payload;
    const updatedAt = new Date().toISOString();


    const indeks = notes.findIndex((n) => n.id === id);
    // const index = notes.findIndex((note) => note.id === id);
    console.log(id)
    console.log(indeks)
    if (indeks !== -1) {
        notes[indeks] = {
            ...notes[indeks],
            title,
            tags,
            body,
            updatedAt
        }
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil diupdate',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbaharui catatan. id tidak ditemukan.'
    });
    response.code(404);
    return response;
};

const deleteByIdHandler = (req, h) => {
    const { id } = req.params;

    const indeks = notes.findIndex((n) => n.id === id);

    if (indeks !== -1) {
        notes.splice(indeks, 1);
        const response = h.response({
            status: 'success',
            message: 'berhasil menghapus catatan'
        })
        response.code(200);
        return response;

    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbaharui catatan. id tidak ditemukan.'
    });
    response.code(404);
    return response;
}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler,deleteByIdHandler };