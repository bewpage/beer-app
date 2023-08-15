import React from 'react';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import BeerList from './components/BeerList/BeerList';
import BillingInfo from './components/BillingInfo/BillingInfo';
import './App.css';

// add page configurator settings for app
export const pageSettings: {
  pageSize: number;
} = {
  pageSize: 15,
};

const App = () => {
  return (
    <div className="grid-layout-container">
      <GridLayout
        gap={{
          rows: 2,
          cols: 2,
        }}
        rows={[
          {
            height: 700,
          },
          {
            height: 800,
          },
        ]}
        cols={[
          {
            width: 300,
          },
          {
            width: 300,
          },
          {
            width: 300,
          },
        ]}>
        <GridLayoutItem row={1} col={1} colSpan={3}>
          <h2>Beer List</h2>
          <BeerList />
        </GridLayoutItem>
        <GridLayoutItem row={2} col={1} colSpan={0}>
          <h2>Billing Info</h2>
          <BillingInfo />
        </GridLayoutItem>
      </GridLayout>
    </div>
  );
};

export default App;
