import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { usePointerSpotlight } from "@/hooks/usePointerSpotlight";

const createCard = () => {
  const card = document.createElement("div");
  card.className = "spotlight-card";
  const child = document.createElement("span");
  card.appendChild(child);
  card.getBoundingClientRect = () =>
    ({ left: 100, top: 50, width: 300, height: 200, right: 400, bottom: 250, x: 100, y: 50, toJSON: () => ({}) }) as DOMRect;
  document.body.appendChild(card);
  return { card, child };
};

const movePointer = (target: Element, clientX: number, clientY: number) =>
  target.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, clientX, clientY }));

describe("usePointerSpotlight", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("stores the pointer position relative to the hovered spotlight card", () => {
    renderHook(() => usePointerSpotlight());
    const { card, child } = createCard();
    movePointer(child, 160, 90);
    expect(card.style.getPropertyValue("--mouse-x")).toBe("60px");
    expect(card.style.getPropertyValue("--mouse-y")).toBe("40px");
  });

  it("ignores pointer movement outside spotlight cards", () => {
    renderHook(() => usePointerSpotlight());
    const outside = document.createElement("div");
    document.body.appendChild(outside);
    expect(() => movePointer(outside, 10, 10)).not.toThrow();
    expect(outside.style.getPropertyValue("--mouse-x")).toBe("");
  });

  it("stops listening after unmount", () => {
    const { unmount } = renderHook(() => usePointerSpotlight());
    unmount();
    const { card, child } = createCard();
    movePointer(child, 160, 90);
    expect(card.style.getPropertyValue("--mouse-x")).toBe("");
  });
});
