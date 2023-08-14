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
  const parents: Member[] = members.filter(m => m.linkId === null);
  const children: Member[] = members.filter(m => m.linkId !== null);

  const seen: Set<number> = new Set();
  const circularRefs: Set<number> = new Set();

  children.forEach(child => {
    let current: Member | null = child;
    while (current && current.linkId !== null) {
      if (seen.has(current.id)) {
        circularRefs.add(current.id);
        break;
      }
      seen.add(current.id);
      current = members.find(m => m.id === current?.linkId) || null;
    }
  });

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
