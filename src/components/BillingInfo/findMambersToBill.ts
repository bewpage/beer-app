export type Member = {
  id: number;
  name: string;
  linkId: number | null;
};

export const findMembersToBill = (
  members: Member[]
): {
  billable: Member[];
  dependents: Map<number, Member[]>;
  circularReferences: Set<number>;
} => {
  // Filtering out members to create a list of parents and children based on linkId.
  const parents: Member[] = members.filter(m => m.linkId === null);
  const children: Member[] = members.filter(m => m.linkId !== null);

  // Sets to keep track of seen members and to detect circular references.
  const seen: Set<number> = new Set();
  const circularRefs: Set<number> = new Set();

  // Iterate over children to check for circular references.
  children.forEach(child => {
    let current: Member | null = child;
    while (current && current.linkId !== null) {
      // If we have seen this member before, it's a circular reference.
      if (seen.has(current.id)) {
        circularRefs.add(current.id);
        break;
      }
      seen.add(current.id);
      current = members.find(m => m.id === current?.linkId) || null;
    }
  });

  // A member is billable if it's a parent or if it's a child that isn't linked by any other member.
  const billable = parents.concat(
    children.filter(child => !members.some(m => m.linkId === child.id))
  );

  // Mapping parents to their dependents
  const dependents: Map<number, Member[]> = new Map();
  parents.forEach(parent => {
    dependents.set(
      parent.id,
      children.filter(child => child.linkId === parent.id)
    );
  });

  return { billable, dependents, circularReferences: circularRefs };
};
