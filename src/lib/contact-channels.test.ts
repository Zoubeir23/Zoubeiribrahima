import { describe, expect, it } from "vitest";
import { buildBookingEmbedUrl, buildContactChannels, buildWhatsappLink } from "@/lib/contact-channels";

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

describe("buildBookingEmbedUrl", () => {
  const embedUrl = buildBookingEmbedUrl("https://calendly.com/zoubeiribrahima/30min", "zoubeir.me");
  const parameters = new URL(embedUrl).searchParams;

  it("keeps the original booking page path", () => {
    expect(new URL(embedUrl).pathname).toBe("/zoubeiribrahima/30min");
  });

  it("declares the embedding domain and inline mode", () => {
    expect(parameters.get("embed_domain")).toBe("zoubeir.me");
    expect(parameters.get("embed_type")).toBe("Inline");
  });

  it("applies the dark site colors without the leading hash", () => {
    expect(parameters.get("background_color")).toBe("0f0f0f");
    expect(parameters.get("text_color")).toBe("ffffff");
    expect(parameters.get("primary_color")).toBe("8b5cf6");
  });

  it("preserves parameters already present on the booking url", () => {
    const url = buildBookingEmbedUrl("https://calendly.com/a/b?month=2026-11", "zoubeir.me");
    expect(new URL(url).searchParams.get("month")).toBe("2026-11");
  });

  it("returns the input unchanged when it is not a valid url", () => {
    expect(buildBookingEmbedUrl("not a url", "zoubeir.me")).toBe("not a url");
  });
});

