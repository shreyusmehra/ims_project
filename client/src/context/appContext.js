import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
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

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  isEditing: false,
  editInventoryId: "",
  productName: "",
  description: "",
  statusOptions: ["available", "unavailable"],
  status: "available",
  categoryOptions: ["clothing", "electronic", "food", "household", "other"],
  category: "other",
  inventory: [],
  totalInventory: 0,
  numOfPages: 1,
  page: 1,
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // axios
  const authFetch = axios.create({
    baseURL: "http://localhost:8000/api/v1",
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, token } = data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createInventory = async () => {
    dispatch({ type: CREATE_INVENTORY_BEGIN });
    try {
      const { productName, description, status, category } = state;
      await authFetch.post("/inventory", {
        productName,
        description,
        status,
        category,
      });
      dispatch({ type: CREATE_INVENTORY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_INVENTORY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getInventory = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/inventory?page=${page}&status=${searchStatus}&inventoryType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_INVENTORY_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { inventory, totalInventory, numOfPages } = data;
      dispatch({
        type: GET_INVENTORY_SUCCESS,
        payload: { inventory, totalInventory, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditInventory = (id) => {
    dispatch({ type: SET_EDIT_INVENTORY, payload: { id } });
  };

  const editInventory = async () => {
    dispatch({ type: EDIT_INVENTORY_BEGIN });

    try {
      const { productName, description, status, category } = state;
      await authFetch.patch(`/inventory/${state.editInventoryId}`, {
        productName,
        description,
        status,
        category,
      });
      dispatch({ type: EDIT_INVENTORY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_INVENTORY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteInventory = async (inventoryId) => {
    dispatch({ type: DELETE_INVENTORY_BEGIN });

    try {
      await authFetch.delete(`/inventory/${inventoryId}`);
      getInventory();
    } catch (error) {
      logoutUser();
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createInventory,
        getInventory,
        setEditInventory,
        editInventory,
        deleteInventory,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, initialState, AppProvider };
