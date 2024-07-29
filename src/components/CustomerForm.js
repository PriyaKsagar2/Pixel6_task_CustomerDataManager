import "./CustomerForm.css";


function CustomerForm() {

  return (
    <div className="container">
      <header className="header">Customer Data Manager</header>
      <section className="banner">Customer Details</section>

      <main className="main">

        {/* PAN number */}
        <div className="pan">
          <h3>PAN Number</h3>

          <h5>Enter valid PAN:</h5>
          <input
            type="password"
            id="panNo"
            placeholder="Enter valid pan number"
          />

          <button className="verifyPan">Verify</button>
        </div>

        {/* Personal details of customer */}
        <div className="personal">
          <h3> Personal Details</h3>
          <div className="personalDetails">
            <h5>Full name:</h5>
            <input type="text" id="name" placeholder="Enter your full name" />

            <h5>Email id:</h5>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength="255"
            />

            <h5>Mobile No:</h5>
            <input
              type="tel"
              id="mobile"
              pattern="\+91[0-9]{10}"
              required
              maxLength="13"
              placeholder="+91xxxxxxxxxx"
            />
          </div>
        </div>

        {/* Address of the customer */}
        <div className="addresses">
          <h3>Address</h3>
          <div className="address">
            {/* Address lines */}
            <h5>Address line 1:</h5>
            <input type="text" id="address" required maxLength="700" />
            <h5>Address line 2:</h5>
            <input type="text" id="address" required maxLength="700" />
          </div>

          {/* PIN code, state and city */}

          <h5>Post Code:</h5>
          <input
            type="number"
            id="postcode"
            placeholder="Select valid Post Code"
            required
            maxLength="6"
          />

          <h5>State:</h5>
          <input type="text" id="state" placeholder="Your State" />
          <h5>City:</h5>
          <input type="text" id="city" placeholder="Your State" />
        </div>
      </main>

      {/* Save/Submit button */}
      <section className="low-content">Submit</section>

      {/* Footer */}
      <footer className="footer">
        @ created using ReactJS by Priya Kishor Kshirsagar
      </footer>
    </div>
  );
}

export default CustomerForm;