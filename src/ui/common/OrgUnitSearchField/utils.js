export const getTreeExpanded = (listOu, result, value) => {
  const found = listOu.find((ou) => ou.id === value);
  if (!found?.parent) return result;
  return getTreeExpanded(listOu, [found.parent, ...result], found.parent);
};
