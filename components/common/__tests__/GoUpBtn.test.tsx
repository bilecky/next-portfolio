import { render, screen } from "@testing-library/react";
import GoUpBtn from "../GoUpBtn";

describe("GoUpBtn", () => {
  it("renderuje link przewijania do góry", () => {
    render(<GoUpBtn />);
    const link = screen.getByRole("link"); // bez name: "" bo to failuje
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#header");
  });
});
