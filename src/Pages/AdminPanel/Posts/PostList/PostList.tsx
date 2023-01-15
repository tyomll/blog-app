import React from 'react';
import { usePosts } from '../../../../hooks/posts';
import PostBlock from '../PostBlock/PostBlock';
import { SortBy } from '../Posts';

interface UserListProps {
  searchValue: string;
  sort: SortBy;
}

const PostList: React.FC<UserListProps> = ({ searchValue, sort }) => {
  const [posts, setPosts] = React.useState<any>([]);
  const { getPosts } = usePosts();

  async function fetchPosts() {
    await getPosts(setPosts);
  }
  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts &&
        posts
          .sort((a: any, b: any) => {
            if (sort.sortBy !== '') {
              if (sort.order === 'asc') {
                // author is an object so i have to access to name to sort
                if (sort.sortBy === 'author') {
                  return a.author.name.localeCompare(b.author.name);
                }
                // post date is number coming from back end, so i converting it to string
                return a[sort.sortBy].toString().localeCompare(b[sort.sortBy].toString());
              } else {
                // author is an object so i have to access to name to sort
                if (sort.sortBy === 'author') {
                  return b.author.name.localeCompare(a.author.name);
                }
                // post date is number coming from back end, so i converting it to string
                return b[sort.sortBy].toString().localeCompare(a[sort.sortBy].toString());
              }
            }
          })
          .filter((post: any) => {
            return post.title.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((post: any) => {
            return <PostBlock key={post.id} {...post} />;
          })}
    </div>
  );
};

export default PostList;
