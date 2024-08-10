/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";

it("App Router: Works with Server Components", () => {
  render(<Page />);
  expect(screen.getByTestId("listUsersTitle")).toHaveTextContent("Procure pelo Nome ou Nome de Usuário");
});
