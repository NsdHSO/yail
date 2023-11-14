// ImageInput.stories.tsx
import { Meta, Story } from "@storybook/react";
import React from "react";

import ImageInput from "./ImageInput";
import { IImageInputProps } from "./types";

export default {
  title: "Components/ImageInput",
  component: ImageInput,
  argTypes: {
    onFileLoaded: { action: "File Loaded" },
    onChange: { action: "Changed" },
    onValidationError: { action: "Validation Error" }
  }
} as Meta;

const Template: Story<IImageInputProps> = args => <ImageInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  accept: "image/*",
  className: "",
  maxFileSize: 5000000,
  allowedMimeTypes: ["image/jpeg", "image/png"],
  compression: { enabled: false },
  hint: "Upload Image",
  label: "Select an image"
};

export const WithCompression = Template.bind({});
WithCompression.args = {
  ...Default.args,
  compression: { enabled: true, maxWidth: 800, quality: 0.8 }
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: "An error occurred"
};
