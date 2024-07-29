import { useState, useContext } from "react";
import classes from "./ProfileForm.module.css";
import { AuthContext } from "../ContextApi/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProfileForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const Authctx = useContext(AuthContext);
  const  history= useHistory();

  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
  };

  const newPasswordFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCp4cYa6QJIIcMqlFPd28Uuh06UvjM4Z_o",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: Authctx.token,
            password: newPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Updating password failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      alert("New password is created");
      setNewPassword("");
      history.replace("/")
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <form className={classes.form} onSubmit={newPasswordFormHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={newPasswordHandler}
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Change Password"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
