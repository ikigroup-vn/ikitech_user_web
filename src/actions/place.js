import * as Types from "../constants/ActionType";
import * as placeApi from "../data/remote/place";

export const fetchPlaceDistrict = (id) => {
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    placeApi
      .fetchPlaceDistrict(id)
      .then((res) => {
        console.log(res)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if(res.data.code !== 401)
        dispatch({
          type: Types.FETCH_PLACE_DISTRICT,
          data : res.data.data
        });
      });
  };
};

export const fetchPlaceDistrict_Wards = (id) =>{
  return (dispatch) => {
    dispatch({
      type: Types.SHOW_LOADING,
      loading: "show"
    })
    placeApi
      .fetchPlaceDistrict(id)
      .then((res) => {
        console.log(res)
        dispatch({
          type: Types.SHOW_LOADING,
          loading: "hide"
        })
        if(res.data.code !== 401)
        {
        dispatch({
          type: Types.FETCH_PLACE_DISTRICT,
          data : res.data.data
        });
        placeApi
        .fetchPlaceWards(res.data.data[0].id)
        .then((res) => {
          console.log(res)
          if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_PLACE_WARDS,
            data : res.data.data
          });
        });
      }
      });
  };
}

export const fetchPlaceProvince = () => {
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "show"
      })
      placeApi
        .fetchPlaceProvince()
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })
          if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_PLACE_PROVICE,
            data : res.data.data
          });
        });
    };
  };

  export const fetchPlaceWards = (id) => {
    return (dispatch) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "show"
      })
      placeApi
        .fetchPlaceWards(id)
        .then((res) => {
          dispatch({
            type: Types.SHOW_LOADING,
            loading: "hide"
          })
          if(res.data.code !== 401)
          dispatch({
            type: Types.FETCH_PLACE_WARDS,
            data : res.data.data
          });
        });
    };
  };
  
