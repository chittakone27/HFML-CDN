import { atom, selector, selectorFamily } from "recoil";
import { selectedProgram, selectedOrgUnit } from "./selection";
import { pull } from "../utils/fetch";
import { convertEventObject, createNewEvent } from "../utils/eventData";

const eventId = atom({
  key: "eventId",
  default: ""
});

const currentEventId = selector({
  key: "currentEventId",
  get: ({ get }) => get(eventId),
  set: ({ set }, newValue) => set(eventId, newValue + "~" + (new Date() + ""))
});

const event = atom({
  key: "event",
  default: selector({
    key: "currentEvent",
    get: ({ get }) => {
      let id = get(eventId);
      id = id.split("~")[0];
      const program = get(selectedProgram);
      const orgUnit = get(selectedOrgUnit);
      return new Promise(async (res, rej) => {
        if (!id) {
          res(null);
          return;
        }
        const event = await pull(`/api/events/${id}`);
        if (event.httpStatusCode === 404) {
          res(createNewEvent(id, program, orgUnit));
        } else {
          res(convertEventObject(event));
        }
      });
    }
  })
});

const currentEventDataValueSelector = selectorFamily({
  key: "currentEventDataValueSelector",
  get:
    (dataElement) =>
    ({ get }) => {
      const currentEvent = get(event);
      const dataValue = currentEvent[dataElement];
      return dataValue;
    },
  set:
    (dataElement) =>
    ({ get, set }, newValue) => {
      set(event, (prevState) => prevState);
    }
});

export { currentEventId, currentEventDataValueSelector, event };
