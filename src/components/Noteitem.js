import React, { useContext } from 'react'
import notescontext from '../context/notes/notescontext';
import Card from 'react-bootstrap/Card';

const Noteitem = (props) => {
    const context = useContext(notescontext)
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <Card className='my-3'>

                <Card.Body >
                    <Card.Title>{note.title}

                        <i className="fa-solid fa-trash mx-3" onClick={() => {
                            deleteNote(note._id); props.showAlert("Deleted Note Successfully ", "success");
                        }}> </i>
                        <i className="fa-solid fa-file-pen mx-3" onClick={() => { updateNote(note) }}></i>

                    </Card.Title>
                    <Card.Text>{note.description} </Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}

export default Noteitem