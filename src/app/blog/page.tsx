"use client";
import { Flex } from "@/lib/elements";
import { Blog } from "@/lib/types";
import theme from "@/theme";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    handleGetBlogs();
  }, []);

  const handleGetBlogs = async () => {
    const response = await fetch("/api/blogs/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const db_blogs = await response.json();
      setBlogs(db_blogs as Blog[]);
    } else {
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/blogs/?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setBlogs(blogs.filter((blog) => blog._id != id));
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <Flex flexDirection="column" margin="4rem 3rem" alignItems="center">
      <Typography variant="h3" fontSize="2.5rem" textAlign="center">
        All Blogs
      </Typography>

      <Flex
        flexDirection="column"
        width="90vw"
        maxWidth="500px"
        marginTop="2rem"
      >
        {blogs.map((blog, idx) => (
          <Flex
            key={idx}
            border="2px solid black"
            borderColor={theme.palette.primary.main}
            borderRadius="4px"
            padding="1rem"
            marginBottom="1rem"
            flexDirection="column"
            position="relative"
          >
            <IconButton
              onClick={() => handleDelete(blog._id)}
              style={{ position: "absolute", top: "0.25rem", right: "0.5rem" }}
            >
              <CloseIcon />
            </IconButton>
            <Flex>
              <Typography variant="body1">Title:</Typography>
              <Typography variant="body1" marginLeft="0.25rem" fontWeight={500}>
                {blog.title}
              </Typography>
            </Flex>

            <Flex>
              <Typography variant="body1">Content:</Typography>
              <Typography variant="body1" marginLeft="0.25rem" fontWeight={500}>
                {blog.content}
              </Typography>
            </Flex>

            <Flex
              flexDirection="column"
              alignItems="flex-start"
              marginTop="0.5rem"
            >
              <Typography variant="body1">Tags:</Typography>
              <Box marginLeft="0.25rem">
                {blog.tags.map((tag) => (
                  <Chip
                    key={tag.key}
                    color="primary"
                    label={tag.label}
                    sx={{ marginRight: "0.5rem" }}
                  />
                ))}
              </Box>
            </Flex>

            <Flex
              flexDirection="column"
              alignItems="flex-start"
              marginTop="0.5rem"
            >
              <Typography variant="body1">Images:</Typography>
              <Flex marginLeft="0.25rem" flexDirection="column">
                {blog.images.map((img_src, idx) => (
                  <Chip
                    key={idx}
                    label={img_src}
                    sx={{
                      marginBottom: "0.5rem",
                      borderRadius: "4px",
                      padding: "0.5rem",
                    }}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Link href="/">
        <Button variant="outlined" sx={{ width: "300px" }}>
          Add another blog!
        </Button>
      </Link>
    </Flex>
  );
};

export default BlogList;
