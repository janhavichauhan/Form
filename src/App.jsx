import React, { useState, useEffect } from 'react';
import './App.css';

function Registration() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleEvent = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (!values.name) {
      errors.name = 'Username is required!';
    } else if (values.name.length < 3) {
      errors.name = 'Username must be more than 3 characters!';
    } else if (values.name.length > 30) {
      errors.name = 'Username must be less than 30 characters!';
    }

    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }

    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 10) {
      errors.password = 'Password must be more than 10 characters!';
    } else if (!regexSpecial.test(values.password)) {
      errors.password = 'Password must contain at least 1 special character!';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required!';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Confirm Password does not match!';
    }

    return errors;
  };

  return (
    <>
      <div className='form'>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className='success-message'>Registration successful!</div>
        ) : (
          <div></div>
        )}

        <form onSubmit={handleSubmit}>
          <h1>Registration Form</h1>
          <div className='name'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter your name...'
              value={formValues.name}
              onChange={handleEvent}
            />
          </div>
          <p>{formErrors.name}</p>

          <div className='email'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Enter your email...'
              value={formValues.email}
              onChange={handleEvent}
            />
          </div>
          <p>{formErrors.email}</p>

          <div className='password'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={formValues.password}
              onChange={handleEvent}
            />
          </div>
          <p>{formErrors.password}</p>

          <div className='confirmPassword'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm your password...'
              value={formValues.confirmPassword}
              onChange={handleEvent}
            />
          </div>
          <p>{formErrors.confirmPassword}</p>

          <button className='btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Registration;
