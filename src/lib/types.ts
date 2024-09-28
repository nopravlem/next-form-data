export type TagData = {
  key: number;
  label: string;
};

export type Campaign = {
  name: string;
  description: string;
  tags: TagData[];
  images: string[];
}