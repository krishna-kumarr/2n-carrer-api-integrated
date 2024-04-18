import { render, screen } from "@testing-library/react"
import CardWithImage from "./CardWithImage";


test("testing button by passing data as props", () => {
    render(<CardWithImage cardImage={'image.jpg'} className={'card-width p-0'} cardParaTestId={'cardParaTestId'} cardTitle={'card'} carTextClassName={'p-0'} cardText={"paragraph"} />)

    expect(screen.getByTestId('imgTesting').getAttribute('src')).toEqual('image.jpg');
    expect(screen.getByTestId('cardHeadingTestId')).toHaveTextContent('card');
    expect(screen.getByTestId('cardParaTestId')).toHaveTextContent('paragraph');
    expect(screen.getByTestId('cardParaTestId').getAttribute('class')).toContain('p-0'); 
})