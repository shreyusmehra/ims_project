import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_INVENTORY_BEGIN,
  CREATE_INVENTORY_SUCCESS,
  CREATE_INVENTORY_ERROR,
  GET_INVENTORY_BEGIN,
  GET_INVENTORY_SUCCESS,
  SET_EDIT_INVENTORY,
  DELETE_INVENTORY_BEGIN,
  EDIT_INVENTORY_BEGIN,
  EDIT_INVENTORY_SUCCESS,
  EDIT_INVENTORY_ERROR,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "error",
      alertText: "Please provide all values! ",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editInventoryId: "",
      productName: "",
      description: "",
      category: "others",
      status: "available",
    };

    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_INVENTORY_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_INVENTORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Inventory Created!",
    };
  }
  if (action.type === CREATE_INVENTORY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_INVENTORY_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_INVENTORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      inventory: action.payload.inventory,
      totalInventory: action.payload.totalInventory,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_EDIT_INVENTORY) {
    const product = state.inventory.find(
      (inventory) => inventory._id === action.payload.id
    );
    const { _id, productName, description, category, status } = product;
    return {
      ...state,
      isEditing: true,
      editInventoryId: _id,
      productName,
      description,
      category,
      status,
    };
  }
  if (action.type === DELETE_INVENTORY_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_INVENTORY_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_INVENTORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Inventory Updated!",
    };
  }
  if (action.type === EDIT_INVENTORY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  throw new Error(`no such action:${action.type}`);
};

export default reducer;
