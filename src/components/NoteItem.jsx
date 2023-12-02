import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {DeleteNote} = context
    const { note, editNote } = props;
    
  return (
    <div>
      <div className="block max-w-xs p-4 bg-white border border-gray-400 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between">
          <h5 className="mb-2 text-sm font-bold tracking-tight text-blue-700 dark:text-white">
            Tag: {note.tag}
          </h5>
          <section className="space-x-4">
          <i className="fa-solid fa-trash fa-shake cursor-pointer hover:text-red-700 text-lg hover:scale-105" onClick={()=> {DeleteNote(note._id); props.showAlert("green", "Successfully!! Deleted your note")}}></i>
          <i className="fa-solid fa-pen-to-square cursor-pointer hover:text-green-700 text-lg hover:scale-110" onClick={()=>{editNote(note)}}></i>
          </section>
          
        </div>

        <h5 className="mb-2 text-xl font-bold tracking-tight text-red-700 dark:text-white">
          {note.title}
        </h5>
        <p className="font-semibold text-gray-700 dark:text-gray-400 whitespace-pre-line">
          {note.description} 
        </p>
      </div>
    </div>
  );
};
 
export default NoteItem;
