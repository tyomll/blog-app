export interface PostType {
  id: string;
  author: {
    name: string;
    id: string
  };
  title: string;
  text: string;
  image: string;
  category: string;
  date: number | Date;
};