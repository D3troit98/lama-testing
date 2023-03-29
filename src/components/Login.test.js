import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login/Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login />);
  const butttonInputEl = screen.getByRole("button");
  expect(butttonInputEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const butttonInputEl = screen.getByRole("button");
  expect(butttonInputEl).toBeDisabled();
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorSpan = screen.getByTestId("error");
  expect(errorSpan).not.toBeVisible();
});

test("username input should be changed", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(userInputEl, { target: { value: testValue } });
  expect(userInputEl.value).toBe(testValue);
});

test("password input should be changed", () => {
  render(<Login />);
  const passInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passInputEl, { target: { value: testValue } });
  expect(passInputEl.value).toBe(testValue);
});

test("button should not be disabled when inputs exists", () => {
  render(<Login />);
  const butttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passInputEl, { target: { value: testValue } });
  expect(butttonInputEl).not.toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const butttonInputEl = screen.getByRole("button");
  expect(butttonInputEl).not.toHaveTextContent(/please wait/i);
});

test("loading should be rendered when clicked", () => {
  render(<Login />);
  const butttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passInputEl, { target: { value: testValue } });
  fireEvent.click(butttonInputEl);

  expect(butttonInputEl).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const butttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passInputEl, { target: { value: testValue } });
  fireEvent.click(butttonInputEl);

  await waitFor(() =>
    expect(butttonInputEl).not.toHaveTextContent(/please wait/i)
  );
});

test("user should be rendered after fetching", async () => {
  render(<Login />);
  const butttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passInputEl, { target: { value: testValue } });
  fireEvent.click(butttonInputEl);
  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});
