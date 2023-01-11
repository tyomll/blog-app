import { Card, Chip, Typography } from '@mui/joy';
import React from 'react';
import useDashboard from '../../../hooks/dashboard';
import { usePosts, useTodaysPosts } from '../../../hooks/posts';
import useUsers, { useTodaysUsers } from '../../../hooks/useUsers';
import s from './Dashboard.module.scss';

const Dashboard = () => {
  const dashboardData: any = useDashboard();

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.cards}>
          <Card
            variant="outlined"
            row
            sx={{
              width: 250,
              height: 170,
              gap: 3,
              '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}>
            <div>
              <Typography level="h1" fontSize="22px" id="card-description" mb={2}>
                Registrated Users
              </Typography>
              <Typography fontSize="17px" aria-describedby="card-description" mb={3}>
                {dashboardData?.users?.length} Users
              </Typography>
              <Chip variant="outlined" color="primary" size="md" sx={{ cursor: 'pointer' }}>
                Users count increased by 20%
              </Chip>
            </div>
          </Card>
          <Card
            variant="outlined"
            row
            sx={{
              width: 250,
              height: 170,
              gap: 3,
              '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}>
            <div>
              <Typography level="h1" fontSize="22px" id="card-description" mb={2}>
                Posts count
              </Typography>
              <Typography fontSize="17px" aria-describedby="card-description" mb={3}>
                {dashboardData?.posts?.length} Posts
              </Typography>
              <Chip variant="outlined" color="primary" size="md" sx={{ cursor: 'pointer' }}>
                Cool weather all day long
              </Chip>
            </div>
          </Card>
          <Card
            variant="outlined"
            row
            sx={{
              width: 250,
              height: 170,
              gap: 3,
              '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}>
            <div>
              <Typography level="h1" fontSize="20px" id="card-description" mb={2}>
                Registrated Users Today
              </Typography>
              <Typography fontSize="17px" aria-describedby="card-description" mb={3}>
                {dashboardData?.todaysUsers?.length} Users
              </Typography>
              <Chip variant="outlined" color="primary" size="md" sx={{ cursor: 'pointer' }}>
                Cool weather all day long
              </Chip>
            </div>
          </Card>
          <Card
            variant="outlined"
            row
            sx={{
              width: 250,
              height: 170,
              gap: 3,
              '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}>
            <div>
              <Typography level="h1" fontSize="22px" id="card-description" mb={2}>
                Posts Today
              </Typography>
              <Typography fontSize="17px" aria-describedby="card-description" mb={3}>
                {dashboardData?.todaysPosts?.length} Posts
              </Typography>
              <Chip variant="outlined" color="primary" size="md" sx={{ cursor: 'pointer' }}>
                Cool weather all day long
              </Chip>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
