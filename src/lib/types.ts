export type TagData = {
  key: number;
  label: string;
};

export type Blog = {
  title: string;
  content: string;
  tags: TagData[];
  images: string[];
}