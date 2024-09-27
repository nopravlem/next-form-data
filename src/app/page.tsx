"use client";
import { useState } from "react";

import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

import { TagData } from "@/lib/types";
import { Form } from "@/lib/elements";

const FormPage = () => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const addTag = (tag_value: string) => {
    setTags([...tags, { key: tags.length, label: tag_value }]);
    setInputValue("");
  };

  const removeTag = (tag_data: TagData) => () => {
    setTags((tags) => tags.filter((tag) => tag_data.key !== tag.key));
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
            value={inputValue}
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
          <InputLabel htmlFor="img-upload">Images</InputLabel>
          <OutlinedInput id="img-upload" label="Images" />
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
