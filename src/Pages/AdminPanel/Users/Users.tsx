import React from 'react';
import s from './Users.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faPlus,
  faSearch,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import UserList from './UserList/UserList';

export interface SortBy {
  order: string;
  sortBy: string;
}
const Users: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [sort, setSort] = React.useState<SortBy>({
    order: '',
    sortBy: '',
  });
  console.log(sort);
  return (
    <div className={s.root}>
      <div className={s.header}>
        <div>
          <h1>Users</h1>
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={faPlus} />
            <span>New user</span>
          </button>
        </div>
      </div>
      <div className={s.container}>
        <div className={s.content}>
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
            <div className={s.filter}>
              <FontAwesomeIcon icon={faSort} />
            </div>
          </div>
          <div className={s.list}>
            <div className={s.listHeader}>
              <div className={s.checkbox}>
                <input type="checkbox" />
              </div>
              <div className={s.username}>
                <span
                  onClick={() => {
                    setSort({ ...sort, sortBy: 'username' });
                    if (sort.order === 'asc') {
                      setSort({ ...sort, order: 'desc' });
                    } else {
                      setSort({ ...sort, order: 'asc' });
                    }
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
                    setSort({ ...sort, sortBy: 'email' });
                    if (sort.order === 'asc') {
                      setSort({ ...sort, order: 'desc' });
                    } else {
                      setSort({ ...sort, order: 'asc' });
                    }
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
                    setSort({ ...sort, sortBy: 'createdAt' });

                    if (sort.sortBy === 'asc') {
                      setSort({ ...sort, order: 'desc' });
                    } else {
                      setSort({ ...sort, order: 'asc' });
                    }
                  }}>
                  Registration date
                  {sort.sortBy === 'date' && (
                    <FontAwesomeIcon icon={sort.order === 'asc' ? faArrowUp : faArrowDown} />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={s.users}>
            <UserList searchValue={searchValue} sort={sort} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
