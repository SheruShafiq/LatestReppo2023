import { render, fireEvent, screen } from "@testing-library/react";
import RadioInput from './RadioInput';
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

describe('RadioInput', () => {
  const handleChangeMock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('displays the title', () => {
    const { getByText } = render(<RadioInput title="Test Title" radioGroupValue="" handleChange={handleChangeMock} options={[]} />);
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it('displays all the options', () => {
    const { getByLabelText } = render(<RadioInput title="Test Title" radioGroupValue="" handleChange={handleChangeMock} options={["Option1", "Option2"]} />);
    expect(getByLabelText("Option1")).toBeInTheDocument();
    expect(getByLabelText("Option2")).toBeInTheDocument();
  });

  it('triggers handleChange on input change', async () => {
    const { getByLabelText } = render(<RadioInput title="Test Title" radioGroupValue="" handleChange={handleChangeMock} options={["Option1", "Option2"]} />);
    const radiobutton = getByLabelText("Option1") as HTMLInputElement;

    await fireEvent.click(radiobutton);

    expect(handleChangeMock).toHaveBeenCalled();
    expect(screen).toMatchSnapshot();
  });
});
