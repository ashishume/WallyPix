import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  courses: [],
  myCourses: [],
  myCourseIds: [],
  oneCourse: '',
  featured: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case ActionTypes.GET_MY_COURSES:
      return {
        ...state,
        myCourses: action.payload,
      };
    case ActionTypes.GET_COURSE_BY_ID:
      return {
        ...state,
        oneCourse: action.payload,
      };
    case ActionTypes.BUY_NEW_COURSE:
      return {
        ...state,
        oneCourse: action.payload,
      };
    case ActionTypes.GET_FEATURED_COURSE:
      return {
        ...state,
        featured: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
