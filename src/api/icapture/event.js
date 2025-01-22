import { pull, push } from "@/utils/fetch";

const getEvents = async (program, orgUnit, page, period, filters) => {
  let url = `/api/events/query?programStage=${program.programStages[0].id}&orgUnit=${orgUnit}&paging=true&page=${page}&pageSize=100&fields=*,dataValues&totalPages=true`;
  if (period && period.startDate && period.endDate && period.dhis2Period) {
    url += `&startDate=${period.startDate}&endDate=${period.endDate}`;
  }
  const specialFilterIds = ["status", "eventDate"];
  let hasFilter = false;
  filters.map((f) => {
    if (f.value !== "" && !specialFilterIds.includes(f.id)) {
      url += `&filter=${f.id}:${f.operator}:${f.value}`;
      hasFilter = true;
    }
    if (f.id === "status") url += `&status=${f.value}`;
    if (f.id === "eventDate") url += `&startDate=${f.value}&endDate=${f.value}`;
  });
  if (!hasFilter) {
    url += "&order=status:asc";
  }
  url += "&order=eventDate:desc";

  const result = await pull(url);
  return result;
};

const getEventById = async (event) => {
  let url = `/api/events/${event}`;
  const result = await pull(url);
  return result;
};

const saveEvent = async (event) => {
  if (event.geometry) {
    if (!event.geometry.coordinates[0] || !event.geometry.coordinates[1]) {
      delete event.geometry;
    }
  }
  const response = await push("/api/events?mergeMode=REPLACE", {
    events: [event]
  });
  const json = await response.json();
  return { ok: response.ok, result: json };
};

const saveEvents = async (events) => {
  events.forEach((event) => {
    if (event.geometry) {
      if (!event.geometry.coordinates[0] || !event.geometry.coordinates[1]) {
        delete event.geometry;
      }
    }
  });

  const response = await push("/api/events?mergeMode=REPLACE", {
    events
  });
  const json = await response.json();
  return { ok: response.ok, result: json };
};

const deleteEvent = async (event) => {
  const response = await push("/api/events?strategy=DELETE", {
    events: [event]
  });
  const json = await response.json();
  return { ok: response.ok, result: json };
};
const event = { getEvents, getEventById, saveEvent, saveEvents, deleteEvent };

export default event;
