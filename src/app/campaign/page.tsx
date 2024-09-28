"use client";
import { Flex } from "@/lib/elements";
import { Campaign } from "@/lib/types";
import theme from "@/theme";
import { Box, Button, Chip, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const ListCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  useEffect(() => {
    handleGetCampaigns();
  }, []);

  const handleGetCampaigns = async () => {
    const response = await fetch("/api/campaigns/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      let db_campaigns = await response.json();
      setCampaigns(
        db_campaigns.map((campaign: any) => {
          return {
            name: campaign.name,
            description: campaign.description,
            tags: campaign.tags,
            images: campaign.images,
          };
        })
      );
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <Flex flexDirection="column" margin="4rem 6rem" alignItems="center">
      <Typography variant="h3" fontSize="2.5rem" textAlign="center">
        Campaigns List
      </Typography>

      <Flex flexDirection="column" width="500px" marginTop="2rem">
        {campaigns.map((camp, idx) => (
          <Flex
            key={idx}
            border="2px solid black"
            borderColor={theme.palette.primary.main}
            borderRadius="4px"
            padding="1rem"
            marginBottom="1rem"
            flexDirection="column"
          >
            <Flex>
              <Typography variant="body1">Name:</Typography>
              <Typography variant="body1" marginLeft="0.25rem" fontWeight={500}>
                {camp.name}
              </Typography>
            </Flex>

            <Flex>
              <Typography variant="body1">Description:</Typography>
              <Typography variant="body1" marginLeft="0.25rem" fontWeight={500}>
                {camp.description}
              </Typography>
            </Flex>

            <Flex
              flexDirection="column"
              alignItems="flex-start"
              marginTop="0.5rem"
            >
              <Typography variant="body1">Tags:</Typography>
              <Box marginLeft="0.25rem">
                {camp.tags.map((tag) => (
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
                {camp.images.map((img_src, idx) => (
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
        <Button variant="outlined">Add another campaign!</Button>
      </Link>
    </Flex>
  );
};

export default ListCampaigns;
