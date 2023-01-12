import React from 'react';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { getUserAvatar } from '../../../utils/userProfileFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUser, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import s from './Sidebar.module.scss';

const pages: any = [
  { title: 'dashboard', icon: faChartLine },
  { title: 'users', icon: faUser },
  { title: 'posts', icon: faMailBulk },
];

interface SidebarProps {
  pageIndex: number;
  setPageIndex: (arg: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ pageIndex, setPageIndex }) => {
  const currentUser = useAppSelector((state) => state.user);
  const [currentUserAvatar, setCurrentUserAvatar] = React.useState<string>('');

  React.useEffect(() => {
    if (currentUser.id !== null) {
      getUserAvatar(currentUser.id, setCurrentUserAvatar);
    }
  }, [currentUser]);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.logo}>
          <img
            src="https://snipstock.com/assets/cdn/png/3c72cc4f90c92b2afcab3c2a09195406.png"
            alt="logo"
          />
        </div>
        <div className={s.user}>
          <div className={s.userAvatar}>
            <img src={currentUserAvatar!} alt="avatar" />
          </div>
          <div className={s.username}>
            <h6>{currentUser.username}</h6>
          </div>
        </div>
        <div className={s.pages}>
          <ul className={s.pagesContainer}>
            {pages.map((page: any, i: number) => {
              return (
                <div
                  key={i}
                  className={s.page}
                  style={{
                    backgroundColor: pageIndex === i ? 'rgba(145, 158, 171, 0.16)' : '',
                  }}
                  onClick={() => setPageIndex(i)}>
                  <div className={s.pageIcon}>
                    <FontAwesomeIcon icon={page.icon} />
                  </div>
                  <span>{page.title}</span>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
