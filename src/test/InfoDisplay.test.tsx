import { render, screen } from '@testing-library/react';
import InfoDisplay, { InfoDisplayProps } from '../components/InfoDisplay';
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

const defaultProps: InfoDisplayProps = {
  label: 'Test Label',
  value: 'Test Value',
};

describe('InfoDisplay', () => {
  it('renders the label and value when value is provided', () => {
    render(<InfoDisplay {...defaultProps} />);
    const labelElement = screen.getByText(defaultProps.label);
    const valueElement = screen.getByText(defaultProps.value);

    expect(labelElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  it('renders a Skeleton when value is not provided', () => {
    const propsWithoutValue = { ...defaultProps, value: '' };
    render(<InfoDisplay {...propsWithoutValue} />);
    const labelElement = screen.getByText(defaultProps.label);
    const skeletonElement = screen.getByTestId('info-display-skeleton');

    expect(labelElement).toBeInTheDocument();
    expect(skeletonElement).toBeInTheDocument();
  });
});
