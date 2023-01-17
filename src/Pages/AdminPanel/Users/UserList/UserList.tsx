import React from 'react';
import useUsers from '../../../../hooks/useUsers';
import UserBlock from '../UserBlock/UserBlock';
import { SortBy } from '../Users';

interface UserListProps {
  checkedUsers: string[];
  setCheckedUsers: (arg: string[]) => void;
  checkAll: boolean;
  setCheckAll: (arg: boolean) => void;
  searchValue: string;
  sort: SortBy;
}
const UserList: React.FC<UserListProps> = ({
  checkedUsers,
  setCheckedUsers,
  checkAll,
  setCheckAll,
  searchValue,
  sort,
}) => {
  const [users, setUsers] = React.useState<any>();
  const { getUsers } = useUsers();

  React.useEffect(() => {
    getUsers(setUsers);
  }, []);

  React.useEffect(() => {
    if (checkAll) {
      setCheckedUsers(
        users.map((user: any) => {
          return user.id;
        }),
      );
    } else {
      setCheckedUsers([]);
    }
  }, [checkAll]);

  React.useEffect(() => {
    if (checkedUsers?.length === users?.length && users?.length > 0) {
      setCheckAll(true);
    }
  }, [checkedUsers]);

  return (
    <div>
      {users
        ?.sort((a: any, b: any) => {
          if (sort.sortBy !== '') {
            console.log(b);
            if (sort.order === 'asc') {
              // post date is number coming from back end, so i converting it to string
              return a[sort.sortBy].toString().localeCompare(b[sort.sortBy].toString());
            } else {
              // post date is number coming from back end, so i converting it to string
              return b[sort.sortBy].toString().localeCompare(a[sort.sortBy].toString());
            }
          }
        })
        .filter((user: any) => {
          return user.username.toLowerCase().includes(searchValue.toLowerCase());
        })
        .map((user: any) => {
          return (
            <UserBlock
              key={user.id}
              {...user}
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
            />
          );
        })}
    </div>
  );
};

export default UserList;
