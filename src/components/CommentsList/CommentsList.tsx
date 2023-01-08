import React from 'react';
import { useComments } from '../../hooks/comments';
import Comment from '../Comment/Comment';

interface CommentsListType {
  postId: string;
  showSnackbar: (arg: boolean) => void;
  setSnackbarText: (arg: string) => void;
}
const CommentsList: React.FC<CommentsListType> = ({ postId, showSnackbar, setSnackbarText }) => {
  const { comments, isLoading } = useComments(postId);

  if (isLoading) return <>Loading...</>;

  return (
    <>
      {comments &&
        comments.map((comment: any) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              showSnackbar={showSnackbar}
              setSnackbarText={setSnackbarText}
            />
          );
        })}
    </>
  );
};

export default CommentsList;
