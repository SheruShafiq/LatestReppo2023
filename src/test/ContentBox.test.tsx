import { render } from '@testing-library/react';
import ContentBox, { ContentBoxProps } from '../components/ContentBox';
import matchers from "@testing-library/jest-dom";
expect.extend(matchers);

it('ContentBox renders children correctly', () => {
  const testContent = 'Test Content';
  const props: ContentBoxProps = {
    children: testContent,
  };

  const { getByText } = render(<ContentBox {...props} />);
  expect(getByText(testContent)).toBeInTheDocument();
});
