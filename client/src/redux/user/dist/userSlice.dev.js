"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resetUser = exports.updateCurrentUser = exports.clearSignInSuccess = exports.signInSuccess = exports.clearSignUpSuccess = exports.signUpSuccess = void 0;

var _toolkit = require("@reduxjs/toolkit");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  signUpSuccess: false,
  signInSuccess: false,
  currentUser: null,
  token: null
}; // Define slice to manage state and actions

var userSlice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: initialState,
  reducers: {
    signUpSuccess: function signUpSuccess(state) {
      return _objectSpread({}, state, {
        signUpSuccess: true
      });
    },
    clearSignUpSuccess: function clearSignUpSuccess(state) {
      return _objectSpread({}, state, {
        signUpSuccess: false
      });
    },
    signInSuccess: function signInSuccess(state, action) {
      return _objectSpread({}, state, {
        currentUser: action.payload,
        token: action.payload.token,
        signInSuccess: true
      });
    },
    clearSignInSuccess: function clearSignInSuccess(state) {
      return _objectSpread({}, state, {
        signInSuccess: false,
        currentUser: null,
        token: null
      });
    },
    updateCurrentUser: function updateCurrentUser(state, action) {
      return _objectSpread({}, state, {
        currentUser: action.payload,
        token: action.payload.token
      });
    },
    resetUser: function resetUser() {
      return initialState;
    }
  }
});
var _userSlice$actions = userSlice.actions,
    signUpSuccess = _userSlice$actions.signUpSuccess,
    clearSignUpSuccess = _userSlice$actions.clearSignUpSuccess,
    signInSuccess = _userSlice$actions.signInSuccess,
    clearSignInSuccess = _userSlice$actions.clearSignInSuccess,
    updateCurrentUser = _userSlice$actions.updateCurrentUser,
    resetUser = _userSlice$actions.resetUser;
exports.resetUser = resetUser;
exports.updateCurrentUser = updateCurrentUser;
exports.clearSignInSuccess = clearSignInSuccess;
exports.signInSuccess = signInSuccess;
exports.clearSignUpSuccess = clearSignUpSuccess;
exports.signUpSuccess = signUpSuccess;
var _default = userSlice.reducer;
exports["default"] = _default;