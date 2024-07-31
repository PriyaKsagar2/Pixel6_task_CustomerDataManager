import React, { useState } from 'react';
import './CustomerList.css';
import axios from 'axios';

// This component performs the editing and deleting operations on the customer data
function CustomerList({ customers, setCustomers }) {
  // State variables to track editing state and edited customer data
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedCustomer, setEditedCustomer] = useState(null);

  //handleEdit function handles the edit button click for a customer
  const handleEdit = (index) => {
    // Set the editing index to the clicked customer's index
    setEditingIndex(index);
    // Create a copy of the customer data at the clicked index for editing
    setEditedCustomer({ ...customers[index] });
  };

  // Function to handle the delete button click for a customer
  const handleDelete = (index) => {
    // Create a copy of the customer data array
    const newCustomers = [...customers];
    // Remove the customer at the clicked index from the copy
    newCustomers.splice(index, 1);
    // Update the state with the modified customer data
    setCustomers(newCustomers);
    // Update localStorage with the modified customer data
    localStorage.setItem('customerList', JSON.stringify(newCustomers));
  };

  // Function to handle the save button click after editing a customer
  const handleSave = (index) => {
    // Regular expressions for validating PAN, email, and mobile formats
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;

    // Validate PAN format
    if (!panPattern.test(editedCustomer.pan)) {
      alert("Invalid PAN format");
      return;
    }

    // Validate email format
    if (!emailPattern.test(editedCustomer.email)) {
      alert("Invalid email format");
      return;
    }

    // Validate mobile number format
    if (!mobilePattern.test(editedCustomer.mobile)) {
      alert("Invalid mobile number format");
      return;
    }

    // Loop through addresses and validate address line 1
    for (let address of editedCustomer.addresses) {
      if (!address.line1) {
        alert("Address line 1 is required for all addresses.");
        return;
      }
    }

    // Create a copy of the customer data array
    const newCustomers = [...customers];
    // Update the customer data at the edited index with the edited data
    newCustomers[index] = editedCustomer;
    // Update the state with the modified customer data
    setCustomers(newCustomers);
    // Update localStorage with the modified customer data
    localStorage.setItem("customerList", JSON.stringify(newCustomers));
    // Reset editing state variables
    setEditingIndex(-1);
    setEditedCustomer(null);
  };

  // Function to handle the cancel button click while editing a customer
  const handleCancel = () => {
    setEditingIndex(-1);
    setEditedCustomer(null);
  };

  // Function to handle changes in address fields during editing
  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...editedCustomer.addresses];
    newAddresses[index][field] = value;
    setEditedCustomer({ ...editedCustomer, addresses: newAddresses });
  };

 // Function to handle postcode changes during editing and fetch city/state data
  const handlePostcodeChange = async (index, value) => {
    handleAddressChange(index, 'postcode', value);
    try {
      // Fetching API for getting city and state data based on postcode
      const response = await axios.post('https://lab.pixel6.co/api/get-postcode-details.php', { postcode: value });
      // Extract city and state data from the response
      const city = response.data.city[0].name;
      const state = response.data.state[0].name;
      // Update address with fetched city and state data
      handleAddressChange(index, 'city', city);
      handleAddressChange(index, 'state', state);
    } catch (error) {
      console.error('Error fetching postcode details:', error);
    }
  };

  // Function to add a new address
  const addAddress = () => {
    if (editedCustomer.addresses.length < 10) {
      const newAddresses = [...editedCustomer.addresses, { line1: '', line2: '', postcode: '', state: '', city: '' }];
      setEditedCustomer({ ...editedCustomer, addresses: newAddresses });
    } else {
      alert('You can add a maximum of 10 addresses.');
    }
  };

  // Function to remove the most recently added address
  const removeAddress = () => {
    if (editedCustomer.addresses.length > 1) {
      const newAddresses = editedCustomer.addresses.slice(0, -1);
      setEditedCustomer({ ...editedCustomer, addresses: newAddresses });
    } else {
      alert('You must have at least one address.');
    }
  };

  return (
    <div className='table'>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>PAN</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Addresses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      className='edit'
                      value={editedCustomer.pan}
                      maxLength="10"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className='edit'
                      value={editedCustomer.fullName}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      className='edit'
                      value={editedCustomer.email}
                      onChange={(e) => setEditedCustomer({ ...editedCustomer, email: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="tel"
                      className='edit'
                      value={editedCustomer.mobile}
                      onChange={(e) => setEditedCustomer({ ...editedCustomer, mobile: e.target.value })}
                      maxLength="10"
                    />
                  </td>
                  <td>
                    {editedCustomer.addresses.map((address, addrIndex) => (
                      <div key={addrIndex}>
                      <h4 style={{ color: '#03045e', backgroundColor: '#caf0f8', margin: '8px'}}>Address:</h4>
                        <input
                          type="text"
                          className='editAdd'
                          value={address.line1}
                          onChange={(e) => handleAddressChange(addrIndex, 'line1', e.target.value)}
                          placeholder="Address line 1"
                          required
                        />
                        <input
                          type="text"
                          className='editAdd'
                          value={address.line2}
                          onChange={(e) => handleAddressChange(addrIndex, 'line2', e.target.value)}
                          placeholder="Address line 2"
                        />
                        <input
                          type="number"
                          className='editAdd'
                          value={address.postcode}
                          onChange={(e) => handlePostcodeChange(addrIndex, e.target.value)}
                          placeholder="Postcode"
                          maxLength="6"
                        />
                        <input
                          type="text"
                          className='editAdd'
                          value={address.state}
                          placeholder="State"
                          readOnly
                        />
                        <input
                          type="text"
                          className='editAdd'
                          value={address.city}
                          placeholder="City"
                          readOnly
                        />
                      </div>
                    ))}
                    <button id='editAdd' onClick={addAddress}>Add Address</button>
                    <button id='editAdd' onClick={removeAddress}>Remove Address</button>
                  </td>
                  <td>
                    <button id='save' onClick={() => handleSave(index)}>Save</button>
                    <button id='cancel' onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{customer.pan}</td>
                  <td>{customer.fullName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.mobile}</td>
                  <td>
                    {customer.addresses.map((address, addrIndex) => (
                      <div key={addrIndex}>
                      <h4 style={{ color: '#03045e', backgroundColor: '#caf0f8', margin: '8px'}}>Address:</h4>
                        {address.line1}, {address.line2}, {address.postcode}, {address.city}, {address.state}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button id='edit' onClick={() => handleEdit(index)}>Edit</button>
                    <button id='delete' onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
