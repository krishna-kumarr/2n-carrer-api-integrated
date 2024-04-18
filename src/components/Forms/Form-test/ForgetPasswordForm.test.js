import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom' 
import '@testing-library/jest-dom'
import React from 'react'; 
import ChangePassword from "../../../views/common/ChangePassword";

describe("Login Test cases", () => {

  //global router
  const renderWithRouter = (ui, { route = '/forgot-password' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    }
  }
  
  test("check availability",()=>{
    renderWithRouter(<ChangePassword/>)

    expect(screen.getByText(/Forget your Password ?/i)).toBeInTheDocument();
    expect(screen.getByTestId("reset-email")).toBeInTheDocument();
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  })


  test("checking email filed is empty",()=>{
    renderWithRouter(<ChangePassword/>)

    expect(screen.getByTestId("reset-email").value).toBe('');
  })


  test("checking email filed value updating",()=>{
    renderWithRouter(<ChangePassword/>)

    fireEvent.change(screen.getByTestId("reset-email"),{target : {value :'abc@gmail.com'}})
    expect(screen.getByTestId("reset-email").value).not.toBe('');
  })


  test("checking inivalid email",()=>{
    renderWithRouter(<ChangePassword/>)

    fireEvent.change(screen.getByTestId("reset-email"),{target : {value :'abc'}})
    expect(screen.getByTestId("reset-email").value).not.toBe('');
    act(()=>{
      fireEvent.click(screen.getByTestId("reset-button"));  
    })

    expect(screen.getByText('Please enter a valid mail')).toBeInTheDocument();
  })


  test("checking valid email",()=>{
    renderWithRouter(<ChangePassword/>)

    fireEvent.change(screen.getByTestId("reset-email"),{target : {value :'abc123@gmail.com'}})
    expect(screen.getByTestId("reset-email").value).not.toBe('');
    act(()=>{
      fireEvent.click(screen.getByTestId("reset-button"));  
    }) 
    
  })
})