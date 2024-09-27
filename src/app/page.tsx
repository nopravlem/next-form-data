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

const FormPage = () => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTagInput(e.target.value);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && tagInput) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const addTag = (tag_value: string) => {
    setTags([...tags, { key: tags.length, label: tag_value }]);
    setTagInput("");
  };

  const removeTag = (tag_data: TagData) => () => {
    setTags((tags) => tags.filter((tag) => tag_data.key !== tag.key));
  };

  const uploadImages = (e: ChangeEvent<HTMLInputElement>) => {
    const new_images = e.target.files;
    if (!new_images) return;

    const image_srcs: string[] = [];
    Array.from(new_images).map((img: File) => {
      if (img.type.includes("image")) image_srcs.push(img.name);
    });
    setImages([...images, ...image_srcs]);
  };

  const removeImage = (img_src: string) => () => {
    setImages((images) => images.filter((img) => img != img_src));
  };

  return (
    <Box display="flex" flexDirection="column" margin="4rem 6rem">
      <Typography variant="h3" fontSize="2.5rem" textAlign="center">
        Welcome to an Example Form!
      </Typography>
      <Form>
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
            <ImageUpload
              type="file"
              onChange={(e) => uploadImages(e)}
              multiple
            />
          </Button>

          <Box display="flex" flexDirection="column" alignItems="flex-start">
            {images.map((img_src, idx) => (
              <Chip
                key={idx}
                label={img_src}
                onDelete={removeImage(img_src)}
                sx={{ marginTop: "0.5rem" }}
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
    </Box>
  );
};

export default FormPage;
