import React from 'react';
import useUsers from '../../../../hooks/useUsers';
import UserBlock from '../UserBlock/UserBlock';
import { SortBy } from '../Users';

interface UserListProps {
  searchValue: string;
  sort: SortBy;
}
const UserList: React.FC<UserListProps> = ({ searchValue, sort }) => {
  const [users, setUsers] = React.useState<any>();
  const { getUsers } = useUsers();

  React.useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <div>
      {users
        ?.sort((a: any, b: any) => {
          if (sort.sortBy !== '') {
            if (sort.order === 'asc') {
              return a[sort.sortBy].localeCompare(b[sort.sortBy]);
            } else {
              return b[sort.sortBy].localeCompare(a[sort.sortBy]);
            }
          }
        })
        .filter((user: any) => {
          return user.username.toLowerCase().includes(searchValue.toLowerCase());
        })
        .map((user: any) => {
          return <UserBlock key={user.id} {...user} />;
        })}
    </div>
  );
};

export default UserList;
