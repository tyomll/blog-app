import React from 'react';
import { faUserAlt, faMailBulk, faUsers, faSuperscript } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Card.module.scss';
import Loader from '../../../../components/Loader/Loader';

interface CardProps {
  index: number;
  dashboardData: any;
}
const Card: React.FC<CardProps> = ({ index, dashboardData }) => {
  const [currentContent, setCurrentContent] = React.useState<any>(null);
  const [cardContent, setCardContent] = React.useState<any>({
    user: {
      icon: faUserAlt,
      count: dashboardData?.users?.length,
      text: 'Registrated Users',
    },
    posts: {
      icon: faMailBulk,
      count: dashboardData?.posts?.length,
      text: 'Posts currently',
      bgColor: 'rgb(208, 242, 255)',
      color: 'rgb(4, 41, 122)',
    },
    todaysUsers: {
      icon: faUsers,
      count: dashboardData?.todaysUsers?.length,
      text: 'Registrated Users Today',
      bgColor: 'rgb(255, 247, 205)',
      color: 'rgb(122, 79, 1)',
    },
    todaysPosts: {
      icon: faSuperscript,
      count: dashboardData?.todaysPosts?.length,
      text: 'Posts Today',
      bgColor: 'rgb(255, 231, 217)',
      color: 'rgb(122, 12, 46)',
    },
  });

  function checkCurrentContent() {
    if (index === 0) {
      setCurrentContent(cardContent.user);
    } else if (index === 1) {
      setCurrentContent(cardContent.posts);
    } else if (index === 2) {
      setCurrentContent(cardContent.todaysUsers);
    } else {
      setCurrentContent(cardContent.todaysPosts);
    }
  }
  React.useEffect(() => {
    checkCurrentContent();
  }, [dashboardData]);

  if (!currentContent) {
    return <Loader />;
  }
  return (
    <div
      className={s.card}
      style={
        currentContent && { backgroundColor: currentContent.bgColor, color: currentContent.color }
      }>
      <div className={s.symbol} style={currentContent && { color: currentContent.color }}>
        <FontAwesomeIcon icon={currentContent?.icon} />
      </div>
      <h3>{currentContent?.count}</h3>
      <h6>{currentContent?.text}</h6>
    </div>
  );
};

export default Card;
