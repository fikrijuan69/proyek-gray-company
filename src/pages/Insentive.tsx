import React from 'react';
import MonthlyInsentive from '../components/MonthlyInsentive';


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

const Insentive: React.FC = () => {

  return (
    <div className=" bg-gray-100">
      <MonthlyInsentive/>
    </div>
  );
};

export default Insentive;
