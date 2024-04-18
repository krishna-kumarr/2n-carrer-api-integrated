import React, { useState } from "react";

const Input = ({
  socialLoginMode,
  submitted,
  type,
  className,
  id,
  placeHolder,
  formFieldName,
  ariaLabel,
  testId,
  required,
  name,
  functionOnchange,
  functionOnkeyDown,
  disabled,
  pattern,
  role,
  alt,
}) => {
  const [unfocused, setUnfocused] = useState(false);

  const handleUnfocused = (e) => {
    setUnfocused(true);
  };

  // console.log(socialLoginMode)
  return (
    <>
      {socialLoginMode !== undefined ? (
        <input
          type={type}
          className={className}
          placeholder={placeHolder}
          aria-label={ariaLabel}
          data-testid={testId}
          id={id}
          required={required}
          onChange={functionOnchange}
          onKeyDown={functionOnkeyDown}
          name={name}
          disabled={type === "email" ? "disabled" : null}
          pattern={pattern}
          role={role}
          alt={alt}
          onBlur={handleUnfocused}
          focused={submitted ? null : unfocused.toString()}
          value={type === "email" ? socialLoginMode : null}

        />
      ) : (
        <input
          type={type}
          className={className}
          placeholder={placeHolder}
          aria-label={ariaLabel}
          data-testid={testId}
          id={id}
          required={required}
          onChange={functionOnchange}
          onKeyDown={functionOnkeyDown}
          name={name}
          disabled={disabled === true ? "disabled" : null}
          pattern={pattern}
          role={role}
          alt={alt}
          onBlur={handleUnfocused}
          onFocus={() => name === "confirmPassword" && setUnfocused(true)}
          focused={submitted ? null : unfocused.toString()}

        />
      )}

      {id === "termsAndCondition" ?
        <label className="form-check-label" htmlFor="termsAndCondition">
          I agree to all the&nbsp;<a href="#">Terms &nbsp;</a> and&nbsp;
          <a href="#"> Privacy policy</a>
        </label>
        :
        <label htmlFor={id} className="label-name ">
          {formFieldName}
        </label>

      }
    </>
  );
};

export default Input;