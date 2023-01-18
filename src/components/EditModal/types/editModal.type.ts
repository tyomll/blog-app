export interface EditModalProps {
  id: string;
  username?: string;
  email?: string;
  createdAt?: string;
  title?: string;
  category?: string;
  date?: any;
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}
export interface PostEditedDataType {
  title: string | undefined;
  category: string | undefined;
  date: any | undefined;
}
export interface UserEditedDataType {
  username: string | undefined;
  email: string | undefined;
  createdAt: any | undefined;
}