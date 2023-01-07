import React from 'react';
import { useComments } from '../../hooks/comments';
import Comment from '../Comment/Comment';

interface CommentsListType {
  postId: string;
}
const CommentsList: React.FC<CommentsListType> = ({ postId }) => {
  const { comments, isLoading } = useComments(postId);
  return (
    <>
      {comments &&
        comments.map((comment: any) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
    </>
  );
};

export default CommentsList;
