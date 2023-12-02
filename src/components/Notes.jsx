import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();

  const { notes, getNotes, UpdateNote } = context;
  const [showModal, setShowModal] = useState(false);
  const [Note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "General",
  });
  // const ref = useRef(null);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const editNote = (currentNote) => {
    setShowModal(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    // console.log("Updating value", Note);
    UpdateNote(Note.id, Note.etitle, Note.edescription, Note.etag);
    setShowModal(false);
    props.showAlert("green", "Successfully!! Updated your note");

    // AddNote(Note.title, Note.description, Note.tag)
  };
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showModal ? (
        <>
          <div className=" overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-8 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Notes</h3>
                  <button
                    className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <i className="fa-solid fa-xmark text-red-700"></i>
                  </button>
                </div>
                {/*body*/}
                <form className="w-2/3 mx-auto relative top-3 mb-8">
                  <div className="mb-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="etitle"
                      name="etitle"
                      className="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Title"
                      value={Note.etitle}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="edescription"
                      name="edescription"
                      rows="3"
                      className="block p-2.5 w-full text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Description"
                      value={Note.edescription}
                      onChange={onChange}
                    ></textarea>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="tag"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Tag
                    </label>
                    <input
                      type="text"
                      id="etag"
                      name="etag"
                      className="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Tag"
                      value={Note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className={`${
                      Note.etitle.length < 3 || Note.edescription.length < 5
                        ? "bg-emerald-200 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        : "hover:cursor-pointer bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    } `}
                    type="button"
                    onClick={handleClick}
                    disabled={
                      Note.etitle.length < 3 || Note.edescription.length < 5
                    }
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* This is NoteItem Program */}
      <div className="grid grid-cols-3 gap-8 pb-8">
        <div
          className={`${
            notes.length === 0 ? "font-semibold text-xl mx-1" : "hidden"
          }`}
        >
          {notes.length === 0 && "Notes are Empty ......"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              showAlert={props.showAlert}
              editNote={editNote}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
