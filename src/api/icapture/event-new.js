import { pull, push } from "@/utils/fetch";
import { add, format } from "date-fns";
const convertNewToOldPayload = (event) => {
  const clonedEvent = { ...event };
  if (!clonedEvent.isNew) {
    clonedEvent.eventDate = clonedEvent.occurredAt;
    clonedEvent.dueDate = clonedEvent.scheduledAt;
    clonedEvent.created = clonedEvent.createdAt;
    clonedEvent.lastUpdated = clonedEvent.updatedAt;
    clonedEvent.createdByUserInfo = clonedEvent.createdBy;
    clonedEvent.lastUpdatedByUserInfo = clonedEvent.updatedBy;
  }
  delete clonedEvent.occurredAt;
  delete clonedEvent.scheduledAt;
  delete clonedEvent.notes;
  delete clonedEvent.createdBy;
  delete clonedEvent.updatedBy;
  delete clonedEvent.assignedUser;
  return clonedEvent;
};

const convertOldToNewPayload = (event) => {
  const clonedEvent = { ...event };
  clonedEvent.occurredAt = clonedEvent.eventDate;
  clonedEvent.scheduledAt = clonedEvent.dueDate;
  delete clonedEvent.eventDate;
  delete clonedEvent.dueDate;
  return clonedEvent;
};

const getEvents = async (program, orgUnit, page, period, filters, sorts) => {
  let url = `/api/tracker/events?program=${program.id}&orgUnit=${orgUnit}&paging=true&page=${page}&pageSize=100&fields=*,dataValues&totalPages=true`;
  if (period && period.startDate && period.endDate && period.dhis2Period) {
    const endDate = format(add(new Date(period.endDate), { days: 1 }), "yyyy-MM-dd");
    url += `&occurredAfter=${period.startDate}&occurredBefore=${endDate}`;
  }
  const specialFilterIds = ["status", "eventDate"];
  let hasFilter = false;
  let hasSort = false;
  let currentFilters = [];
  let currentSorts = [];
  filters.forEach((f) => {
    if (f.value !== "" && !specialFilterIds.includes(f.id)) {
      currentFilters.push(`${f.id}:${f.operator}:${f.value}`);
      hasFilter = true;
    }
    if (f.id === "status") url += `&status=${f.value}`;
    if (f.id === "eventDate") url += `&occurredAfter=${f.value}&occurredBefore=${f.value}`;
  });
  sorts.forEach((s) => {
    if (s.value) {
      if (s.id === "lastUpdated") {
        currentSorts.push(`updatedAt:${s.value}`);
      } else {
        currentSorts.push(`${s.id}:${s.value}`);
      }
      hasSort = true;
    }
  });
  if (hasFilter) {
    url += `&filter=${currentFilters.join(",")}`;
  }
  if (hasSort) {
    url += `&order=${currentSorts.join(",")}`;
  }
  // if (!hasFilter) {
  //   url += "&order=status:asc";
  // }
  // url += "&order=status:asc,occurredAt:desc";
  const result = await pull(url);
  return result;
};

const getEventById = async (event) => {
  let url = `/api/tracker/events/${event}`;
  const result = await pull(url);
  return convertNewToOldPayload(result);
};

const saveEvent = async (event) => {
  if (event.geometry) {
    if (!event.geometry.coordinates[0] || !event.geometry.coordinates[1]) {
      delete event.geometry;
    }
  }
  const response = await push("/api/tracker?mergeMode=REPLACE&async=false&skipRuleEngine=true", {
    events: [convertOldToNewPayload(event)]
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

  const response = await push("/api/tracker?mergeMode=REPLACE&async=false&skipRuleEngine=true", {
    events: events.map((ev) => {
      return convertOldToNewPayload(ev);
    })
  });
  const json = await response.json();
  return { ok: response.ok, result: json };
};

// const saveEvent = async (event) => {
//   if (event.geometry) {
//     if (!event.geometry.coordinates[0] || !event.geometry.coordinates[1]) {
//       delete event.geometry;
//     }
//   }
//   const response = await push("/api/events?async=false", {
//     events: [convertNewToOldPayload(event)]
//   });
//   const json = await response.json();
//   return { ok: response.ok, result: json };
// };

const deleteEvent = async (event) => {
  const response = await push("/api/events?strategy=DELETE", {
    events: [event]
  });
  const json = await response.json();
  return { ok: response.ok, result: json };
};

const event = { getEvents, getEventById, saveEvent, saveEvents, deleteEvent };

export default event;
