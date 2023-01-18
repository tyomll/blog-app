export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type BlogCommentsType = {
  id: string;
  author: string;
  text: string;
};

export type BlogByIdSliceType = {
  id: string;
  author: { name: string; id: string };
  title: string;
  text: string;
  image: string;
  category: string;
  date: string | number | Date;

};

export interface BlogByIdSliceState {
  item: BlogByIdSliceType;
  status: Status;
}