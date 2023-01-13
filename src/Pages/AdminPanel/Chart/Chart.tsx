import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import useChartData from '../../../hooks/useChartData';

interface Data {
  color: string;
  data: Array<{
    x: string;
    y: number;
  }>;
  id: string;
}
interface useChartDataReturn {
  getPostsData: () => Promise<void>;
  getUsersData: () => Promise<void>;
}

const Chart: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const { getPostsData, getUsersData }: useChartDataReturn = useChartData(setData);

  const fetchData = async () => {
    await getPostsData();
    await getUsersData();
  };

  React.useEffect(() => {
    if (!data[0]) {
      fetchData();
    }
  }, []);

  if (!data[0]) {
    return <>loading...</>;
  }

  return (
    <div style={{ height: '400px', minWidth: '0' }}>
      <ResponsiveLine
        data={data}
        tooltip={({ point }: any) => {
          return (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
              }}>
              <div>Date: {point.data.x}</div>
              <div>Count: {point.data.y}</div>
            </div>
          );
        }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisLeft={{
          legendOffset: -30,
          legend: 'Count',
          format: (e) => Math.floor(e) === e && e,
          legendPosition: 'middle',
        }}
        axisBottom={{
          legendOffset: 20,
          legend: 'Date',
          legendPosition: 'middle',
        }}
        yFormat=" >-.2c"
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Chart;
