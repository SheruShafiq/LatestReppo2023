import { render, fireEvent, screen } from "@testing-library/react";
import InfoHeader from './InfoHeader'; 
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

describe('InfoHeader', () => {

  it('renders successfully', () => {
    const { getByText } = render(<InfoHeader title="Test Title" subtitle="Test subtitle" subtitle2="Test subtitle2" />);
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test subtitle")).toBeInTheDocument();
    expect(getByText("| Test subtitle2")).toBeInTheDocument();
  });

  it('updates when its props get updated', () => {
    const { rerender, getByText } = render(<InfoHeader title="Test Title" subtitle="Test subtitle" subtitle2="Test subtitle2" />);
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test subtitle")).toBeInTheDocument();
    expect(getByText("| Test subtitle2")).toBeInTheDocument();

    rerender(<InfoHeader title="Updated Title" subtitle="Updated subtitle" subtitle2="Updated subtitle2" />);

    expect(getByText("Updated Title")).toBeInTheDocument();
    expect(getByText("Updated subtitle")).toBeInTheDocument();
    expect(getByText("| Updated subtitle2")).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });

});
