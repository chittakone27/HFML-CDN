export const getAttrVl = (attrs, attrId) => {
  const attr = attrs.find((a) => a.attribute === attrId);
  return attr ? attr.value : null;
};

export const getDataVl = (dataVls, deId) => {
  const dataVl = dataVls.find((de) => de.dataElement === deId);
  return dataVl ? dataVl.value : null;
};
