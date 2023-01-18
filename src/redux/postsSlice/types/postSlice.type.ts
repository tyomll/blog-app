import { PostType } from "../../../types/post.type";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PostsSliceStateType {
  items: PostType[];
  status: Status;
  category: string;
}