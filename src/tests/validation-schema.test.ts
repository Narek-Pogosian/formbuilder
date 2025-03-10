import { createValidationSchema } from "../components/surveyrenderer/create-validation";
import { describe, it, expect } from "vitest";
import { type FormSchema } from "@/schemas/form-schema";

describe("createValidationSchema", () => {
  it("should create a schema for required text and textarea field", async () => {
    const survey: FormSchema = [
      {
        id: "id",
        type: "text",
        label: "username",
        placeholder: "",
        required: true,
        showDescription: false,
        longAnswer: false,
        isFieldSchema: true,
      },
      {
        id: "id",
        type: "text",
        label: "bio",
        placeholder: "",
        required: true,
        longAnswer: true,
        showDescription: false,
        isFieldSchema: true,
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("username");
    expect(schema.shape).toHaveProperty("bio");

    await expect(
      schema.parseAsync({ username: "", bio: "okay" }),
    ).rejects.toThrow();

    await expect(
      schema.parseAsync({ username: "okay", bio: "" }),
    ).rejects.toThrow();

    await expect(
      schema.parseAsync({ username: "valid", bio: "valid" }),
    ).resolves.not.toThrow();
  });

  it("should create a schema for optional text and number fields", async () => {
    const survey: FormSchema = [
      {
        id: "id1",
        type: "text",
        label: "nickname",
        required: false,
        placeholder: "",
        showDescription: false,
        longAnswer: false,
        isFieldSchema: true,
      },
      {
        id: "id2",
        type: "number",
        label: "age",
        required: false,
        showDescription: false,
        isFieldSchema: true,
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("nickname");
    expect(schema.shape).toHaveProperty("age");

    await expect(
      schema.parseAsync({ nickname: "", age: "" }),
    ).resolves.not.toThrow();

    await expect(
      schema.parseAsync({ nickname: undefined, age: undefined }),
    ).resolves.not.toThrow();

    await expect(
      schema.parseAsync({ nickname: "name", age: undefined }),
    ).resolves.not.toThrow();
  });

  it("should create a schema for a number field with min and max", async () => {
    const survey: FormSchema = [
      {
        id: "id",
        type: "number",
        label: "age",
        min: 18,
        max: 99,
        required: true,
        showDescription: false,
        isFieldSchema: true,
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("age");

    await expect(schema.parseAsync({ age: 17 })).rejects.toThrow(/at least 18/);
    await expect(schema.parseAsync({ age: 100 })).rejects.toThrow(/at most 99/);
    await expect(schema.parseAsync({ age: 50 })).resolves.not.toThrow();
  });

  it("should create a schema for a checkbox that passes", async () => {
    const survey: FormSchema = [
      {
        id: "id",
        type: "checkbox",
        label: "consent",
        required: false,
        showDescription: false,
        isFieldSchema: true,
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("consent");

    await expect(schema.parseAsync({ consent: true })).resolves.not.toThrow();
    await expect(schema.parseAsync({ consent: false })).resolves.not.toThrow();
  });

  it("should create a schema for 2 radio groups where one is required and checks different inputs", async () => {
    const survey: FormSchema = [
      {
        id: "id",
        type: "options",
        label: "radio1",
        required: false,
        showDescription: false,
        options: [
          { value: "option1" },
          { value: "option2" },
          { value: "option3" },
        ],
        isFieldSchema: true,
      },
      {
        id: "id",
        type: "options",
        label: "radio2",
        required: true,
        showDescription: false,
        options: [
          { value: "option1" },
          { value: "option2" },
          { value: "option3" },
        ],
        isFieldSchema: true,
      },
    ];

    const schema = createValidationSchema(survey);

    expect(schema.shape).toHaveProperty("radio1");
    expect(schema.shape).toHaveProperty("radio2");

    await expect(
      schema.parseAsync({ radio1: undefined, radio2: "option1" }),
    ).resolves.not.toThrow();
    await expect(
      schema.parseAsync({ radio1: "option1", radio2: undefined }),
    ).rejects.toThrow(/Required/);
    await expect(
      schema.parseAsync({ radio1: "invalid option", radio2: undefined }),
    ).rejects.toThrow(/Invalid option/);
  });

  it("should throw an error for unsupported field type", () => {
    const survey = [
      {
        id: "id",
        type: "unsupported",
        label: "unsupportedField",
        isFieldSchema: true,
        required: true,
      },
      {
        id: "id",
        type: "number",
        label: "age",
        min: 18,
        max: 99,
        required: true,
        isFieldSchema: true,
      },
    ];

    // @ts-expect-error We are testing a wrong input
    expect(() => createValidationSchema(survey)).toThrow(
      /Unsupported field type/,
    );
  });
});
