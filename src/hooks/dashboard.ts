import { usePosts, useTodaysPosts } from './posts';
import React from 'react'
import useUsers, { useTodaysUsers } from './useUsers';

const useDashboard = () => {
  const [users, setUsers] = React.useState<any>(null);
  const [posts, setPosts] = React.useState<any>(null);
  const [todaysPosts, setTodaysPosts] = React.useState<any>(null);
  const [todaysUsers, setTodaysUsers] = React.useState<any>(null);
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