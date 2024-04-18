import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import React from 'react';
import Login from "../../../views/common/Login";

describe("Login Test cases", () => {

  //global router
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    }
  }
 

  test("Checking fields are available", () => { 
    renderWithRouter(<Login />)
 
    expect(screen.getByText(/Sign In to Second Careers/i)).toBeInTheDocument();
    expect(screen.getByTestId('login-email-id')).toBeInTheDocument();
    expect(screen.getByTestId('login-pass')).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });



  test("should set username and password to be empty", () => {
    renderWithRouter(<Login />) 

    expect(screen.getByTestId('login-email-id').value).toBe("")
    expect(screen.getByTestId('login-pass').value).toBe("")
  });



  test("checking fields as empty when clicking submit button", () => {
    renderWithRouter(<Login />)
 
    fireEvent.click(screen.getByTestId("login-button")); 

    //validating input is empty
    expect(screen.getByTestId('login-email-id').value).toBe("")
    expect(screen.getByTestId('login-pass').value).toBe("")

    expect(screen.getByText(/Please enter an email address./i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter your password./i)).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });



  test("username field is empty error message when clicking submit button", () => {
    renderWithRouter(<Login />)

    fireEvent.change(screen.getByTestId('login-pass'), {
      target: { value: "password@123" },
    });
 
    fireEvent.click(screen.getByTestId("login-button")); 

    //validating email field is empty
    expect(screen.getByTestId('login-email-id').value).toBe("")

    expect(screen.getByText(/Please enter an email address./i)).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });



  test("password field is empty error message when clicking submit button", () => {
    renderWithRouter(<Login />) 

    fireEvent.change(screen.getByTestId('login-email-id'), {
      target: { value: "second-carrear" },
    });
 
    fireEvent.click(screen.getByTestId("login-button"));  

    //validating password field is empty
    expect(screen.getByTestId("login-pass").value).toBe("")
    expect(screen.getByText(/Please enter your password./i)).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });



  test("incorrect email", async() => {
    renderWithRouter(<Login />)
    //setting username and password target values of input element
    expect(screen.getByText(/Sign In to Second Careers/i)).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("login-email-id"), {
      target: { value: "second123" },
    });
    fireEvent.change(screen.getByTestId("login-pass"), {
      target: { value: "password@123" },
    });

    act(()=>{
      fireEvent.click(screen.getByTestId("login-button"));     

      //validating inputs not to be empty
      expect(screen.getByTestId("login-email-id").value).not.toMatch(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
      expect(screen.getByTestId("login-pass").value).not.toBe("");
    }) 

    expect(screen.getByTestId('login-button')).toBeInTheDocument()
    expect(screen.getByText(/Please enter a Valid mail/i)).toBeInTheDocument();

    await waitFor(()=>expect(window.location.href).toBe('http://localhost/'))
  });


  

  test("correct email", async() => {
    renderWithRouter(<Login />)
    //setting username and password target values of input element
    expect(screen.getByText(/Sign In to Second Careers/i)).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("login-email-id"), {
      target: { value: "second123@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("login-pass"), {
      target: { value: "password@123" },
    });

    act(()=>{
      fireEvent.click(screen.getByTestId("login-button"));     

      //validating inputs not to be empty
      expect(screen.getByTestId("login-email-id").value).toMatch(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
      expect(screen.getByTestId("login-pass").value).not.toBe("");
    }) 

    expect(screen.getByTestId('disable-login-button')).toBeInTheDocument()
    expect(screen.getByTestId('disable-login-button')).toBeDisabled()
    
    await waitFor(()=>expect(window.location.href).toBe('http://localhost/home/all'))
  });

 


  test("clicking forgot password link", async () => {
    renderWithRouter(<Login />);
    expect(screen.getByText(/Sign In to Second Careers/i)).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId("forgot-password"));
    });
    await waitFor(() =>
      expect(window.location.href).toBe("http://localhost/forgot-password")
    );
  });
});