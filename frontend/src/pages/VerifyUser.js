import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/verify/${token}`
        );
        if (response.data.success === true) {
          navigate("/login");
        }
      } catch (error) {
        console.error(
          "Verification error:",
          error.response?.data || error.message
        );
      }
    };

    if (token) verifyAccount(); // Trigger the verification if the token exists
  }, [token, navigate]);

  return (
    <div>
      <h1>Verifying your account...</h1>
    </div>
  );
};

export default VerifyAccount;
