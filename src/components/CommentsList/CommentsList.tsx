import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { useComments } from '../../hooks/comments';
import { SnackbarType } from '../../types/snackbar.type';
import Comment from '../Comment/Comment';

interface CommentsListType {
  postId: string;
  snackbar: SnackbarType;
  setSnackbar: (arg: SnackbarType) => void;
}
const CommentsList: React.FC<CommentsListType> = ({ postId, snackbar, setSnackbar }) => {
  const { comments, isLoading } = useComments(postId);

  if (isLoading) return <>Loading...</>;

  return (
    <>
      {comments &&
        comments.map((comment: DocumentData) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              snackbar={snackbar}
              setSnackbar={setSnackbar}
            />
          );
        })}
    </>
  );
};

export default CommentsList;
