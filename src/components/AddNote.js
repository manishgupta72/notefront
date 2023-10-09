import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import notescontext from '../context/notes/notescontext';

function AddNote(props) {

    const context = useContext(notescontext)
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "default" })
    const [errors,setErrors]=useState({})
   
    const AddNote = () => {
       
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added Note Successfully ", "success")
    }
    const onChange = (event) => {

        setnote({ ...note, [event.target.name]: event.target.value })
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const validationErrors = {}
        if (!note.title.trim()) {
            validationErrors.title = "title required"
        } else if (note.title.length < 3) {
            validationErrors.title = "min length is 3"
        } if (!note.description.trim()) {
            validationErrors.title = "title required"
        } else if (note.description.length < 5) {
            validationErrors.title = "min length is 3"
        } if (!note.tag.trim()) {
            validationErrors.title = "title required"
        } else if (note.tag.length < 3) {
            validationErrors.title = "min length is 3"
        }
        setErrors(validationErrors);
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" name='title' id='title' minlength="8" onChange={onChange} />
                    {errors.title && <p className="text-danger error-text">{errors.title}</p>}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" name='description' minLength={5} id='description' onChange={onChange} />
                    {errors.description && <p className="text-danger error-text">{errors.description}</p>}
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Tag</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" name='tag' id='tag' onChange={onChange} />
                    {errors.tag && <p className="text-danger error-text">{errors.tag}</p>}
                </Form.Group>

                <Button variant="primary" type="submit" onClick={AddNote}>
                    Add Note
                </Button>
            </Form>
        </div>

    )
}

export default AddNote