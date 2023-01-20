import React from 'react';
import s from './Users.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faSearch,
  faSort,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import UserList from './UserList/UserList';
import { useDeleteUsers } from '../../../hooks/useUsers';
import HelmetTitle from '../../../components/HelmetTitle/HelmetTitle';

export interface SortBy {
  order: string;
  sortBy: string;
}

const Users: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [checkAll, setCheckAll] = React.useState<boolean>(false);
  const [checkedUsers, setCheckedUsers] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<SortBy>({
    order: 'asc',
    sortBy: 'username',
  });
  const { deleteMultipleUsers } = useDeleteUsers();

  return (
    <div className={s.root}>
      <HelmetTitle title="Users" />
      <div className={s.header}>
        <div>
          <h1>Users</h1>
        </div>
      </div>
      <div className={s.container}>
        <div className={s.content}>
          {checkedUsers.length > 0 && (
            <div className={s.contentHeaderSelected}>
              <div className={s.selected}>
                <h3>{checkedUsers.length} selected</h3>
              </div>
              <div
                className={s.deleteSelected}
                onClick={() => {
                  deleteMultipleUsers(checkedUsers);
                }}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            </div>
          )}
          {checkedUsers.length === 0 && (
            <div className={s.contentHeader}>
              <div className={s.search}>
                <FontAwesomeIcon icon={faSearch} />
                <input
                  type="text"
                  placeholder="Search user..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div
                className={s.filter}
                onClick={() => {
                  setSort({
                    ...sort,
                    order: 'asc',
                    sortBy: 'username',
                  });
                }}>
                <FontAwesomeIcon icon={faSort} />
              </div>
            </div>
          )}
          <div className={s.list}>
            <div className={s.listHeader}>
              <div className={s.checkbox}>
                <input
                  type="checkbox"
                  checked={checkAll}
                  onChange={() => {
                    if (!checkAll) {
                      setCheckAll(true);
                    } else {
                      setCheckAll(false);
                    }
                  }}
                />
              </div>
              <div className={s.username}>
                <span
                  onClick={() => {
                    setSort({
                      ...sort,
                      sortBy: 'username',
                      order: sort.order === 'asc' ? 'desc' : 'asc',
                    });
                  }}>
                  Name
                  {sort.sortBy === 'username' && (
                    <FontAwesomeIcon icon={sort.order === 'asc' ? faArrowUp : faArrowDown} />
                  )}
                </span>
              </div>
              <div className={s.email}>
                <span
                  onClick={() => {
                    setSort({
                      ...sort,
                      sortBy: 'email',
                      order: sort.order === 'asc' ? 'desc' : 'asc',
                    });
                  }}>
                  Email
                  {sort.sortBy === 'email' && (
                    <FontAwesomeIcon icon={sort.order === 'asc' ? faArrowUp : faArrowDown} />
                  )}
                </span>
              </div>
              <div className={s.date}>
                <span
                  onClick={() => {
                    setSort({
                      ...sort,
                      sortBy: 'createdAt',
                      order: sort.order === 'asc' ? 'desc' : 'asc',
                    });
                  }}>
                  Registration date
                  {sort.sortBy === 'createdAt' && (
                    <FontAwesomeIcon icon={sort.order === 'asc' ? faArrowUp : faArrowDown} />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={s.users}>
            <UserList
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
              checkAll={checkAll}
              setCheckAll={setCheckAll}
              searchValue={searchValue}
              sort={sort}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
