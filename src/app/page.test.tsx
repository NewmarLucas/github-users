/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "fake-indexeddb/auto";
import Page from "./page";

it("App Router: Works with Server Components", () => {
  render(<Page />);
  expect(screen.getByTestId("list-users-title")).toHaveTextContent("Procure pelo Nome ou Nome de Usuário");
});
