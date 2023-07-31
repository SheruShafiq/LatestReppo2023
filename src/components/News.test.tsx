import { render, screen } from "@testing-library/react";
import News, { NewsProps } from "../components/News";
import matchers from "@testing-library/jest-dom";
expect.extend(matchers);

const sampleArticles: NewsProps["articles"] = [
  {
    title: "Article 1",
    content: "This is the content of article 1.",
    link: "https://example.com/article1",
  },
  {
    title: "Article 2",
    content: "This is the content of article 2.",
  },
];

describe("News component", () => {
  it("renders nothing when articles prop is undefined", () => {
    render(<News articles={undefined} />);
    const newsContainer = screen.queryByTestId("news-container");
    expect(newsContainer).toBeNull();
  });

  it("renders articles with proper structure", () => {
    render(<News articles={sampleArticles} />);
    const newsContainer = screen.getByTestId("news-container");

    expect(newsContainer).toBeInTheDocument();
    const articleTitles = screen.getAllByRole("heading");
    const articleContents = screen.getAllByText(/This is the content of/);
    const articleLinks = screen.getAllByText("lees verder >");

    expect(articleTitles.length).toBe(2);
    expect(articleContents.length).toBe(2);
    expect(articleLinks.length).toBe(2);
  });

  it("applies correct styles for onMobile prop", () => {
    render(<News articles={sampleArticles} onMobile />);
    const newsContainer = screen.getByTestId("news-container");

    expect(newsContainer).toHaveStyle('background-color: white;');
  });

  it("applies correct styles for non-mobile", () => {
    render(<News articles={sampleArticles} />);
    const newsContainer = screen.getByTestId("news-container");

    expect(newsContainer).toHaveStyle('background-color: rgba(0,0,0,0.6);'
    );
    expect(screen).toMatchSnapshot();
  });
});
