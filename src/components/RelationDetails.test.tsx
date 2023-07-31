import { render, fireEvent, screen } from "@testing-library/react";
import RelationDetails from './RelationDetails';
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

describe('RelationDetails', () => {

  it('renders properly', () => {
    const { getByText } = render(<RelationDetails name="Test Name" relationId="Test ID" birthDate="Test Date" />);
    expect(getByText("Test Name")).toBeInTheDocument();
    expect(getByText("Test ID")).toBeInTheDocument();
    expect(getByText("| Test Date")).toBeInTheDocument();
  });

  it('re-renders when its props get updated', () => {
    const { rerender, getByText } = render(<RelationDetails name="Test Name" relationId="Test ID" birthDate="Test Date" />);
    expect(getByText("Test Name")).toBeInTheDocument();
    expect(getByText("Test ID")).toBeInTheDocument();
    expect(getByText("| Test Date")).toBeInTheDocument();

    rerender(<RelationDetails name="Updated Name" relationId="Updated ID" birthDate="Updated Date" />);

    expect(getByText("Updated Name")).toBeInTheDocument();
    expect(getByText("Updated ID")).toBeInTheDocument();
    expect(getByText("| Updated Date")).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });

});
