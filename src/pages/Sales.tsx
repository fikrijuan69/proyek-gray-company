import React from 'react';
import InsentiveHistory from '../components/InsentiveHistory';


export interface IncentiveData {
  id: number;
  nik: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  customer: string;
  dmsTarget: number;
  arPaidTarget: number;
  unitName: string;
  points: number;
  valuePerPoint: number;
  totalIncentive: number;
}

const Sales: React.FC = () => {

  return (
    <div className=" bg-gray-100">
      <InsentiveHistory/>
    </div>
  );
};

export default Sales;
