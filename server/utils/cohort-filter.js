// Turns the query string sent by the client's CohortFilterBar
// (e.g. ?campus=Paris&program=Web%20Dev) into a Mongoose filter object.
function buildCohortFilter(query) {
  const filter = {};

  // TODO(human): copy the supported query params from `query` into `filter`

  return filter;
}

module.exports = buildCohortFilter;
