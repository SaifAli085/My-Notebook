import Notes from "./Notes";


const MyNotes = (props) => {
  const {showAlert} = props;
  return (
    <div className=" mx-20 ">
      <h1 className="text-3xl font-bold mt-8 mb-8">My Notes List</h1>
      <Notes showAlert={showAlert}/> 
    </div>
  )
}

export default MyNotes