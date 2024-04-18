import React, { useRef, useState } from "react";
import FormInput from "../Input/FormInput";
import Input from "../Input/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import DateofBirth from "../Input/DateofBirth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfessionalSocialMediaForm = () => {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [professionalSignupInputValues, setProfessionalSignupInputValues] =
    useState({
      firstName: "",
      lastName: "",
      emailID: "",
      countryCode: "",
      mobileNumber: "",
      dateOfBirth: "",
      country: "",
      city: "",
    });

  const formRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const professionalSignupInputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      label: "First Name",
      errorMessage: "Min 3-30 characters and avoid symbols",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
      className: "form-control",
      dataTestid: "firstName",
      role: "firstName",
      alt: "firstName",
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Lastname",
      label: "Last Name",
      errorMessage: "Min 3-30 characters and avoid symbols",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
      className: "form-control",
      dataTestid: "lastName",
      alt: "lastName",
    },
    {
      id: 3,
      name: "emailID",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Please enter a valid email address",
      required: true,
      pattern: "^[a-z0-9]+@[a-z]+.[a-z]{2,3}$",
      className: "form-control",
      alt: "emailID",
      dataTestid: "emailID",
    },
    {
      id: 4,
      name: "mobileNumber",
      type: "number",
      placeholder: "Mobile Number",
      label: "Mobile Number",
      required: true,
      className: "form-control",
      errorMessage: "Mobile number should be entered",
      alt: "mobileNumber",
      pattern: "^([+]d{2})?d{10}$",
      dataTestid: "mobileNumber",
    },
    {
      id: 5,
      name: "dateOfBirth",
      type: "date",
      placeholder: "Date of Birth",
      label: "Date of Birth",
      required: true,
      className: "form-control",
      alt: "dateOfBirth",
      dataTestid: "dateOfBirth",
      errorMessage: "Date of Birth should be selected",
    },
    {
      id: 6,
      name: "country",
      type: "text",
      placeholder: "Country",
      label: "Country",
      required: true,
      className: "form-control",
      errorMessage: "Type atleast 4 characters",
      alt: "country",
      pattern: "^[A-Za-z0-9]{4,30}$",
      dataTestid: "country",
    },
    {
      id: 7,
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
      required: true,
      className: "form-control",
      errorMessage: "Type atleast 4 characters",
      pattern: "^[A-Za-z0-9]{4,30}$",
      alt: "city",
      dataTestid: "city",
    },
  ];

  const handlePhoneInput = (e, phone, contactno) => {
    setProfessionalSignupInputValues({
      ...professionalSignupInputValues,
      mobileNumber: e.slice(phone.dialCode.length),
      countryCode: phone.dialCode,
    });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    const profileRegisterParameters = {
      first_name: professionalSignupInputValues.firstName,
      last_name: professionalSignupInputValues.lastName,
      contact_number: professionalSignupInputValues.mobileNumber,
      country: professionalSignupInputValues.country,
      city: professionalSignupInputValues.city,
      dob: professionalSignupInputValues.dateOfBirth,
      email_id: professionalSignupInputValues.emailID,
    };

    console.log(profileRegisterParameters);
    try {
      await axios
        .post(
          "http://secondcareers.adraproductstudio.com:5000/store_signup_details",
          profileRegisterParameters
        )
        .then((response) => {
          console.log(response.data);
          setLoading(false);
          if (response.data.error_code === 0) {
            navigate("/home/all");
            setSubmitted(true);
            formRef.current.reset();
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setProfessionalSignupInputValues({
      ...professionalSignupInputValues,
      [e.target.name]: e.target.value,
    });
  };

  const onClickOne = () => {
    setShowPassword(!showPassword);
  };

  const onClickTwo = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getUserData = async (gToken) => {
    try {
      await axios
        .get(
          "http://secondcareers.adraproductstudio.com:5000/get_social_media_account_info",
          {
            headers: {
              Authorization: `Bearer ${gToken}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            setProfessionalSignupInputValues({
              emailID: response.data.data[0].email_id,
            });
            toast.success(response.data.message);
          } else if (response.data.error_code === 409) {
            toast.error(response.data.message);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  const authenticationToken = queryParams.get("token");

  if (authenticationToken !== null) {
    console.log(authenticationToken);
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }

    getUserData(authenticationToken);
  }

  return (
    <form
      className="row signup-forms"
      ref={formRef}
      onSubmit={handleCreateAccount}
    >
      {professionalSignupInputs.map((professionalSignupInput) => {
        return (
          <React.Fragment key={professionalSignupInput.id}>
            {professionalSignupInput.name === "mobileNumber" ? (
              <div className="col-md-6 mt-2 ">
                <div className="form-floating">
                  <PhoneInput
                    id="floatingInput"
                    specialLabel="Mobile Number"
                    country={"in"}
                    dataTestid="mobileNumber"
                    countryCodeEditable={false}
                    enableSearch
                    onChange={(e, phone) =>
                      handlePhoneInput(e, phone, "contactno")
                    }
                    inputProps={{
                      alt: "mobileNumber",
                      type: "tel",
                      placeholder: "Mobile Number",
                    }}
                  />
                </div>

                <div
                  id="signup-error-message"
                  className="text-danger mt-2 signup-error-message professional-signup-error-message"
                >
                  {professionalSignupInput.errorMessage}
                </div>
              </div>
            ) : professionalSignupInput.name === "dateOfBirth" ? (
              <div className="col-md-6 mt-2 ">
                <DateofBirth
                  professionalSignupInputValues={professionalSignupInputValues}
                  setProfessionalSignupInputValues={
                    setProfessionalSignupInputValues
                  }
                />
              </div>
            ) : (
              <FormInput
                socialLoginMode={professionalSignupInputValues.emailID}
                formInputDivClassName={
                  professionalSignupInput.name === "emailID"
                    ? "col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2"
                    : "col-md-6 mt-2"
                }
                formInputType={professionalSignupInput.type}
                formInputId={professionalSignupInput.name}
                formAriaLabel={professionalSignupInput.name}
                formFieldName={professionalSignupInput.label}
                formInputFieldError={professionalSignupInput.errorMessage}
                formFieldRequired={true}
                nameFromProfessionalSignup={professionalSignupInput.name}
                valueFromProfessionalSignup={
                  professionalSignupInputValues[professionalSignupInput.name]
                }
                onChange={onChange}
                errorMessage={professionalSignupInput.errorMessage}
                pattern={professionalSignupInput.pattern}
                dataTestid={professionalSignupInput.dataTestid}
                role={professionalSignupInput.role}
                alt={professionalSignupInput.alt}
                handleEyeClick={
                  professionalSignupInput.name === "password"
                    ? onClickOne
                    : null || professionalSignupInput.name === "confirmPassword"
                      ? onClickTwo
                      : null
                }
                showPassword={
                  professionalSignupInput.name === "password"
                    ? showPassword
                    : null || professionalSignupInput.name === "confirmPassword"
                      ? showConfirmPassword
                      : null
                }
                submitted={submitted}
                setSubmitted={setSubmitted}
              />
            )}
          </React.Fragment>
        );
      })}

      <div className="col-12 mt-2">
        <div className="form-check">
          <Input
            className="form-check-input"
            type="checkbox"
            id="termsAndCondition"
            required={true}
            alt="checkbox"
          />

          <label className="form-check-label" htmlFor="invalidCheck">
            I agree to all the <a href="#">Terms</a> and
            <a href="#"> Privacy policy</a>
          </label>
          {/* <div className="text-danger signup-error-message">You must agree before submitting.</div> */}
        </div>
      </div>

      <div className="d-grid mt-2">
        <button
          type="submit"
          className="btn btn-brand-color"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Account"}
        </button>
      </div>
    </form>
  );
};

export default ProfessionalSocialMediaForm;