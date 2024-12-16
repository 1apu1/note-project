import { useNavigate } from 'react-router-dom'
import { deletedNotes, permanentlyDelete, restoreNote } from '../assets/StorageData'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineRestore } from 'react-icons/md'
import { useEffect, useState } from 'react'

function ReCycleBin() {
    const [dlNote, setdlNote] = useState([])
    let navigator = useNavigate()
    const handeleNavigate = () => {
        navigator('/addnotes')
    }

    const handleRestore = (index) => {
        let arr = deletedNotes()
        let obj = arr[index]
        restoreNote(obj.Id)
        const updatedNotes = arr.filter((_, i) => i !== index)
        setdlNote([...updatedNotes])
    }

    const handleDelete = (index) => {
        let arr = deletedNotes()
        let obj = arr[index]
        permanentlyDelete(obj.Id)
        const updatedNotes = arr.filter((_, i) => i !== index)
        setdlNote([...updatedNotes])
    }
    useEffect(() => {
        let arr = deletedNotes()
        setdlNote([...arr])
    }, [])

    return (
        <div className="container">
            <div className="btn w-100 btn-sm btn-outline-success" onClick={handeleNavigate}>New Note Bnavo</div>
            <div className="row">
                {dlNote.map((note, index) => {
                    return <div className="col-md-3 shadow p-3" key={note}>
                        <h3>{note.task}</h3>
                        <p>{note.discription}</p>
                        <div className="d-flex justify-content-between flex-wrap">
                            <button className='btn btn-outline-danger'>{note.priority}</button>
                            <span>{note.day}</span>
                        </div>
                        <div className="d-flex justify-content-end flex-wrap gap-3">
                            <MdOutlineRestore cursor={'pointer'} onClick={() => { handleRestore(index) }} />
                            <AiOutlineDelete cursor={'pointer'} onClick={() => { handleDelete(index) }} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ReCycleBin