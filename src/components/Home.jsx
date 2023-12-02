import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { AddNote } = context;
  const [Note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  const noteSubmit = (e) => {
    e.preventDefault();
    AddNote(Note.title, Note.description, Note.tag);
    setNote({ title: "", description: "", tag: "" });
    if (!localStorage.getItem("token")) {
      props.showAlert("red", "Login your Account");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      props.showAlert("green", "Successfully!! Note Added ......");
    }
  };
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form className="max-w-4xl mx-auto relative top-2 ">
        <h1 className="text-3xl font-semibold mb-4">Add a Note</h1>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block mb-1 text-lg font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            onChange={onChange}
            required
            value={Note.title}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="description"
            className="block mb-1 text-lg font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="block p-2.5 w-full text-base text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            onChange={onChange}
            value={Note.description}
          ></textarea>
        </div>
        <div className="mb-5">
          <label
            htmlFor="tag"
            className="block mb-1 text-lg font-medium text-gray-900 dark:text-white"
          >
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tag"
            onChange={onChange}
            value={Note.tag}
          />
        </div>

        <button
          type="submit"
          disabled={Note.title.length < 3 || Note.description.length < 5}
          className={`${
            Note.title.length < 3 || Note.description.length < 5
              ? "bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white"
              : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          } `}
          onClick={noteSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
