import { screen, render } from "@testing-library/react";
import DetailDrawer, { DrawerProps } from "../components/DrawerComponent";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

test("renders PolicyDetailDrawer correctly", () => {
  const props: DrawerProps = {
    open: true,
    children: <div>test</div>,
    title: "Polisinformatie",
    setOpen: () => {},
  };

  render(<DetailDrawer {...props} />);
  debug();
  expect(screen.getByText("Polisinformatie")).toBeInTheDocument();
  expect(screen.getByText("test")).toBeInTheDocument();
});

test("Close button works correctly", async () => {
  const setOpenMock = vi.fn();
  const props: DrawerProps = {
    open: true,
    children: <div>test</div>,
    title: "John Doe",
    setOpen: setOpenMock,
  };

  render(<DetailDrawer {...props} />);

  const closeButton = screen.getByTestId("close");
  await closeButton.click();

  expect(setOpenMock).toHaveBeenCalledWith(false);
});
