// @flow
import {createStructuredSelector} from 'reselect'
import assign from 'lodash/assign'
import {baseUrl, getPromiseData} from '../../utils/Utils'
import {State} from 'models/friends'

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const ADD_FRIEND = 'redux-app/friends/ADD_FRIEND';
const STAR_FRIEND = 'redux-app/friends/STAR_FRIEND';
const DELETE_FRIEND = 'redux-app/friends/DELETE_FRIEND';
const UPDATE_COORDS = 'redux-app/friends/UPDATE_COORDS';
const SELECT_LIST = 'redux-app/friends/SELECT_LIST';
const ERROR = 'redux-app/friends/ERROR';

// This will be used in our root reducer and selectors

export const NAME = 'friends';

// Define the initial state for `friends` module

const initialState: State = {

  lists:[],
  newCoords:{lat:0,lng:0},
  currentList: null,

  friends: [0, 1, 2, 3, 4],
  friendsById: [
    {
      id: 0,
      name: 'Notorious B.I.G.'
    },
    {
      id: 1,
      name: 'Tupac Shakur'
    },
    {
      id: 2,
      name: 'Dr. Dre'
    },
    {
      id: 3,
      name: 'Big Pun'
    },
    {
      id: 4,
      name: 'Rakim'
    }
  ]
}







// Reducer

/**
 * Another clever approach of writing reducers:
 *
 * export default function(state = initialState, action) {
 *   const actions = {
 *      [ACTION_TYPE]: () => [action.payload.data, ...state]
 *   };
 *
 *   return (_.isFunction(actions[action.type])) ? actions[action.type]() : state
 * }
 */

export default function reducer(state: State = initialState, action: any = {}): State {
  switch (action.type) {

    case SELECT_LIST: {
      return {
        ...state,
        currentList: {
          id: action.id,
          name: action.name
        }
      }
    }

    case ADD_FRIEND: {
      const len = state.friends.length ? state.friends.length : 1;
      const newId = (state.friends[len - 1] + 1) || 0;
      return {
        ...state,
        friends: state.friends.concat(newId),
        friendsById: [
          ...state.friendsById,
          {
            id: newId,
            name: action.name
          }
        ]
      };
    }

    case DELETE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter((id) => id !== action.id),
        friendsById: state.friendsById.filter((friend) => friend.id !== action.id)
      };

    case UPDATE_COORDS:
      return {
        ...state,
        newCoords: action.payload
      }

    case ERROR:
      return {
        ...state,
        newCoords: action.payload
      }
    case STAR_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.map((friend) => {
          if (friend.id !== action.id) {
            return friend;
          }

          return assign({}, friend, {
            starred: !friend.starred
          });
        })
      };

    default:
      return state;
  }
}







// Action Creators

function addFriend(name: string) {
  return {
    type: ADD_FRIEND,
    name
  };
}

// or in a form of arrow function

// const addFriend = (name: string) => ({
//   type: ADD_FRIEND,
//   name
// });

function deleteFriend(id: number) {
  return {
    type: DELETE_FRIEND,
    id
  };
}

function starFriend(id: number) {
  return {
    type: STAR_FRIEND,
    id
  }
}

function selectList(id: string, name:string) {
  return {
    type: SELECT_LIST,
    id,
    name
  }
}

function updateListCoords(coords: Object) {
  return (dispatch) => {

    let coordsResponse = [fetch(baseUrl + "/api/listcoords/59e88e3bbd83b012cb327498",//" + this.props.params.list_id + "
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({coords: {lat: coords.latLng.lat(), lng: coords.latLng.lng()}}),

      }).catch((err) => dispatch({
        type: ERROR,
        payload: err
      })
    )]
    getPromiseData(coordsResponse).then((res) => {
      dispatch({
        type: UPDATE_COORDS,
        payload: res[0].data
      })
    })
  }

}

// Selectors
const friends = (state) => state[NAME];

export const selector = createStructuredSelector({
  friends
});

export const actionCreators = {
  selectList,
  addFriend,
  deleteFriend,
  starFriend,
  updateListCoords
};
