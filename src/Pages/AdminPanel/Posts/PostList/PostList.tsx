import React from 'react';
import { usePosts } from '../../../../hooks/posts';
import PostBlock from '../PostBlock/PostBlock';
import { SortBy } from '../Posts';

interface UserListProps {
  checkedPosts: string[];
  setCheckedPosts: (arg: string[]) => void;
  checkAll: boolean;
  setCheckAll: (arg: boolean) => void;
  searchValue: string;
  sort: SortBy;
}

const PostList: React.FC<UserListProps> = ({
  checkedPosts,
  setCheckedPosts,
  checkAll,
  setCheckAll,
  searchValue,
  sort,
}) => {
  const [posts, setPosts] = React.useState<any>([]);

  const { getPosts } = usePosts();

  async function fetchPosts() {
    await getPosts(setPosts);
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);

  React.useEffect(() => {
    if (checkAll) {
      setCheckedPosts(
        posts.map((post: any) => {
          return post.id;
        }),
      );
    } else {
      setCheckedPosts([]);
    }
  }, [checkAll]);

  React.useEffect(() => {
    if (checkedPosts.length === posts.length && posts.length > 0) {
      setCheckAll(true);
    }
  }, [checkedPosts]);

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
            function setCheckAll(arg: boolean): void {
              throw new Error('Function not implemented.');
            }

            return (
              <PostBlock
                key={post.id}
                {...post}
                checkedPosts={checkedPosts}
                setCheckedPosts={setCheckedPosts}
              />
            );
          })}
    </div>
  );
};

export default PostList;
