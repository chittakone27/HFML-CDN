/**
 * Finds and returns the value of a tracker attribute object from an array, or returns an empty string if not found
 *
 * @param {Array} attributes - an array of tracker attribute objects
 * @param {string} attributeId - the id of the tracker attribute to find
 * @returns {string} the value of the found attribute, or an empty string if not found
 */
export const getAttributeValue = (attributes, attributeId) => {
  const attributeObject = attributes.find(
    (attr) => attr.attribute === attributeId
  );
  return attributeObject ? attributeObject.value : "";
};
