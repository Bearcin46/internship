import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import './Home.css'

interface FormProps {
   onNext: () => void;
}

const Home: React.FC<FormProps> = ({onNext}) => {
  const [name, setName] = useState('');
  const [phone,setPhone]= useState('')
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if name,phone  or email is empty
    if (!name || !phone || !email) {
      setError('Please fill out all fields');
      return;
    }

    // Clear any previous errors
    setError('');
    
    // Store the data in local storage
    localStorage.setItem('formData', JSON.stringify({ name, email, phone}));

    // Mark the submission as successful
    setSubmitted(true);
    onNext();
  };

  return (
    <div>
      {!submitted ? (
    <div className='formcontainer'>
        <h1>Assignment</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <br />
          <TextField
            label="Phone-Number"
            variant="outlined"
            value={phone}
            onChange={handlePhoneChange}
          />
        <br />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
         <br />
          {error && <Typography color="error">{error}</Typography>}

          <br />
          <Button variant="contained" color="success" type="submit" >
            Submit
          </Button>
        </form>
        </div>
      ) : (
        <Typography variant="h6">Form submitted successfully!</Typography>
      )}
    </div>
  );
};

export default Home;

