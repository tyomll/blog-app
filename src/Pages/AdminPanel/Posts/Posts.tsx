import React from 'react';
import s from './Posts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faPlus,
  faSearch,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import PostList from './PostList/PostList';

export interface SortBy {
  order: string;
  sortBy: string;
}
const Posts: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [sort, setSort] = React.useState<SortBy>({
    order: 'asc',
    sortBy: 'title',
  });

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div>
          <h1>Posts</h1>
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={faPlus} />
            <span>New post</span>
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
                placeholder="Search post..."
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
                  sortBy: 'title',
                });
              }}>
              <FontAwesomeIcon icon={faSort} />
            </div>
          </div>
          <div className={s.list}>
            <div className={s.listHeader}>
              <div className={s.checkbox}>
                <input type="checkbox" />
              </div>
              <div className={s.title}>
                <span
                  onClick={() => {
                    setSort({
                      ...sort,
                      sortBy: 'title',
                      order: sort.order === 'asc' ? 'desc' : 'asc',
                    });
                  }}>
                  Title
                  {sort.sortBy === 'title' && (
                    <FontAwesomeIcon icon={sort.order === 'asc' ? faArrowUp : faArrowDown} />
                  )}
                </span>
              </div>
              <div className={s.author}>
                <span
                  onClick={() => {
                    setSort({
                      ...sort,
                      sortBy: 'author',
                      order: sort.order === 'asc' ? 'desc' : 'asc',
                    });
                  }}>
                  Author
                  {sort.sortBy === 'author' && (
                    <FontAwesomeIcon icon={sort.order === 'asc' ? faArrowUp : faArrowDown} />
                  )}
                </span>
              </div>
              <div className={s.category}>
                <span
                  onClick={() => {
                    setSort({
                      ...sort,
                      sortBy: 'category',
                      order: sort.order === 'asc' ? 'desc' : 'asc',
                    });
                  }}>
                  Category
                  {sort.sortBy === 'category' && (
                    <FontAwesomeIcon icon={sort.order === 'asc' ? faArrowUp : faArrowDown} />
                  )}
                </span>
              </div>
              <div className={s.date}>
                <span
                  onClick={() => {
                    setSort({
                      ...sort,
                      sortBy: 'date',
                      order: sort.order === 'asc' ? 'desc' : 'asc',
                    });
                  }}>
                  Post date
                  {sort.sortBy === 'date' && (
                    <FontAwesomeIcon icon={sort.order === 'asc' ? faArrowUp : faArrowDown} />
                  )}
                </span>
              </div>
              <div className={s.divdier}></div>
            </div>
          </div>
          <div className={s.posts}>
            <PostList searchValue={searchValue} sort={sort} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
