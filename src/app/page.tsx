"use client";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";

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
import { Flex, Form, ImageUpload } from "@/lib/elements";

const FormPage = () => {
  const router = useRouter();
  const [tags, setTags] = useState<TagData[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // ~~~~~ TAGS: ADD & DELETE ~~~~~~
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

  // ~~~~~ IMAGES: ADD & DELETE ~~~~~~
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // ~~~~~ OPTION: convert to all form data before POST ~~~~~~
    // const tags_blob = new Blob([JSON.stringify(tags)]);
    // const images_blob = new Blob([JSON.stringify(images)]);

    // formData.append("tags", tags_blob);
    // formData.append("images", images_blob);
    // const response = await fetch("/api/blogs", {
    //   method: "POST",
    //   body: formData,
    // });

    // ~~~~~ OPTION: convert to all json before POST ~~~~~~
    const response = await fetch("/api/blogs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        content: formData.get("content"),
        tags: tags,
        images: images,
      }),
    });

    if (response.ok) {
      router.push("/blog");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <Flex
      flexDirection="column"
      margin={["4rem 3rem", "4rem 6rem"]}
      alignItems="center"
    >
      <Typography
        variant="h3"
        fontSize={["2rem", "2.5rem"]}
        textAlign="center"
        width={["263px", "416px", "auto"]}
      >
        Welcome! Add a new blog!
      </Typography>
      <Typography variant="body1" textAlign="center" width={["263px", "auto"]}>
        Example of a form connected to MongoDB
      </Typography>

      <Form method="POST" onSubmit={handleSubmit}>
        {/* Title */}
        <FormControl margin="normal" sx={{ width: "80vw", maxWidth: "500px" }}>
          <InputLabel htmlFor="title-input">Title</InputLabel>
          <OutlinedInput id="title-input" label="Name" name="title" />
        </FormControl>

        {/* Content */}
        <FormControl margin="normal" sx={{ width: "80vw", maxWidth: "500px" }}>
          <InputLabel htmlFor="content-input">Content</InputLabel>
          <OutlinedInput
            id="content-input"
            label="Content"
            name="content"
            multiline
            rows={4}
          />
        </FormControl>

        {/* Tags */}
        <FormControl margin="normal" sx={{ width: "80vw", maxWidth: "500px" }}>
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
        <FormControl margin="normal" sx={{ width: "80vw", maxWidth: "500px" }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ width: "fit-content" }}
          >
            Upload images
            <ImageUpload
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => uploadImages(e)}
              multiple
            />
          </Button>

          <Flex display="flex" flexDirection="column" alignItems="flex-start">
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
          </Flex>
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
    </Flex>
  );
};

export default FormPage;
