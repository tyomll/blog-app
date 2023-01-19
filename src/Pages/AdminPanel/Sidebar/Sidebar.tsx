import React from 'react';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { getUserAvatar } from '../../../utils/userProfileFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUser, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import s from './Sidebar.module.scss';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import logoHorizontal from '../../../images/logo-horizontal.png';
import { Link } from 'react-router-dom';

interface PagesType {
  title: string;
  icon: IconDefinition;
}
const pages: PagesType[] = [
  { title: 'dashboard', icon: faChartLine },
  { title: 'users', icon: faUser },
  { title: 'posts', icon: faMailBulk },
];

interface SidebarProps {
  page: string;
  setPage: (arg: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ page, setPage }) => {
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
          <Link to="/admin">
            <img src={logoHorizontal} alt="logo" />
          </Link>
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
            {pages.map((pagee: PagesType, i: number) => {
              return (
                <Link to={`${pagee.title}`} key={i} className={s.pageWrapper}>
                  <div
                    className={s.page}
                    style={{
                      backgroundColor: page === pagee.title ? 'rgba(145, 158, 171, 0.16)' : '',
                    }}
                    onClick={() => setPage(pagee.title)}>
                    <div className={s.pageIcon}>
                      <FontAwesomeIcon icon={pagee.icon} />
                    </div>
                    <span>{pagee.title}</span>
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
