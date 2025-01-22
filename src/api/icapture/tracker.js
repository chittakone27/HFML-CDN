import { pull, push } from "@/utils/fetch";
import { add, format } from "date-fns";
const getTeis = async (program, orgUnit, page, filters, teiFilter) => {
  let url = `/api/trackedEntityInstances?program=${program}&ou=${orgUnit}&ouMode=SELECTED&pageSize=20&page=${page}&fields=*`;
  filters.forEach((f) => {
    if (f.value !== "") {
      url += `&filter=${f.id}:${f.operator}:${f.value}`;
    }
  });
  if (teiFilter) {
    const { enrollmentStatus, eventStatus, eventFilters } = teiFilter;
    if (enrollmentStatus) {
      url += `&programStatus=${enrollmentStatus}`;
    }
    // if (eventStatus) {
    //   url += `&eventStatus=${eventStatus}`;
    // }
    if (eventFilters) {
      eventFilters.forEach((ef) => {
        const { programStage, eventStatus, eventCreatedPeriod } = ef;
        if (programStage) {
          url += `&programStage=${programStage}`;
        }
        if (eventStatus) {
          url += `&eventStatus=${eventStatus}`;
        }
        if (eventCreatedPeriod) {
          const { periodFrom, periodTo } = eventCreatedPeriod;
          const startDate = format(add(new Date(), { days: periodFrom }), "yyyy-MM-dd");
          url += `&eventStartDate=${startDate}`;
          const endDate = format(add(new Date(), { days: periodTo }), "yyyy-MM-dd");
          url += `&eventEndDate=${endDate}`;
        }
      });
    }
  }
  const result = await pull(url);
  return result.trackedEntityInstances;
};

const searchTeis = async (criterias, program, orgUnit) => {
  let url = `/api/trackedEntityInstances?program=${program}&ou=${orgUnit}&ouMode=ACCESSIBLE&fields=*,enrollments[program,status,enrollmentDate]&skipPaging=true`;
  Object.keys(criterias).forEach((tea) => {
    const value = criterias[tea];
    if (value) {
      url += `&filter=${tea}:like:${value}`;
    }
  });
  const result = await pull(url);
  return result;
};

const getTeiById = async (program, teiId) => {
  let url = `/api/trackedEntityInstances/${teiId}?program=${program}&fields=*`;
  const result = await pull(url);
  return result;
};

const saveTei = async (tei) => {
  let url = `/api/trackedEntityInstances`;
  const result = await push(url, { trackedEntityInstances: [tei] }, "POST");
  return result;
};
const saveEnrollment = async (enr) => {
  let url = `/api/enrollments`;
  const enrollment = { ...enr };
  if (enrollment.attributes && enrollment.attributes.length > 0) {
    enrollment.attributes = enrollment.attributes.filter((attr) => {
      return attr.value !== "";
    });
  }

  const result = await push(url, { enrollments: [enrollment] }, "POST");
  return result;
};

const saveEvent = async (event) => {
  let url = `/api/events`;
  const result = await push(url, { events: [event] }, "POST");
  return result;
};

const saveEventDate = async (event) => {
  const clonedEvent = { ...event };
  if (clonedEvent.isNew) {
    const url = `/api/events`;
    const result = await push(url, clonedEvent, "POST");
    return result;
  } else {
    const url = `/api/events/${clonedEvent.event}/eventDate`;
    delete clonedEvent.dataValues;
    const result = await push(url, clonedEvent, "PUT");
    return result;
  }
};

const deleteTei = async (tei) => {
  let url = `/api/trackedEntityInstances?strategy=DELETE`;
  const result = await push(
    url,
    {
      trackedEntityInstances: [
        {
          trackedEntityInstance: tei
        }
      ]
    },
    "POST"
  );
  return result;
};

const deleteEvent = async (event) => {
  const response = await push("/api/events?strategy=DELETE", {
    events: [event]
  });
  const json = await response.json();
  return { ok: response.ok, result: json };
};

const getReservedValue = async (tea, orgUnit) => {
  const response = await pull(`/api/trackedEntityAttributes/${tea}/generateAndReserve?ORG_UNIT_CODE=${orgUnit.code}`);
  return response;
};

const tracker = { getTeis, searchTeis, getTeiById, saveTei, deleteTei, deleteEvent, saveEnrollment, saveEvent, saveEventDate, getReservedValue };
export default tracker;
