import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import "./registerAlumni.css";

export default function RegisterAlumni() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setaddress] = useState("");
  const [Specialite, setSpecialite] = useState("");
  const [visibilite, setvisibilite] = useState(true);
  const [diplome, setdiplome] = useState(true);
  const [role, setrole] = useState("ALumni");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (token) {
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    console.log(userId);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const res = await axios.post(
        "http://localhost:4000/Api/V1/register",
        {
          firstName,
          lastName,
          address,
          Specialite,
          visibilite,
          diplome,
          role,
          email,
          password,
        },
        config
      );
      res.data && window.location.replace("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registertitle">Register Alumni </span>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="firstName">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              required
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              required
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="address">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              required
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="specialite">Specialite:</label>
            <input
              type="text"
              className="form-control"
              id="specialite"
              name="specialite"
              required
              onChange={(e) => setSpecialite(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="visibilite">
              Haw do you want to set the visibility of your account{" "}
            </label>
            <select onChange={(e) => setvisibilite(e.target.value)}>
              <option value={true}>--public--</option>
              <option value={false}>--private--</option>
            </select>
          </div>
          <div className="form-group">
            <label for="diplome">Have you received your diploma</label>
            <select onChange={(e) => setdiplome(e.target.value)}>
              <option value={true}>--yes ,I have--</option>
              <option value={false}>--No ,I havent--</option>
            </select>
          </div>
          <div className="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="email">Password:</label>
            <input
              type="password"
              className="form-controlp"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>

      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          somthing went wrong
        </span>
      )}
    </div>
  );
}
