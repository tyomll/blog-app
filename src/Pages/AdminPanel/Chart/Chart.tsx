import React from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ResponsiveLine } from '@nivo/line';
import { uuidv4 } from '@firebase/util';

const Chart: React.FC = () => {
  const [data, setData] = React.useState<any>([]);

  const fetchData = async () => {
    const ref = collection(db, 'posts');
    const docs: any = await getDocs(ref);
    const dataa = docs.docs.map((doc: any) => ({ ...(doc.data() as Record<string, unknown>) }));
    let postsPerDay: any = {};

    dataa.forEach((doc: any) => {
      const postDate = new Date(doc.date);
      const date = postDate.toISOString().slice(0, 10);
      if (postsPerDay[date]) {
        postsPerDay[date] += 1;
      } else {
        postsPerDay[date] = 1;
      }
    });
    setData([
      {
        id: 'Total Posts',
        color: 'hsl(5, 70%, 50%)',
        data: Object.entries(postsPerDay).map(([x, y]) => ({ x, y })),
      },
    ]);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (data.data === null) {
    return <>loading...</>;
  }
  return (
    <div style={{ height: '400px', minWidth: '0' }}>
      <ResponsiveLine
        data={data}
        pointLabel={'dsadasdasdasd'}
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
