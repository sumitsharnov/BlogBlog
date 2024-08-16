"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var contentSchema = new _mongoose["default"].Schema({
  messages: [{
    id: String,
    message: String,
    sentAt: Date,
    firstName: String,
    photoURL: String,
    user: String,
    edit: Boolean,
    read: Boolean,
    "delete": Boolean,
    unreadReplies: Number,
    replies: [{
      id: String,
      message: String,
      photoURL: String,
      firstName: String,
      sentAt: Date,
      user: String,
      edit: Boolean,
      read: Boolean
    }]
  }],
  user: [{
    firstName: String,
    photoURL: String
  }],
  reactions: String
}, {
  timestamps: true
});

var Communication = _mongoose["default"].model('Communication', contentSchema);

var _default = Communication;
exports["default"] = _default;