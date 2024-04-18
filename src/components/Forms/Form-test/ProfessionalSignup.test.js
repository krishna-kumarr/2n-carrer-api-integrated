import { fireEvent, render, screen } from "@testing-library/react"
import ProfessionalSignUpForm from "../ProfessionalSignUpForm";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";




describe("Checking all fields", () => {
    const renderWithRouter = (ui, { route = '/role-selector/professional' } = {}) => {
        window.history.pushState({}, 'Test page', route)
    
        return {
          user: userEvent,
          ...render(ui, { wrapper: BrowserRouter }),
        }
      }

    test("checking all fields are available", () => {
        renderWithRouter(<ProfessionalSignUpForm/>);

        const firstNameEl = screen.getByTestId("firstName");
        const lastNameEl = screen.getByAltText("lastName");
        const emailIDEl = screen.getByAltText("emailID");
        const mobileNumberEl = screen.getByAltText("mobileNumber");
        // const dateOfBirthEl = screen.getByAltText("dateOfBirth");
        const countryEl = screen.getByTestId("country");
        const cityEl = screen.getByAltText("city");
        const passwordEl = screen.getByAltText("password");
        const confirmPasswordEl = screen.getByAltText("confirmPassword");

        expect(firstNameEl).toBeInTheDocument()
        expect(lastNameEl).toBeInTheDocument()
        expect(emailIDEl).toBeInTheDocument()
        expect(mobileNumberEl).toBeInTheDocument()
        // expect(dateOfBirthEl).toBeInTheDocument()
        expect(countryEl).toBeInTheDocument()
        expect(cityEl).toBeInTheDocument()
        expect(passwordEl).toBeInTheDocument()
        expect(confirmPasswordEl).toBeInTheDocument()
    })

    test("checking all fields are initially empty", () => {
        renderWithRouter(<ProfessionalSignUpForm/>)

        const firstNameEl = screen.getByTestId("firstName");
        const lastNameEl = screen.getByAltText("lastName");
        const emailIDEl = screen.getByAltText("emailID");
        const mobileNumberEl = screen.getByAltText("mobileNumber");
        // const dateOfBirthEl = screen.getByAltText("dateOfBirth");
        const countryEl = screen.getByAltText("country");
        const cityEl = screen.getByAltText("city");
        const passwordEl = screen.getByAltText("password");
        const confirmPasswordEl = screen.getByAltText("confirmPassword");

        expect(firstNameEl).toHaveValue("")
        expect(lastNameEl).toHaveValue("")
        expect(emailIDEl).toHaveValue("")
        // expect(dateOfBirthEl).toHaveValue("")
        expect(countryEl).toHaveValue("")
        expect(cityEl).toHaveValue("")
        expect(passwordEl).toHaveValue("")
        expect(confirmPasswordEl).toHaveValue("")
    })
    test("checking the checkbox is not checked initially", () => {
        renderWithRouter(<ProfessionalSignUpForm />);
        const checkBox = screen.getByAltText("checkbox");
        expect(checkBox).not.toBeChecked();
    })


    test("showing error when invalid inputs", () => {
        renderWithRouter(<ProfessionalSignUpForm />);

        const firstNameEl = screen.getByTestId("firstName");
        fireEvent.change(firstNameEl, {target : { value : "te"}}); // less than 3,greater than 16 
        expect(firstNameEl.value).not.toMatch(/^[A-Za-z0-9]{3,16}$/i)
        expect(screen.queryByText("First Name should be 3-30 characters and it shouldn't include special characters")).toBeInTheDocument();

        const lastNameEl = screen.getByTestId("lastName");
        fireEvent.change(lastNameEl, {target : { value : "te"}}); 
        expect(lastNameEl.value).not.toMatch(/^[A-Za-z0-9]{3,16}$/i)
        expect(screen.queryByText("Last Name should be 3-16 characters and it shouldn't include special characters")).toBeInTheDocument();
        
        const emailIDEl = screen.getByTestId("emailID");
        fireEvent.change(emailIDEl, {target : { value : "te"}}); 
        expect(emailIDEl.value).not.toMatch(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i);
        expect(screen.queryByText("Email should be in correct format (For ex:username@example.com)")).toBeInTheDocument();

        const countryEl = screen.getByAltText("country");
        fireEvent.change(countryEl, {target : { value : "to"}});  
        expect(countryEl.value).not.toMatch(/^[A-Za-z0-9]{4,30}$/i);
        // expect(screen.getByText(/Type atleast 4 characters/i)).toBeInTheDocument();

        const cityEl = screen.getByAltText("city");
        fireEvent.change(cityEl, {target : { value : "te"}});  
        expect(cityEl.value).not.toMatch(/^[A-Za-z0-9]{4,30}$/i);
        // expect(screen.queryByText("Type atleast 4 characters")).toBeInTheDocument();

        const passwordEl = screen.getByAltText("password");
        fireEvent.change(passwordEl, {target : { value : "te"}}); 
        expect(passwordEl.value).not.toMatch(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i);
        expect(screen.queryByText("Password should contain 8-20 characters and it should have 1 letter,1 number and 1 special character")).toBeInTheDocument();

        const confirmPasswordEl = screen.getByAltText("confirmPassword");
        fireEvent.change(confirmPasswordEl, {target : { value : "tes"}}); 
        expect(confirmPasswordEl.value).not.toEqual(passwordEl.value);
        expect(screen.queryByText("Confirm Password should match with Password")).toBeInTheDocument();
    })

    test("values change during onChange event", () => {
        renderWithRouter(<ProfessionalSignUpForm />);

        const firstNameEl = screen.getByTestId("firstName");
        fireEvent.change(firstNameEl, {target : { value : "test"}});
        expect(firstNameEl.value).toEqual("test")

        const lastNameEl = screen.getByTestId("firstName");
        fireEvent.change(lastNameEl, {target : { value : "test"}});
        expect(lastNameEl.value).toEqual("test")

        const emailIDEl = screen.getByTestId("emailID");
        fireEvent.change(emailIDEl, {target : { value : "test123@gmail.com"}});
        expect(emailIDEl.value).toEqual("test123@gmail.com")

        // const mobileNumberEl = screen.getByAltText("mobileNumber");
        // fireEvent.change(mobileNumberEl, {target : { value : "+91"}});
        // expect(mobileNumberEl.value).toEqual("+91")

        const countryEl = screen.getByTestId("country");
        fireEvent.change(countryEl, {target : { value : "india"}});
        expect(countryEl.value).toEqual("india")

        const cityEl = screen.getByTestId("city");
        fireEvent.change(cityEl, {target : { value : "coimbatore"}});
        expect(cityEl.value).toEqual("coimbatore")

        const passwordEl = screen.getByTestId("password");
        fireEvent.change(passwordEl, {target : { value : "test@1234"}});
        expect(passwordEl.value).toEqual("test@1234")

        const confirmPasswordEl = screen.getByAltText("confirmPassword");
        fireEvent.change(confirmPasswordEl, {target : { value : passwordEl.value}});
        expect(confirmPasswordEl.value).toEqual(passwordEl.value)

    })












    // test("checking the checkbox is checked", () => {
    //     renderWithRouter(<ProfessionalSignUpForm />);

    //     const checkBox = screen.getByTestId(/checkBox/i);
    //     expect(checkBox).toBeInTheDocument()

    //     checkBox.onclick = onCheckBoxClick;

    //     fireEvent.click(checkBox);

    //     expect(checkBox).toBeChecked()

    // })






})