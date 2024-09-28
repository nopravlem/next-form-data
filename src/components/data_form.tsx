"use client";
import { ChangeEvent, KeyboardEvent, useState } from "react";

import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { TagData } from "@/lib/types";
import { Form, ImageUpload } from "@/lib/elements";
type DataFormProps = {
  tagInput: string;
  images: string[];
  tags: TagData[];
  uploadImages: (x: any) => void;
  removeTag: (x: any) => () => void;
  removeImage: (x: string) => () => void;
  handleInputChange: (e: any) => void;
  handleKeyDown: (e: any) => void;
};

const DataForm = ({
  tags,
  tagInput,
  handleInputChange,
  handleKeyDown,
  removeTag,
  images,
  uploadImages,
  removeImage,
}: DataFormProps) => {
  return (
    <Form method="POST">
      {/* Name */}
      <FormControl margin="normal" sx={{ width: "500px" }}>
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <OutlinedInput id="name-input" label="Name" />
      </FormControl>

      {/* Description */}
      <FormControl margin="normal" sx={{ width: "500px" }}>
        <InputLabel htmlFor="description-input">Description</InputLabel>
        <OutlinedInput
          id="description-input"
          label="Description"
          multiline
          rows={4}
        />
      </FormControl>

      {/* Tags */}
      <FormControl margin="normal" sx={{ width: "500px" }}>
        <InputLabel htmlFor="tag-input">Tags</InputLabel>
        <OutlinedInput
          id="tag-input"
          label="Tags"
          value={tagInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Box>
          {tags.map((tag) => (
            <Chip
              key={tag.key}
              color="primary"
              label={tag.label}
              onDelete={removeTag(tag)}
              sx={{ marginTop: "1rem", marginRight: "0.5rem" }}
            />
          ))}
        </Box>
      </FormControl>

      {/* Image Upload */}
      <FormControl margin="normal" sx={{ width: "500px" }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ width: "fit-content" }}
        >
          Upload files
          <ImageUpload type="file" onChange={(e) => uploadImages(e)} multiple />
        </Button>

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {images.map((img_src, idx) => (
            <Chip
              key={idx}
              label={img_src}
              onDelete={removeImage(img_src)}
              sx={{
                marginTop: "0.5rem",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            />
          ))}
        </Box>
      </FormControl>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="outlined"
        sx={{ marginTop: "2rem", borderRadius: "50px" }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default DataForm;
