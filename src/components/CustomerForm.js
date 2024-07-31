import "./CustomerForm.css";
import React, { useState } from 'react';
import axios from 'axios';
import CustomerList from './CustomerList';

function CustomerForm() {
  const [pan, setPan] = useState('');
  const [isPanValid, setIsPanValid] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [addresses, setAddresses] = useState([{ line1: '', line2: '', postcode: '', state: '', city: '' }]);
  const [customerList, setCustomerList] = useState(JSON.parse(localStorage.getItem('customerList')) || []);
  const [showCustomerList, setShowCustomerList] = useState(false);

  // Handle PAN input change
  const handlePanChange = (e) => {
    const panInput = e.target.value.toUpperCase();
    setPan(panInput);
  };

  // Handle verifying PAN
  const handleVerifyClick = async () => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panPattern.test(pan)) {
      alert('Invalid PAN format');
      setIsPanValid(false);
      return;
    }

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

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle mobile input change
  const handleMobileChange = (e) => {
    const mobileInput = e.target.value.replace(/\D/g, '');
    setMobile(mobileInput);
  };

  // Handle adding a new address
  const addAddress = () => {
    if (addresses.length < 10) {
      setAddresses([...addresses, { line1: '', line2: '', postcode: '', state: '', city: '' }]);
    } else {
      alert('You can add a maximum of 10 addresses.');
    }
  };

  // Handle removing the most recently added address
  const removeAddress = () => {
    if (addresses.length > 1) {
      const newAddresses = addresses.slice(0, -1);
      setAddresses(newAddresses);
    } else {
      alert('You must have at least one address.');
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
    if (value && (isNaN(value) || value <= 0 || value.length > 6)) {
      alert("You can only enter upto 6 digits.");
      return;
    }

    handleAddressChange(index, "postcode", value);
    if (value.length <= 6) {
      try {
        const response = await axios.post(
          "https://lab.pixel6.co/api/get-postcode-details.php",
          { postcode: value }
        );
        const city = response.data.city[0].name;
        const state = response.data.state[0].name;
        handleAddressChange(index, "city", city);
        handleAddressChange(index, "state", state);
      } catch (error) {
        console.error("Error fetching postcode details:", error);
      }
    }
  };


  // Handle form submission
  const handleSubmit = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;

    if (!isPanValid) {
      alert('Please verify the PAN before submitting.');
      return;
    }

    if (!emailPattern.test(email)) {
      alert('Invalid email format.');
      return;
    }

    if (!mobilePattern.test(mobile)) {
      alert('Invalid mobile number format.');
      return;
    }

    for (let address of addresses) {
      if (!address.line1) {
        alert('Address line 1 is required for all addresses.');
        return;
      }
    }

    const customer = { pan, fullName, email, mobile, addresses };
    const newCustomerList = [...customerList, customer];
    setCustomerList(newCustomerList);

    localStorage.setItem('customerList', JSON.stringify(newCustomerList));
    setShowCustomerList(true);
  };

  return (
    <div className="container">
      <header className="header">Customer Data Manager</header>

      {/* Banner with navigation buttons */}
      <section className="banner">
        <button id="banner" onClick={() => setShowCustomerList(false)}>Customer Details</button>
        <button id="banner" onClick={() => setShowCustomerList(true)}>Customer List</button>
      </section>

      <main className="main">
        {!showCustomerList ? (
          <>
            <div className="pan">
              <h2>PAN Number</h2>
              <h4>Enter valid PAN:<pre> *  (Here is correct format for your referance:"AAFNZ2078H")</pre> </h4>
              <input
                type="text"
                id="panNo"
                value={pan}
                onChange={handlePanChange}
                placeholder="Enter valid PAN number"
                maxLength="10"
              />
              <button id="verifyPan" onClick={handleVerifyClick}>Verify</button>
            </div>
            <div className="personal">
              <h2>Personal Details</h2>
              <div className="personalDetails">
                <h4>Full name:<pre> *</pre></h4>
                <input type="text" id="name" value={fullName} placeholder="Your name according to PAN id" readOnly />
                <h4>Email id:<pre> *</pre></h4>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email id"
                  required
                  maxLength="255"
                />
                <h4>Mobile No:<pre> *</pre></h4>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={handleMobileChange}
                  required
                  maxLength="10"
                  placeholder="xxxxxxxxxx"
                />
              </div>
            </div>
            <div className="addresses">
              {addresses.map((address, index) => (
                <div className="address" key={index}>
                  <h2>Address {index + 1}</h2>
                  <h4>Address line 1: <pre> *</pre></h4>
                  <input
                    type="text"
                    id="address"
                    value={address.line1}
                    onChange={(e) => handleAddressChange(index, 'line1', e.target.value)}
                    required
                  />
                  <h4>Address line 2:</h4>
                  <input
                    type="text"
                    id="address"
                    value={address.line2}
                    onChange={(e) => handleAddressChange(index, 'line2', e.target.value)}
                  />
                  <h4>Post Code: <pre> *</pre></h4>
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
              <button id="removeAddress" onClick={removeAddress}>Remove Address</button>
            </div>
          </>
        ) : (
          <CustomerList customers={customerList} setCustomers={setCustomerList} />
        )}
      </main>
      <section className="low-content">
        {!showCustomerList && <button id="submit" onClick={handleSubmit}>Submit</button>}
      </section>
      <footer className="footer">
        @ created using ReactJS by Priya Kishor Kshirsagar
      </footer>
    </div>
  );
}

export default CustomerForm;
