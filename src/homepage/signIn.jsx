import { useState } from "react";

export default function SignIn() {
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState(false);
  //   setChecked(!checked);
  return (
    <div className="form-box">
      {!clicked ? (
        <>
          <h2>Register or Login</h2>
          <div>
            <input className="input" type="text" placeholder="Your Email" />
          </div>
          <div>
            <input
              className="input"
              type={checked ? "text" : "password"}
              placeholder="Password"
            />
          </div>

          <div className="checkbox1">
            <input
              className="checkbox"
              type="checkbox"
              // eslint-disable-next-line no-unused-vars
              onClick={(e) => (e = setChecked(!checked))}
            />
            <label>Show password</label>
          </div>
          <button
            // eslint-disable-next-line no-unused-vars
            onClick={(e) => (e = setClicked(!clicked))}
            className="btn-login"
          >
            Login
          </button>
        </>
      ) : (
        <h2>Youve Signed in</h2>
      )}
    </div>
  );
}
