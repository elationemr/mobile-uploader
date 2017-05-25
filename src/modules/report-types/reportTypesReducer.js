const initialState = {
  byId: {
    1: {
      id: 1,
      modelClass: null,
      rank: 0,
      nickname: "Lab",
      userLabel: "Laboratory",
      reportTypeLabel: "Lab",
    },
    2: {
      id: 2,
      modelClass: null,
      rank: 1,
      nickname: "Cardiac",
      userLabel: "Cardiac",
      reportTypeLabel: "Cardiac",
    },
    3: {
      id: 3,
      modelClass: null,
      rank: 2,
      nickname: "Imaging",
      userLabel: "Imaging",
      reportTypeLabel: "Imaging",
    },
    4: {
      id: 4,
      modelClass: null,
      rank: 3,
      nickname: "Hospital",
      userLabel: "Hospital",
      reportTypeLabel: "Hospital",
    },
    5: {
      id: 5,
      modelClass: null,
      rank: 4,
      nickname: "Consult",
      userLabel: "Consultation",
      reportTypeLabel: "Consultation",
    },
    6: {
      id: 6,
      modelClass: null,
      rank: 5,
      nickname: "Legal",
      userLabel: "Legal",
      reportTypeLabel: "Legal",
    },
    7: {
      id: 7,
      modelClass: null,
      rank: 6,
      nickname: "Misc",
      userLabel: "Miscellaneous",
      reportTypeLabel: "Misc",
    },
  },
};

export default function reportTypesReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
