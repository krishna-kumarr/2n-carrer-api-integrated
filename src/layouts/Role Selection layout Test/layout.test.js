import { fireEvent, render, screen } from "@testing-library/react"
import RoleSelectionLayout from "../RoleSelectionLayout"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"

const renderWithRouter = (ui, { route = '/role-selector' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    }
  }


test('Role Select Page visible test', () => {

    renderWithRouter(<RoleSelectionLayout />)

    expect(screen.getByTestId('professionalTestId')).toBeInTheDocument()
    expect(screen.getByTestId('employerTestId')).toBeInTheDocument()
    expect(screen.getByTestId('partnerTestId')).toBeInTheDocument()
    expect(screen.getByTestId('cardSignupButton')).toBeInTheDocument()
})

test('Role Select Page Sign up Click test', () => {
    renderWithRouter(<RoleSelectionLayout />)
    const Signup = screen.getByTestId('cardSignupButton')

    const handleSignupClickMock = jest.fn();

    Signup.onclick = handleSignupClickMock

    fireEvent.click(Signup)

    expect(handleSignupClickMock).toHaveBeenCalledTimes(1);
})