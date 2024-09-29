export type TagData = {
  key: number;
  label: string;
};

export type Blog = {
  _id: string;
  title: string;
  content: string;
  tags: TagData[];
  images: string[];
}