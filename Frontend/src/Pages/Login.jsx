import React from 'react'
import { Link } from 'react-router-dom'
const [formData, setFormData] = useState({
    name : "",
    password : ""
});
const Login = () => {
    function submitForm (){
        console.log("Form submitted Successfully")
    }
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...FormData,
            [name] : value
        });
        console.log(formData);
    }
  return (
    <div>
        <form >
            <div>
            <label name = 'name' >Username</label> <br />
            <input type="text" placeholder='enter username' name='name' value={formData.name} onChange={handleChange}/>
            </div>
            <div>
            <label name = 'password' >Password</label> <br />
            <input type="text" placeholder='enter password' name='password' value={formData.password} onChange={handleChange} />
            </div>
            <div>
                <button onSubmit={submitForm}  type='submit'>Submit</button>
            </div>
            <div>
                <p>Don't have account? <Link to= "signin">SignIn</Link> </p>
            </div>


        </form>
    </div>
  )
}

export default Login