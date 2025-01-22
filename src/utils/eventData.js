import moment from "moment";
import _ from "lodash";

const createNewEvent = (id, program, orgUnit) => {
  return {
    isDirty: false,
    event: id,
    eventDate: "",
    dueDate: "",
    dataValues: {},
    orgUnit: orgUnit.id,
    program: program.id,
    programStage: program.programStages[0].id
  };
};

const convertEventObject = (ev) => {
  const event = {
    ...ev,
    isDirty: false,
    eventDate: ev.eventDate ? moment(ev.eventDate).format("YYYY-MM-DD") : "",
    dueDate: ev.dueDate ? moment(ev.dueDate).format("YYYY-MM-DD") : "",
    dataValues: {}
  };
  ev.dataValues.forEach((dv) => {
    event.dataValues[dv.dataElement] = dv.value;
  });
  return event;
};

const convertToDhis2Event = (event) => {
  const newEvent = _.cloneDeep(event);
  delete newEvent.isDirty;
  newEvent.dataValues = Object.keys(newEvent.dataValues).map((key) => {
    return { dataElement: key, value: newEvent.dataValues[key] };
  });

  return newEvent;
};

export { convertEventObject, createNewEvent, convertToDhis2Event };
