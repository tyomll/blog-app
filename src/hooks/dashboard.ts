import { usePosts, useTodaysPosts } from './posts';
import React from 'react'
import useUsers, { useTodaysUsers } from './useUsers';
import { PostType } from '../types/post.type';
import { UserType } from '../types/user.type';

const useDashboard = () => {
  const [users, setUsers] = React.useState<UserType[] | null>(null);
  const [posts, setPosts] = React.useState<PostType[] | null>(null);
  const [todaysPosts, setTodaysPosts] = React.useState<PostType[] | null>(null);
  const [todaysUsers, setTodaysUsers] = React.useState<UserType[] | null>(null);
  const { getUsers } = useUsers();
  const { getPosts } = usePosts();
  const { getTodaysPosts } = useTodaysPosts();
  const { getTodaysUsers } = useTodaysUsers();

  React.useEffect(() => {
    getUsers(setUsers)
    getPosts(setPosts)
    getTodaysPosts(setTodaysPosts)
    getTodaysUsers(setTodaysUsers)
  }, [])

  if (users && posts && todaysPosts && todaysUsers) {
    return { users, posts, todaysPosts, todaysUsers }
  }
}
export default useDashboard