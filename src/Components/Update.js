import React,{useState, useEffect} from 'react'
import {Form, Button, Checkbox} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../Constants/URL'



function Update() {
    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[checked,setChecked] = useState(false);
    const navigate=useNavigate();
    
    
    const updateUser = async () =>{
      await axios.put(`${API_URL}/${id}`, {
        firstName,
        lastName,
        checked
      });
      navigate('/read');

    }
    const[id,setId] = useState('');
  useEffect(()=>{
    setId(localStorage.getItem('id'));
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
    setChecked(localStorage.getItem('checked'));
  },[])
  return (
    <div>
        <h1>Update</h1>
        <Form class="form"> 
      <Form.Field>
        <label>First Name: </label>
        <input 
        value={firstName} 
        placeholder="Enter your first name"
        onChange={
          event => setFirstName (event.target.value)
        }
        />
      </Form.Field><br/>
      <Form.Field>
        <label>Last Name: </label>
        <input 
        value={lastName} 
        placeholder="Enter your Last name"
          onChange={
          event => setLastName (event.target.value)
        }
        />
      </Form.Field><br />
      <Form.Field>
        <Checkbox checked={checked} label="Agree with terms&conditions" 
          onChange={
          event =>setChecked  (!checked)
        }
        />
      </Form.Field><br/>
      <Button onClick={updateUser}>update</Button>
    </Form>
    </div>
  )
}

export default Update
