import React, { useState } from "react";
import Label from "../Label/Label";
import InputGroup from "../Input/InputGroup";
import Input from "../Input/Input";
import { PiEnvelopeSimpleOpenThin } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import Button from "../Button/Button";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { PiEyeLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = () => {
  const pageNavigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [LoginDetails, setLoginDetails] = useState({
    email_id: "",
    password: "",
  });

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    // Validate email
    if (!LoginDetails.email_id) {
      newErrors.email = "Email Address is required.";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
        LoginDetails.email_id
      )
    ) {
      newErrors.email = "Invalid email format.";
    }

    // Validate password
    if (!LoginDetails.password) {
      newErrors.password = "Password is required.";
    }

    // on submit
    if (Object.keys(newErrors).length === 0) {
      setSubmitLoading(true);
      try {
        await axios({
          method: "post",
          url: "https://api.2ndcareers.com/login",
          auth: {
            username: LoginDetails.email_id.trim(),
            password: LoginDetails.password.trim(),
          },
        })
          .then((response) => {
            console.log(response.data);
            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              localStorage.setItem("Token",response.data.data.access_token)
              pageNavigate("/home/all");
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setSubmitLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  const errorMessage = queryParams.get("message");

  if (errorMessage !== null) {
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }
    setTimeout(() => {
      toast.error(errorMessage);
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3 login-form">
        <InputGroup
          className="login-input-group-text input-group-text border border-0"
          id="basic-addon1"
          reIcons={<PiEnvelopeSimpleOpenThin className="fs-3" />}
        />
        <Input
          type="email"
          className="form-control login-input border border-0 rounded-3 "
          placeHolder="Email ID"
          ariaLabel="email"
          testId="login-email-id"
          name="email_id"
          functionOnchange={(e) =>
            setLoginDetails({
              ...LoginDetails,
              [e.target.name]: e.target.value,
            })
          }
          functionOnkeyDown={handlekeydown}
        />

        {errors.email && (
          <Label className="py-2 text-danger col-12" title={errors.email} />
        )}
      </div>

      <div className="input-group mb-3 login-form ">
        <InputGroup
          className="login-input-group-text input-group-text border border-0"
          id="basic-addon2"
          reIcons={<CiLock className="fs-3" />}
        />
        <Input
          type={showPassword ? "text" : "password"}
          className="form-control login-input border-start-0 border-top-0 border-bottom-0 rounded-3 password-field-focus"
          placeHolder="Password"
          ariaLabel="password"
          testId="login-pass"
          functionOnchange={(e) =>
            setLoginDetails({
              ...LoginDetails,
              [e.target.name]: e.target.value,
            })
          }
          functionOnkeyDown={handlekeydown}
          name="password"
        />

        <InputGroup
          className="login-input-group-text input-group-text border-end-0 border-top-0 border-bottom-0"
          id="basic-addon3"
          onClick={() => setShowPassword(!showPassword)}
          reIcons={
            showPassword ? (
              <PiEyeLight className="fs-3 visible-eye" />
            ) : (
              <BsFillEyeSlashFill className="fs-3 visible-eye" />
            )
          }
        />
        {errors.password && (
          <Label className="py-2 text-danger col-12" title={errors.password} />
        )}
      </div>

      <div className="d-grid mt-3">
        {submitLoading ? (
          <Button
            className="btn btn-lg btn-login fw-bold mb-2"
            title="Loading...."
            buttonType="button"
            testId="disable-login-button"
            disable={true}
          />
        ) : (
          <Button
            className="btn btn-lg btn-login fw-bold mb-2"
            title="Sign in"
            buttonType="submit"
            testId="login-button"
          />
        )}

        <div className="text-end">
          <Link
            className="small"
            to={"/forgot-password"}
            data-testid="forgot-password"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;






