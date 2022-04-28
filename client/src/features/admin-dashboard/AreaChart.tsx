import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AreaChartRender: React.FC<any> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 50,
        }}
      >
        <defs>
          <linearGradient id="polygon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8F76FA" stopOpacity={1} />
            <stop offset="95%" stopColor="#8F76FA" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="ethereum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFC04E" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFC04E" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="bsc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EC5956" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#EC5956" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="others" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6B6B6B" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6B6B6B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="polygon"
          stroke="#8F76FA"
          fillOpacity={0.3}
          activeDot={{ r: 6 }}
          fill="url(#polygon)"
          strokeWidth={4}
        />
        <Area
          type="monotone"
          dataKey="ethereum"
          stroke="#FFC04E"
          fillOpacity={0.3}
          activeDot={{ r: 6 }}
          fill="url(#bsc)"
          strokeWidth={0.7}
        />
        <Area
          type="monotone"
          dataKey="bsc"
          stroke="#EC5956"
          fillOpacity={0.3}
          activeDot={{ r: 6 }}
          fill="url(#colorUv)"
          strokeWidth={0.5}
        />
        <Area
          type="monotone"
          dataKey="others"
          stroke="#6B6B6B"
          fillOpacity={0.3}
          activeDot={{ r: 6 }}
          fill="url(#others)"
          strokeWidth={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartRender;
