import * as Types from "../../constants/ActionType";

var initialState = {
  allStore: [],
  storeID: { store_code: "", name: "", address: "", id_type_of_store: "" },
  type: [],
  loadingBranch: true,
  loadingCarList: true,
  loadingEmployeeList: true,
  loadingTripList: true,
  branchStore: [],
  carlist: [],
  employeeList: [],
  tripList: [],
  supplier: [],
  supplierID: {},

};

export const store = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_STORE:
      console.log(action.data)
      newState.allStore = action.data;
      return newState;
    case Types.FETCH_ID_STORE:
      newState.storeID = action.data;
      return newState;
    case Types.FETCH_ALL_TYPESTORE:
      newState.type = action.data;
      return newState;
    case Types.FETCH_BRANCH_STORE:
      newState.branchStore = action.data;
      return newState;
    case Types.FETCH_BRANCH_STORE_LOADING:
      newState.loadingBranch = true;
      return newState;
    case Types.FETCH_BRANCH_STORE_NONE:
      newState.loadingBranch = false;
      return newState;
    //Danh sách xe
    case Types.FETCH_CAR_LIST:
      newState.carlist = action.data;
      return newState;
    case Types.FETCH_CAR_LIST_LOADING:
      newState.loadingCarList = true;
      return newState;
    case Types.FETCH_CAR_LIST_NONE:
      newState.loadingCarList = false;
      return newState;
    //Danh sách nhân viên
    case Types.FETCH_EMPLOYEE_LIST:
      newState.employeeList = action.data;
      return newState;
    case Types.FETCH_EMPLOYEE_LIST_LOADING:
      newState.loadingEmployeeList = true;
      return newState;
    case Types.FETCH_EMPLOYEE_LIST_NONE:
      newState.loadingEmployeeList = false;
      return newState;
    //Danh sách chuyến đi
    case Types.FETCH_TRIP_LIST:
      newState.tripList = action.data;
      return newState;
    case Types.FETCH_TRIP_LIST_LOADING:
      newState.loadingTripList = true;
      return newState;
    case Types.FETCH_TRIP_LIST_NONE:
      newState.loadingTripList = false;
      return newState;
    case Types.FETCH_ALL_SUPPLIER:
      newState.supplier = action.data;
      return newState;
      case Types.FETCH_ID_SUPPLIER:
        newState.supplierID = action.data;
        return newState;
    default:
      return newState;
  }
};
