"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.justReturnRandomString = exports.guestlogin = exports.signin = exports.signup = void 0;

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _guestModel = _interopRequireDefault(require("../models/guest.model.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _error = require("../utils/error.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var signup = function signup(req, res, next) {
  var _req$body, firstName, lastName, username, email, password, isRecruiter, hashedPassword, newUser;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, username = _req$body.username, email = _req$body.email, password = _req$body.password, isRecruiter = _req$body.isRecruiter;

          if (!firstName || !lastName || !username || !email || !password || firstName === "" || lastName === "" || username === "" || email === "" || password === "") {
            next((0, _error.errorHandler)(400, "All Fields are required"));
          }

          hashedPassword = _bcryptjs["default"].hashSync(password, 10);
          newUser = new _userModel["default"]({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
            recruiter: isRecruiter,
            photoURL: null
          });
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(newUser.save());

        case 7:
          res.status(200).json({
            message: "Sign up successful"
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          next(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 10]]);
};

exports.signup = signup;

var signin = function signin(req, res, next) {
  var _req$body2, email, password, userByEmail, userByUsername, user, isMatch, token, _user$_doc, pass, args;

  return regeneratorRuntime.async(function signin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password || email === "" || password === "")) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(400, "All Fields are required")));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 6:
          userByEmail = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            username: email
          }));

        case 9:
          userByUsername = _context2.sent;
          user = "";
          if (userByEmail) user = userByEmail;
          if (userByUsername) user = userByUsername;

          if (user) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(401, "Invalid Credentials")));

        case 15:
          isMatch = _bcryptjs["default"].compareSync(password, user.password);

          if (isMatch) {
            _context2.next = 18;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(401, "Invalid Credentials")));

        case 18:
          token = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: "1h"
          });
          _user$_doc = user._doc, pass = _user$_doc.password, args = _objectWithoutProperties(_user$_doc, ["password"]);
          res.status(200).cookie("token", token, {
            hTTPOnly: true
          }).json(_objectSpread({}, args, {
            token: token,
            type: user.username === 'admin' ? "admin" : "user"
          }));
          _context2.next = 26;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](3);
          return _context2.abrupt("return", next(_context2.t0));

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 23]]);
};

exports.signin = signin;

var guestlogin = function guestlogin(req, res, next) {
  var _req$body3, name, recruiter, newGuestUser, token;

  return regeneratorRuntime.async(function guestlogin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body3 = req.body, name = _req$body3.name, recruiter = _req$body3.recruiter;
          newGuestUser = new _guestModel["default"]({
            name: name,
            recruiter: recruiter
          });
          token = _jsonwebtoken["default"].sign({
            type: 'guest'
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          }); // Token expires in 1 hour
          // Set the cookie

          res.cookie("token", token, {
            httpOnly: true
          }); // Send the JSON response

          res.status(200).json({
            token: token,
            firstName: name ? name : "Guest",
            type: 'guest'
          }); // Save the new guest user if name or recruiter is provided

          if (!(name || recruiter)) {
            _context3.next = 9;
            break;
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(newGuestUser.save());

        case 9:
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", next(_context3.t0));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.guestlogin = guestlogin;

var justReturnRandomString = function justReturnRandomString(req, res) {
  var randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  res.json({
    randomString: randomString
  });
};

exports.justReturnRandomString = justReturnRandomString;