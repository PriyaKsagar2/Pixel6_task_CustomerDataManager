import React, { useState } from 'react';
import './CustomerList.css';
import axios from 'axios';

//this component performs the editing and deleting operations on the customer data
function CustomerList({ customers, setCustomers }) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedCustomer, setEditedCustomer] = useState(null);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedCustomer({ ...customers[index] });
  };

  const handleDelete = (index) => {
    const newCustomers = [...customers];
    newCustomers.splice(index, 1);
    setCustomers(newCustomers);
    localStorage.setItem('customerList', JSON.stringify(newCustomers));
  };

  const handleSave = () => {
    const newCustomers = [...customers];
    newCustomers[editingIndex] = editedCustomer;
    setCustomers(newCustomers);
    setEditingIndex(-1);
    setEditedCustomer(null);
    localStorage.setItem('customerList', JSON.stringify(newCustomers));
  };

  const handleCancel = () => {
    setEditingIndex(-1);
    setEditedCustomer(null);
  };

  const handleChange = (field, value) => {
    setEditedCustomer({ ...editedCustomer, [field]: value });
  };

  const handleAddressChange = (addressIndex, field, value) => {
    const newAddresses = [...editedCustomer.addresses];
    newAddresses[addressIndex][field] = value;
    setEditedCustomer({ ...editedCustomer, addresses: newAddresses });
  };

  const addAddress = () => {
    if (editedCustomer.addresses.length < 10) {
      setEditedCustomer({
        ...editedCustomer,
        addresses: [...editedCustomer.addresses, { line1: '', line2: '', postcode: '', state: '', city: '' }]
      });
    } else {
      alert('You can add a maximum of 10 addresses.');
    }
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

  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      {customers.map((customer, index) => (
        <div key={index} className="customerInfo">
          <h4>Customer {index + 1}</h4>
          {editingIndex === index ? (
            <>
              <input
                type="text"
                className='edit'
                value={editedCustomer.pan}
                placeholder="Enter valid PAN number"
                // onChange={(e) => handleChange('pan', e.target.value)}
                readOnly
              />
              <input
                type="text"
                className='edit'
                value={editedCustomer.fullName}
                placeholder="Enter your full name"
                // onChange={(e) => handleChange('fullName', e.target.value)}
              />
              <input
                type="email"
                className='edit'
                placeholder="Enter email id"
                value={editedCustomer.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <input
                type="tel"
                className='edit'
                placeholder="+91xxxxxxxxxx"
                value={editedCustomer.mobile}
                onChange={(e) => handleChange('mobile', e.target.value)}
              />
              {editedCustomer.addresses.map((address, addressIndex) => (
                <div key={addressIndex} className="edit-address">
                  <h4>Address {addressIndex + 1}</h4>
                  <input
                    type="text"
                    className='edit'
                    value={address.line1}
                    onChange={(e) => handleAddressChange(addressIndex, 'line1', e.target.value)}
                  />
                  <input
                    type="text"
                    className='edit'
                    value={address.line2}
                    onChange={(e) => handleAddressChange(addressIndex, 'line2', e.target.value)}
                  />
                  <input
                    type="number"
                    className='edit'
                    placeholder="Select valid Post Code"
                    value={address.postcode}
                    onChange={(e) => handlePostcodeChange(index, e.target.value)}
                  />
                  <input
                    type="text"
                    className='edit'
                    placeholder="State"
                    value={address.state}
                    readOnly
                  />
                  <input
                    type="text"
                    className='edit'
                    placeholder="City"
                    value={address.city}
                    readOnly
                  />
                </div>
              ))}
              <button id='addressbutton2' onClick={addAddress}>Add Address</button>
              <button id='save' onClick={handleSave}>Save</button>
              <button id='cancel' onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <p>PAN: {customer.pan}</p>
              <p>Full Name: {customer.fullName}</p>
              <p>Email: {customer.email}</p>
              <p>Mobile: {customer.mobile}</p>
              {customer.addresses.map((address, addressIndex) => (
                <div key={addressIndex} className="view-address">
                  <p>Address {addressIndex + 1}</p>
                  <p>Line 1: {address.line1}</p>
                  <p>Line 2: {address.line2}</p>
                  <p>Post Code: {address.postcode}</p>
                  <p>State: {address.state}</p>
                  <p>City: {address.city}</p>
                </div>
              ))}
              <button id='edit' onClick={() => handleEdit(index)}>Edit</button>
              <button id='delete' onClick={() => handleDelete(index)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default CustomerList;
