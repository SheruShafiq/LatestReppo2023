import { render } from '@testing-library/react';
import { test } from 'vitest';
import useResizeHandler from "../lib/hooks/useResizeHandler";
import GenericStepper, { Step } from '../components/GenericStepper';
import { debug } from 'vitest-preview';
import matchers from "@testing-library/jest-dom";
expect.extend(matchers);

const stepsMock: Step[] = [
  { label: 'Step 1', navigation: vi.fn(), isOptional: true },
  { label:  'Step 2', navigation: vi.fn() },
];

test('renders correctly when width > 600', () => {
    global.innerWidth = 800;
    global.dispatchEvent(new Event('resize'));

  const { getByText } = render(<GenericStepper activeStep={0} steps={stepsMock} />);
  expect(getByText('Step 1')).toBeInTheDocument();
  expect(getByText('Step 2')).toBeInTheDocument();
});

test('does not render step labels when width <= 600', () => {
        // Change the viewport to 500px.
        global.innerWidth = 500;

        // Trigger the window resize event.
        global.dispatchEvent(new Event('resize'));
    
  const { queryByText } = render(<GenericStepper activeStep={0} steps={stepsMock} />);
  debug();

  expect(queryByText('Step 1')).toBeNull();
  expect(queryByText('Step 2')).toBeNull();
  expect(screen).toMatchSnapshot();
});