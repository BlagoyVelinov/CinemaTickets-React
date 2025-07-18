import { it, expect, beforeEach } from "vitest";
import { BrowserRouter} from 'react-router'
import ReactDOM from 'react-dom/client';
import { act } from 'react';
import { screen, render } from '@testing-library/react'

import MovieHome from "./MovieHome";

beforeEach(() => {
    document.body.innerHTML = ""; // - Old way(Manual cleanup)
});

//With manual option for writing unit test
it('Should display MovieHome name', async () => {
    const container = document.createElement('div');

    document.body.appendChild(container);
    const root = ReactDOM.createRoot(container);

    await act(() => {
        root.render(
            <BrowserRouter>
                <MovieHome name="movieName1"/>
            </BrowserRouter>
        );
    });

    const nameElement = document.querySelector('li h4');

    expect(nameElement.textContent).toEqual('movieName1');
});

//With testing-library/react option for writing unit test
it('Should display MovieHome name', () => {
    render(
        <BrowserRouter>
            <MovieHome name="movieName1"/>
        </BrowserRouter>
        );

    // const nameElement = document.querySelector('li h4');
    const nameElement = screen.getByText("movieName1")

    expect(nameElement).toBeInTheDocument();
});

