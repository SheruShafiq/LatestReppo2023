import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { test } from 'vitest';
import SelectableFormListItem from '../components/SelectableFormListItem';
import matchers from "@testing-library/jest-dom";
expect.extend(matchers);

test('should render without crashing', () => {
    render(<SelectableFormListItem 
        id='1' 
        checked={false} 
        onSelect={() => {}} 
        title='Title' 
        subtitle='Subtitle' 
        subtitle2='Subtitle2'
    />);
});

test('should display title, subtitle, and subtitle2', () => {
    render(<SelectableFormListItem 
        id='1' 
        checked={false} 
        onSelect={() => {}} 
        title='Title' 
        subtitle='Subtitle' 
        subtitle2='Subtitle2'
    />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Subtitle2')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
});

test('should call onSelect when checkbox is clicked', () => {
    const mockFn = vi.fn();
    render(<SelectableFormListItem 
        id='1' 
        checked={false} 
        onSelect={mockFn} 
        title='Title' 
        subtitle='Subtitle' 
        subtitle2='Subtitle2'
    />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockFn).toHaveBeenCalledTimes(1);
});

test('should change the background color when checked', () => {
    render(<SelectableFormListItem 
        id='1' 
        checked={true} 
        onSelect={() => {}} 
        title='Title' 
        subtitle='Subtitle' 
        subtitle2='Subtitle2'
    />);

    expect(screen.getByTestId('selectable-form-list-item')).toHaveStyle('background-color: rgb(241, 245, 249)');
} );
