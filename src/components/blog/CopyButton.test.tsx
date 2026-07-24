import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "@/components/blog/CopyButton";

describe("CopyButton", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a confirmation when the copy succeeds", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });

    render(<CopyButton code="echo hello" />);
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByText("Copié !")).toBeInTheDocument());
    expect(writeText).toHaveBeenCalledWith("echo hello");
  });

  it("shows an error state instead of crashing when the clipboard write fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });

    render(<CopyButton code="echo hello" />);
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByText("Échec de la copie")).toBeInTheDocument());
  });
});
