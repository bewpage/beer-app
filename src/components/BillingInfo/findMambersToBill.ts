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
  // Set to detect circular references.
  const circularRefs: Set<number> = new Set();

  const getNextMember = (currentLinkId: number | null) => {
    return members.find(m => m.id === currentLinkId) || null;
  };

  // Iterate over children to check for circular references.
  children.forEach(child => {
    let current: Member | null = child;
    const currentPath: Set<number> = new Set(); // To keep track of members in the current traversal

    while (current && current.linkId !== null) {
      // If we have seen this member in the current path before, it's a circular reference.
      if (currentPath.has(current.id)) {
        circularRefs.add(current.id);
        break;
      }
      currentPath.add(current.id);
      current = getNextMember(current?.linkId);
    }
  });

  // Only parents without a linkId are billable.
  const billable = parents.filter(parent => !circularRefs.has(parent.id));

  // Mapping parents to their dependents
  const dependents: Map<number, Member[]> = new Map();
  parents.forEach(parent => {
    if (!circularRefs.has(parent.id)) {
      // Don't map dependents for parents in a circular reference
      dependents.set(
        parent.id,
        children.filter(child => child.linkId === parent.id)
      );
    }
  });

  return { billable, dependents, circularReferences: circularRefs };
};
