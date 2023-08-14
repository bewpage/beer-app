import React, { useState } from 'react';
import BillingInfoItem from './BillingInfoItem';
import { findMembersToBill, Member } from './findMambersToBill';
import { Button } from '@progress/kendo-react-buttons';
import data from '../../donneesTest.json';
import './BillingInfo.css';

const BillingInfo = () => {
  const [billingInfo, setBillingInfo] = useState<{
    billable: Member[];
    dependents: Map<number, Member[]>;
    circularReferences: Set<number>;
  } | null>(null);

  const handleShowBilling = () => {
    const result = findMembersToBill(data);
    setBillingInfo(result);
  };
  return (
    <div>
      <Button onClick={handleShowBilling}>Show Billing Info</Button>
      {billingInfo && (
        <div>
          <BillingInfoItem
            billable={billingInfo.billable}
            dependents={billingInfo.dependents}
          />

          {billingInfo.circularReferences.size > 0 && (
            <div>
              <h3>Circular References Detected</h3>
              <p>
                Members with IDs:{' '}
                {[...billingInfo.circularReferences].join(', ')} have circular
                references.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillingInfo;
