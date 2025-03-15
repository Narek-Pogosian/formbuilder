import { createValidationSchema } from "../components/builder/renderer/create-validation";
import { describe, it, expect } from "vitest";
import { type FormSchema } from "@/schemas/form-schema";

describe("createValidationSchema", () => {
  it("should fail if a required text field is empty", () => {
    const form: FormSchema = [
      {
        id: "textField",
        type: "text",
        isFieldType: true,
        required: true,
        label: "",
        longAnswer: false,
        placeholder: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({ textField: "" });

    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("This field is required");
  });

  it("should pass if an optional text field is empty", () => {
    const form: FormSchema = [
      {
        id: "textField",
        type: "text",
        isFieldType: true,
        required: false,
        label: "",
        longAnswer: false,
        placeholder: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({ textField: "" });

    expect(result.success).toBe(true);
  });

  it("should pass if the email field is valid", () => {
    const form: FormSchema = [
      {
        id: "emailField",
        type: "email",
        isFieldType: true,
        required: true,
        label: "",
        placeholder: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({
      emailField: "test@example.com",
    });

    expect(result.success).toBe(true);
  });

  it("should fail if the email field contains an invalid email", () => {
    const form: FormSchema = [
      {
        id: "emailField",
        type: "email",
        isFieldType: true,
        required: true,
        label: "",
        placeholder: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({ emailField: "invalid-email" });

    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("Invalid email");
  });

  it("should pass if the URL field is valid", () => {
    const form: FormSchema = [
      {
        id: "urlField",
        type: "url",
        isFieldType: true,
        required: true,
        label: "",
        placeholder: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({
      urlField: "https://example.com",
    });

    expect(result.success).toBe(true);
  });

  it("should pass if the number field is within the specified range", () => {
    const form: FormSchema = [
      {
        id: "numberField",
        type: "number",
        isFieldType: true,
        required: true,
        min: 10,
        max: 100,
        label: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({ numberField: 50 });

    expect(result.success).toBe(true);
  });

  it("should fail if the number field is below the minimum value", () => {
    const form: FormSchema = [
      {
        id: "numberField",
        type: "number",
        isFieldType: true,
        required: true,
        min: 10,
        max: 100,
        label: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({ numberField: 5 });

    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("Must be at least 10");
  });

  it("should pass if the options field has a valid value", () => {
    const form: FormSchema = [
      {
        id: "optionsField",
        type: "options",
        isFieldType: true,
        required: true,
        options: [{ value: "option1" }, { value: "option2" }],
        label: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({ optionsField: "option1" });

    expect(result.success).toBe(true);
  });

  it("should fail if the checkbox field is not checked (required)", () => {
    const form: FormSchema = [
      {
        id: "checkboxField",
        type: "checkbox",
        isFieldType: true,
        required: true,
        label: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({ checkboxField: false });

    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("This field is required");
  });

  it("should pass if the checkbox field is checked (required)", () => {
    const form: FormSchema = [
      {
        id: "checkboxField",
        type: "checkbox",
        isFieldType: true,
        required: true,
        label: "",
        showDescription: false,
      },
    ];

    const validationSchema = createValidationSchema(form);
    const result = validationSchema.safeParse({ checkboxField: true });

    expect(result.success).toBe(true);
  });
});
