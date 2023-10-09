import React, { useContext, useEffect, useRef, useState } from 'react'
import notescontext from '../context/notes/notescontext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import Form from 'react-bootstrap/Form';
import { useNavigate} from "react-router-dom";

function Notes(props) {
  const navigate=useNavigate();
  const {showAlert}=props;
  const context = useContext(notescontext)
  const { notes, getNotes, editNote } = context;

  useEffect(() => {

     if(localStorage.getItem('token'))
     {
      getNotes()
     }
     else{
        navigate("/login")
     }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click()
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const updatetheNote = (e) => {
    console.log("updating the note...", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    props.showAlert("Updated Note Successfully ","success");
    refClose.current.click()
  }

  const onChange = (e) => {

    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>

      {/* modal */}

      <button ref={ref} type="" className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter Title" name='etitle' id='etitle' value={note.etitle} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Enter Description" name='edescription' id='edescription' value={note.edescription} onChange={onChange} />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Tag</Form.Label>
                  <Form.Control type="text" placeholder="Enter Description" name='etag' id='etag' value={note.etag} onChange={onChange} />
                </Form.Group>


              </Form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={updatetheNote} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}


      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length===0?"No Notes":notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert}/>

        })}
      </div>
    </>
  )
}

export default Notes