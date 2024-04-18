import { render, screen } from "@testing-library/react"
import Button from "./Button"

test("testing button by passing data as props", () => {
    render(<Button buttonType={'button'} className={'btn'} testId={'buttonTesting'} title={'Click me'} />)

    expect(screen.getByTestId('buttonTesting')).toBeInTheDocument();

    expect(screen.getByTestId('buttonTesting').getAttribute('class')).toEqual('btn');
    expect(screen.getByTestId('buttonTesting').getAttribute('type')).toEqual('button');
    expect(screen.getByTestId('buttonTesting').getAttribute('data-testid')).toEqual('buttonTesting');

    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
})