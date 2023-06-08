import { test, expect } from "vitest";
import { debug } from "vitest-preview";
import { render } from "@testing-library/react";
import Announcements, { AnnouncementProps } from "../components/Announcements";
import matchers from "@testing-library/jest-dom";
expect.extend(matchers);

const defaultProps: AnnouncementProps = {
  content: "Test content",
  level: "info",
};

describe("Announcements", () => {
  it("renders title if provided", () => {
    const props: AnnouncementProps = {
      ...defaultProps,
      title: "Test title",
    };

    const { getByText } = render(<Announcements {...props} />);
    expect(getByText("Test title")).toBeInTheDocument();
  });

  it("renders content", () => {
    const { getByText } = render(<Announcements {...defaultProps} />);
    expect(getByText("Test content")).toBeInTheDocument();
  });

  it("renders correct border color for each level", () => {
    const levels: AnnouncementProps["level"][] = ["info", "warning", "error"];

    levels.forEach((level) => {
      const props: AnnouncementProps = {
        ...defaultProps,
        level,
      };

      const { container } = render(<Announcements {...props} />);
      const alert = container.firstChild as HTMLElement;

      let expectedBorderColor: string;
      switch (level) {
        case "info":
          expectedBorderColor = "4px solid #0288D1";
          break;
        case "warning":
          expectedBorderColor = "4px solid #FFA000";
          break;
        case "error":
          expectedBorderColor = "4px solid #D32F2F";
          break;
        default:
          expectedBorderColor = "4px solid #0288D1";
          break;
      }
      debug();
      expect(alert).toHaveStyle(`border-left: ${expectedBorderColor}`);
    });
  });
});
