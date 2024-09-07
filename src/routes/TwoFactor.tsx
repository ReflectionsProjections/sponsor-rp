import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';

const TwoFactor = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e:any) => {
    // Ensure that the code is always uppercase and only 6 characters
    const value = e.target.value.toUpperCase().slice(0, 6);
    setCode(value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Please enter a 6-digit code.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://api.reflectionsprojections.org/auth/sponsor/verify', {
        sixDigitCode: code,
        email: 'devrp3@illinois.edu',
      });
      setSuccess('Two-factor authentication successful!');
      console.log(response.data)
      navigate('/resume-book');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text color="white">Enter 6-Digit Code:</Text>
      <input
        type="text"
        id="twoFactorCode"
        value={code}
        onChange={handleChange}
        // maxLength="6"
        pattern="[A-Z0-9]{6}"
        required
        disabled={loading}
      />
      {/* <button type="submit" disabled={loading} color="white">
        {loading ? 'Submitting...' : 'Submit'}
      </button> */}
      <Button type="submit" disabled={loading} >
      {loading ? 'Submitting...' : 'Submit'}
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default TwoFactor;
