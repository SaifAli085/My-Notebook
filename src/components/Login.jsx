import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate()
  const host = "http://localhost:3001"
  const  [credencial, setCredencial] = useState({email: "", password: ""})

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: credencial.email, password: credencial.password})
    });
    const json = await response.json(); 
    console.log(json);
    if(json.success){
      // redirect
      localStorage.setItem('token', json.authtoken)
      props.showAlert("green", "Successfully!! You Logged in")
      navigate("/")
    }
    else{
      props.showAlert("red", "Error! Incorrect details")

    }
  }

  const onChange = (e) =>{
    setCredencial({...credencial, [e.target.name]: e.target.value})
  }

  return (
    <div> 
     
      <form  onSubmit={handleSubmit} className="w-2/3 mx-auto relative top-6">
      <h1 className="text-3xl font-semibold mb-8">Login to continue to My Notebook</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={credencial.email}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credencial.password}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
