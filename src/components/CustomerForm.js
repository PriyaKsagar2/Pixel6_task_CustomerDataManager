import "./CustomerForm.css";
import React, { useState } from 'react';
import axios from 'axios';

function CustomerForm() {
  // State management
  const [pan, setPan] = useState('');
  const [isPanValid, setIsPanValid] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [addresses, setAddresses] = useState([{ line1: '', line2: '', postcode: '', state: '', city: '' }]);
  const [customerList, setCustomerList] = useState([]);

  // Handle PAN input change
  const handlePanChange = (e) => {
    setPan(e.target.value);
  };

  // Handle verifying PAN
  const handleVerifyClick = async () => {
    try {
      const response = await axios.post('https://lab.pixel6.co/api/verify-pan.php', { panNumber: pan });
      if (response.data.isValid) {
        setIsPanValid(true);
        setFullName(response.data.fullName);
        alert('PAN verified');
      } else {
        setIsPanValid(false);
        alert('PAN not verified');
      }
    } catch (error) {
      console.error('Error verifying PAN:', error);
      setIsPanValid(false);
      alert('PAN not verified');
    }
  };

  // Handle adding a new address
  const addAddress = () => {
    if (addresses.length < 10) {
      setAddresses([...addresses, { line1: '', line2: '', postcode: '', state: '', city: '' }]);
    } else {
      alert('You can add a maximum of 10 addresses.');
    }
  };

   // Handle address input change
   const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    setAddresses(newAddresses);
  };

  // Handle postcode change and fetch city/state
  const handlePostcodeChange = async (index, value) => {
    handleAddressChange(index, 'postcode', value);
    try {
      const response = await axios.post('https://lab.pixel6.co/api/get-postcode-details.php', { postcode: value });
      const city = response.data.city[0].name;
      const state = response.data.state[0].name;
      handleAddressChange(index, 'city', city);
      handleAddressChange(index, 'state', state);
    } catch (error) {
      console.error('Error fetching postcode details:', error);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!isPanValid) {
      alert('Please verify the PAN before submitting.');
      return;
    }

    const customer = { pan, fullName, email, mobile, addresses };
    const newCustomerList = [...customerList, customer];
    setCustomerList(newCustomerList);

    // Optionally, save to localStorage or Redux
    localStorage.setItem('customerList', JSON.stringify(newCustomerList));

    // Navigate to customer list page (example implementation)
    // history.push('/customer-list');
  };

  return (
    <div className="container">
      <header className="header">Customer Data Manager</header>
      <section className="banner">Customer Details</section>

      <main className="main">
        {/* PAN number */}
        <div className="pan">
          <h2>PAN Number</h2>
          <h4>Enter valid PAN:</h4>
          <input
            type="text"
            id="panNo"
            value={pan}
            onChange={handlePanChange}
            placeholder="Enter valid PAN number"
          />
          <button id="verifyPan" onClick={handleVerifyClick}>Verify</button>
        </div>

        {/* Personal details of customer */}
        <div className="personal">
          <h2> Personal Details</h2>
          <div className="personalDetails">
            <h4>Full name:</h4>
            <input type="text" id="name" value={fullName} placeholder="Enter your full name" readOnly/>
            <h4>Email id:</h4>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email id"
              required
              maxLength="255"
            />
            <h4>Mobile No:</h4>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              pattern="\+91[0-9]{10}"
              required
              maxLength="13"
              placeholder="+91xxxxxxxxxx"
            />
          </div>
        </div>

        {/* Address of the customer */}
        <div className="addresses">
          {addresses.map((address, index) => (
            <div className="address" key={index}>
            <h2>Address {index + 1}</h2>
              {/* Address lines */}
              <h4>Address line 1:</h4>
              <input
                type="text"
                id="address"
                value={address.line1}
                onChange={(e) => handleAddressChange(index, 'line1', e.target.value)}
                required
                maxLength="700"
              />
              <h4>Address line 2:</h4>
              <input
                type="text"
                id="address"
                value={address.line2}
                onChange={(e) => handleAddressChange(index, 'line2', e.target.value)}
                maxLength="700"
              />

              {/* PIN code, state and city */}
              <h4>Post Code:</h4>
              <input
                type="number"
                value={address.postcode}
                id="postcode"
                onChange={(e) => handlePostcodeChange(index, e.target.value)}
                placeholder="Select valid Post Code"
                required
                maxLength="6"
              />
              <h4>State:</h4>
              <input id="state" type="text" placeholder="State" value={address.state} readOnly />
              <h4>City:</h4>
              <input id="city" type="text" placeholder="City" value={address.city} readOnly />
            </div>
          ))}
          <button id="addressbutton" onClick={addAddress}>Add Address</button>
        </div>
      </main>

      {/* Save/Submit button */}
      <section className="low-content">
        <button id="submit" onClick={handleSubmit}>Submit</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        @ created using ReactJS by Priya Kishor Kshirsagar
      </footer>
    </div>
  );
}

export default CustomerForm;