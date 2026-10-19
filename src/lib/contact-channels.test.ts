import { describe, expect, it } from "vitest";
import { buildContactChannels, buildWhatsappLink } from "@/lib/contact-channels";

describe("buildWhatsappLink", () => {
  it("returns null when the number is empty", () => {
    expect(buildWhatsappLink("")).toBeNull();
  });

  it("strips spaces, plus signs and punctuation", () => {
    expect(buildWhatsappLink("+221 77 123 45 67")).toBe("https://wa.me/221771234567");
  });

  it("returns null when the number has too few digits", () => {
    expect(buildWhatsappLink("+12")).toBeNull();
  });

  it("appends a url-encoded prefilled message when provided", () => {
    expect(buildWhatsappLink("+221 77 123 45 67", "Bonjour, j'ai un projet")).toBe(
      "https://wa.me/221771234567?text=Bonjour%2C%20j'ai%20un%20projet",
    );
  });

  it("ignores a blank message", () => {
    expect(buildWhatsappLink("+221771234567", "   ")).toBe("https://wa.me/221771234567");
  });
});

describe("buildContactChannels", () => {
  it("always includes the email channel", () => {
    const channels = buildContactChannels({ email: "a@b.co", whatsappNumber: "", bookingUrl: "" });
    expect(channels.map((channel) => channel.kind)).toEqual(["email"]);
  });

  it("includes whatsapp and booking only when configured", () => {
    const channels = buildContactChannels({
      email: "a@b.co",
      whatsappNumber: "+221771234567",
      bookingUrl: "https://cal.com/zoubeir",
    });
    expect(channels.map((channel) => channel.kind)).toEqual(["email", "whatsapp", "booking"]);
  });

  it("rejects a booking url that is not https", () => {
    const channels = buildContactChannels({
      email: "a@b.co",
      whatsappNumber: "",
      bookingUrl: "javascript:alert(1)",
    });
    expect(channels.map((channel) => channel.kind)).toEqual(["email"]);
  });
});
