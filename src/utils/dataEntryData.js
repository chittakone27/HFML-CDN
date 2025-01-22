const convertDataValueObject = (dataValues) => {
  const dataValuesObject = { dirtyFields: [] };
  dataValues.forEach((dv) => {
    dataValuesObject[`${dv.dataElement}-${dv.categoryOptionCombo}`] = dv.value;
  });
  return dataValuesObject;
};

export { convertDataValueObject };
