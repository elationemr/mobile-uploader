import { createSelector } from 'reselect';


export const getReportTypes = createSelector(
  state => state.reportTypes.byId,
  reportTypesById => Object.keys(reportTypesById)
    .map(id => reportTypesById[id])
    .sort((a, b) => (a.userLabel).localeCompare(b.userLabel))
);
