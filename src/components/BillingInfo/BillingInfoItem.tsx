import React from 'react';
import { Member } from './findMambersToBill';

type BillingInfoProps = {
  billable: Member[];
  dependents: Map<number, Member[]>;
};

const BillingInfoItem: React.FC<BillingInfoProps> = ({
  billable,
  dependents,
}) => {
  return (
    <div>
      <h3>Billable Members</h3>
      <ul>
        {billable.map(member => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>

      <h3>Dependents</h3>
      {[...dependents.entries()].map(([parentId, children]) => (
        <div key={parentId}>
          <strong>
            {billable.find(m => m.id === parentId)!.name}'s dependents:
          </strong>
          <ul>
            {children.map(child => (
              <li key={child.id}>{child.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BillingInfoItem;
