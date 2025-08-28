import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button, Checkbox} from 'semantic-ui-react'
import {API_URL} from '../Constants/URL'

function Create() {
  const[firstName,setFirstName] = useState('');
  const[lastName,setLastName] = useState('');
  const[checked,setChecked] = useState(false);
  const navigate=useNavigate();

  const postData = async()=>{
      await axios.post(API_URL,{
        firstName,
        lastName,
        checked
      })
      navigate('/read');
  }


  return (
    <>
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
      <Button onClick={postData}>Submit</Button>
    </Form>
    </>
  )
}

export default Create
