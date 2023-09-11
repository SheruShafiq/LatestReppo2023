import matchers from "@testing-library/jest-dom";
expect.extend(matchers);
import { render } from '@testing-library/react'
import GenericFallback, { GenericFallbackProps } from "../components/GenericFallback";

describe('GenericFallback', () => {
  const defaultProps: GenericFallbackProps = {
    title: 'Test Title',
    description: 'Test Description',
  };

  it('should render the component with the given title and description', () => {
    const { getByText } = render(<GenericFallback {...defaultProps} />);

    const title = getByText(defaultProps.title);
    const description = getByText(defaultProps.description);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should render the component with the given title and no description', () => {
    const { getByText, queryByText } = render(<GenericFallback {...defaultProps} description={undefined} />);


    const title = getByText(defaultProps.title);
    const description = queryByText(defaultProps.description);

    expect(title).toBeInTheDocument();
    expect(description).toBeNull();
  });
});
