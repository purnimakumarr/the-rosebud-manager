import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Sector,
  Legend,
  Tooltip,
} from 'recharts';
import styled from 'styled-components';
import { device } from '../../styles/breakpoints';
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/DarkModeContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;
  min-width: 0;

  @media ${device.laptop} {
    grid-column: 1 / -1;
  }

  @media ${device.mobile} {
    padding: 2rem 1.6rem;
  }

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: '#8e2d46',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#c2456a',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#e77c97',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#f0a3b6',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#e8c45c',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#4fc9b4',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#2a8377',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#1d6b5f',
  },
];

const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    color: '#da5577',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#e77c97',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#f0a3b6',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#f6c2cd',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#f5db8a',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#8fe3d2',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#4fc9b4',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#2a8377',
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const CustomPieShape = (props) => {
  return <Sector {...props} fill={props.payload.color} />;
};

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  // On phones: smaller ring, legend underneath instead of beside it
  const isSmall = useMediaQuery(device.small);
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as='h2'>Stay Duration Summary</Heading>
      <ResponsiveContainer width={'100%'} height={isSmall ? 320 : 240}>
        <PieChart>
          <Pie
            data={data}
            nameKey='duration'
            dataKey='value'
            innerRadius={isSmall ? 60 : 85}
            outerRadius={isSmall ? 80 : 110}
            cx={isSmall ? '50%' : '40%'}
            cy={isSmall ? '40%' : '50%'}
            paddingAngle={3}
            shape={CustomPieShape}
          />
          <Tooltip />
          <Legend
            verticalAlign={isSmall ? 'bottom' : 'middle'}
            align={isSmall ? 'center' : 'right'}
            width={isSmall ? undefined : '30%'}
            layout={isSmall ? 'horizontal' : 'vertical'}
            iconSize={15}
            iconType='circle'
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
