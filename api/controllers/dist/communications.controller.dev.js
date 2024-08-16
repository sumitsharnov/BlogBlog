"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnreadReplies = exports.getUnreadMessages = exports.markReplyAsRead = exports.markAsRead = exports.editReply = exports.editMessage = exports.getReplies = exports.addReplies = exports.getMessagesByMessageId = exports.getMessages = exports.communication = void 0;

var _communicationsModel = _interopRequireDefault(require("../models/communications.model.js"));

var _error = require("../utils/error.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var communication = function communication(req, res, next) {
  var _req$body, communicationUserId, currentUserId, message, token, userType, timestamp, messages, user, _user$_doc, firstName, photoURL, randomUuid, _communication;

  return regeneratorRuntime.async(function communication$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, communicationUserId = _req$body.communicationUserId, currentUserId = _req$body.currentUserId, message = _req$body.message, token = _req$body.token, userType = _req$body.userType;
          timestamp = new Date().toISOString();
          messages = "";
          user = "";
          communicationUserId = communicationUserId || currentUserId;
          _context.prev = 6;

          _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](6);
          next((0, _error.errorHandler)(401, "Unauthorized"));
          return _context.abrupt("return");

        case 14:
          currentUserId || next((0, _error.errorHandler)(500, "User is not authorized"));

          if (!(currentUserId === communicationUserId)) {
            _context.next = 24;
            break;
          }

          _context.next = 18;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            _id: communicationUserId
          }));

        case 18:
          messages = _context.sent;
          _context.next = 21;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            _id: communicationUserId
          }));

        case 21:
          user = _context.sent;
          _context.next = 30;
          break;

        case 24:
          _context.next = 26;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            _id: communicationUserId
          }));

        case 26:
          messages = _context.sent;
          _context.next = 29;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            _id: currentUserId
          }));

        case 29:
          user = _context.sent;

        case 30:
          _user$_doc = user._doc, firstName = _user$_doc.firstName, photoURL = _user$_doc.photoURL;
          randomUuid = (0, _uuid.v4)();

          if (!messages) {
            _context.next = 41;
            break;
          }

          messages.messages.push({
            id: randomUuid,
            message: message,
            user: currentUserId,
            sentAt: timestamp,
            firstName: firstName,
            photoURL: photoURL,
            read: false,
            "delete": false
          });
          messages.user = {
            firstName: firstName,
            photoURL: photoURL
          };
          messages.reactions = "";
          _context.next = 38;
          return regeneratorRuntime.awrap(messages.save());

        case 38:
          res.status(200).json({
            message: "Message sent successfully"
          });
          _context.next = 45;
          break;

        case 41:
          _communication = new _communicationsModel["default"]({
            _id: currentUserId,
            messages: {
              id: randomUuid,
              message: message,
              sentAt: timestamp,
              firstName: firstName,
              photoURL: photoURL,
              user: currentUserId,
              replies: [],
              read: false,
              "delete": false
            },
            user: {
              firstName: firstName,
              photoURL: photoURL
            }
          });
          _context.next = 44;
          return regeneratorRuntime.awrap(_communication.save());

        case 44:
          res.status(200).json({
            message: "Message sent successfully"
          });

        case 45:
          _context.next = 50;
          break;

        case 47:
          _context.prev = 47;
          _context.t1 = _context["catch"](0);
          next(_context.t1);

        case 50:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 47], [6, 10]]);
};

exports.communication = communication;

var getMessages = function getMessages(req, res, next) {
  var userId, token, messages, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, message, user, photoURL;

  return regeneratorRuntime.async(function getMessages$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.headers["userid"]; // Retrieve userId from headers

          token = req.headers.authorization;

          try {
            _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
          } catch (e) {
            next((0, _error.errorHandler)(401, "Unauthorized"));
          }

          userId || next((0, _error.errorHandler)(500, "Something went wrong"));
          _context2.next = 7;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            _id: userId
          }));

        case 7:
          messages = _context2.sent;

          if (!messages) {
            _context2.next = 38;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 12;
          _iterator = messages.messages[Symbol.iterator]();

        case 14:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 24;
            break;
          }

          message = _step.value;
          _context2.next = 18;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            _id: message.user
          }));

        case 18:
          user = _context2.sent;
          photoURL = user._doc.photoURL;
          message.photoURL = photoURL;

        case 21:
          _iteratorNormalCompletion = true;
          _context2.next = 14;
          break;

        case 24:
          _context2.next = 30;
          break;

        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](12);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 30:
          _context2.prev = 30;
          _context2.prev = 31;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 33:
          _context2.prev = 33;

          if (!_didIteratorError) {
            _context2.next = 36;
            break;
          }

          throw _iteratorError;

        case 36:
          return _context2.finish(33);

        case 37:
          return _context2.finish(30);

        case 38:
          res.status(200).json(messages);
          _context2.next = 44;
          break;

        case 41:
          _context2.prev = 41;
          _context2.t1 = _context2["catch"](0);
          next((0, _error.errorHandler)(500, "Something went wrong"));

        case 44:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 41], [12, 26, 30, 38], [31,, 33, 37]]);
};

exports.getMessages = getMessages;

var getMessagesByMessageId = function getMessagesByMessageId(req, res, next) {
  var messageId, token, message;
  return regeneratorRuntime.async(function getMessagesByMessageId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          messageId = req.params.messageId; // Retrieve userId from headers

          token = req.headers.authorization;

          try {
            _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
          } catch (e) {
            next((0, _error.errorHandler)(401, "Unauthorized"));
          }

          messageId || next((0, _error.errorHandler)(500, "Something went wrong"));
          _context3.next = 7;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            "messages.id": messageId
          }, {
            "messages.$": 1
          }));

        case 7:
          message = _context3.sent;
          res.status(200).json(message);
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          next((0, _error.errorHandler)(500, "Something went wrong"));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getMessagesByMessageId = getMessagesByMessageId;

var addReplies = function addReplies(req, res, next) {
  var messageId, _req$body2, reply, token, userId, randomUuid, timestamp, _communication2, messageIndex, user, replyWithSenderInfo, updatedCommunication;

  return regeneratorRuntime.async(function addReplies$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          messageId = req.params.messageId; // Retrieve messageId from params

          _req$body2 = req.body, reply = _req$body2.reply, token = _req$body2.token, userId = _req$body2.userId;
          randomUuid = (0, _uuid.v4)();
          timestamp = new Date().toISOString(); // Verify token

          try {
            _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
          } catch (e) {
            next((0, _error.errorHandler)(401, "Unauthorized"));
          }

          if (messageId) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", next((0, _error.errorHandler)(400, "Message ID is missing")));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            "messages.id": messageId
          }));

        case 10:
          _communication2 = _context4.sent;

          if (_communication2) {
            _context4.next = 13;
            break;
          }

          return _context4.abrupt("return", next((0, _error.errorHandler)(404, "Communication not found")));

        case 13:
          // Find the specific message and update its replies array
          messageIndex = _communication2.messages.findIndex(function (msg) {
            return msg.id === messageId;
          });

          if (!(messageIndex === -1)) {
            _context4.next = 16;
            break;
          }

          return _context4.abrupt("return", next((0, _error.errorHandler)(404, "Message not found in the communication")));

        case 16:
          _context4.next = 18;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            _id: userId
          }));

        case 18:
          user = _context4.sent;
          // Construct the reply object including the photoURL and firstName
          replyWithSenderInfo = {
            id: randomUuid,
            message: reply,
            // Assuming 'reply' is a string containing the reply message
            photoURL: user.photoURL,
            firstName: user.firstName,
            sentAt: timestamp,
            user: userId,
            read: false
          };

          if (!(_communication2 && _communication2.messages.some(function (msg) {
            return msg.id === messageId && msg["delete"];
          }))) {
            _context4.next = 22;
            break;
          }

          throw new Error("Cannot update replies for a deleted message.");

        case 22:
          _context4.next = 24;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOneAndUpdate({
            "messages.id": messageId
          }, {
            $push: {
              "messages.$.replies": replyWithSenderInfo
            }
          }, {
            "new": true
          } // Return the updated document
          ));

        case 24:
          updatedCommunication = _context4.sent;

          if (updatedCommunication) {
            _context4.next = 27;
            break;
          }

          return _context4.abrupt("return", next((0, _error.errorHandler)(404, "Communication not found or update failed")));

        case 27:
          res.status(200).json("Posted a reply");
          _context4.next = 34;
          break;

        case 30:
          _context4.prev = 30;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          next((0, _error.errorHandler)(500, "An error occurred while saving the reply"));

        case 34:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 30]]);
};

exports.addReplies = addReplies;

var getReplies = function getReplies(req, res, next) {
  var messageId, _communication3, messageIndex, replies, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, reply, user, photoURL;

  return regeneratorRuntime.async(function getReplies$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          messageId = req.params.messageId; // Retrieve messageId from params

          if (messageId) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return", next(new Error("Message ID is missing")));

        case 4:
          _context5.next = 6;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            "messages.id": messageId
          }, {
            "messages.$": 1
          }));

        case 6:
          _communication3 = _context5.sent;

          if (_communication3) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", next(new Error("Communication not found")));

        case 9:
          // Extract the replies from the message
          messageIndex = _communication3.messages.findIndex(function (msg) {
            return msg.id === messageId;
          });

          if (!(messageIndex === -1)) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", next(new Error("Message not found in the communication")));

        case 12:
          replies = _communication3.messages[messageIndex].replies;

          if (!replies) {
            _context5.next = 43;
            break;
          }

          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context5.prev = 17;
          _iterator2 = replies[Symbol.iterator]();

        case 19:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context5.next = 29;
            break;
          }

          reply = _step2.value;
          _context5.next = 23;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            _id: reply.user
          }));

        case 23:
          user = _context5.sent;
          photoURL = user._doc.photoURL;
          reply.photoURL = photoURL;

        case 26:
          _iteratorNormalCompletion2 = true;
          _context5.next = 19;
          break;

        case 29:
          _context5.next = 35;
          break;

        case 31:
          _context5.prev = 31;
          _context5.t0 = _context5["catch"](17);
          _didIteratorError2 = true;
          _iteratorError2 = _context5.t0;

        case 35:
          _context5.prev = 35;
          _context5.prev = 36;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 38:
          _context5.prev = 38;

          if (!_didIteratorError2) {
            _context5.next = 41;
            break;
          }

          throw _iteratorError2;

        case 41:
          return _context5.finish(38);

        case 42:
          return _context5.finish(35);

        case 43:
          // Respond with the replies array
          res.status(200).json(replies);
          _context5.next = 50;
          break;

        case 46:
          _context5.prev = 46;
          _context5.t1 = _context5["catch"](0);
          console.error(_context5.t1);
          next(new Error("An error occurred while retrieving the replies"));

        case 50:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 46], [17, 31, 35, 43], [36,, 38, 42]]);
};

exports.getReplies = getReplies;

var editMessage = function editMessage(req, res, next) {
  var messageId, _req$body3, token, editedText, _communication4, updatedMessage;

  return regeneratorRuntime.async(function editMessage$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          messageId = req.params.messageId; // Retrieve messageId from params

          _req$body3 = req.body, token = _req$body3.token, editedText = _req$body3.editedText; // Verify the token

          _context6.prev = 3;

          _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](3);
          return _context6.abrupt("return", next((0, _error.errorHandler)(401, "Unauthorized")));

        case 10:
          if (messageId) {
            _context6.next = 12;
            break;
          }

          return _context6.abrupt("return", next(new Error("Message ID is missing")));

        case 12:
          _context6.next = 14;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            "messages.id": messageId
          }, {
            "messages.$": 1
          }));

        case 14:
          _communication4 = _context6.sent;

          if (_communication4) {
            _context6.next = 17;
            break;
          }

          return _context6.abrupt("return", next(new Error("Communication not found")));

        case 17:
          _context6.next = 19;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOneAndUpdate({
            "messages.id": messageId
          }, {
            $set: {
              "messages.$.message": editedText.trim() ? editedText : "This message has been deleted.",
              "messages.$.edit": editedText.trim() ? true : false,
              "messages.$.delete": editedText.trim() ? false : true
            }
          }, {
            "new": true
          } // Return the updated document
          ));

        case 19:
          updatedMessage = _context6.sent;
          res.status(200).json("Message edited successfully");
          _context6.next = 26;
          break;

        case 23:
          _context6.prev = 23;
          _context6.t1 = _context6["catch"](0);
          next((0, _error.errorHandler)(500, "Something went wrong"));

        case 26:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 23], [3, 7]]);
};

exports.editMessage = editMessage;

var editReply = function editReply(req, res, next) {
  var messageId, _req$body4, replyId, editedText, token, _communication5, reply;

  return regeneratorRuntime.async(function editReply$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          messageId = req.params.messageId;
          _req$body4 = req.body, replyId = _req$body4.replyId, editedText = _req$body4.editedText, token = _req$body4.token;
          _context7.prev = 3;

          _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](3);
          return _context7.abrupt("return", next((0, _error.errorHandler)(401, "Unauthorized")));

        case 10:
          _context7.next = 12;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            "messages.id": messageId
          }));

        case 12:
          _communication5 = _context7.sent;

          if (_communication5) {
            _context7.next = 15;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            error: "Message not found"
          }));

        case 15:
          reply = _communication5.messages.find(function (msg) {
            return msg.id === messageId;
          }).replies.find(function (rep) {
            return rep.id === replyId;
          });

          if (reply) {
            _context7.next = 18;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            error: "Reply not found"
          }));

        case 18:
          reply.message = editedText;
          reply.edit = true;
          _context7.next = 22;
          return regeneratorRuntime.awrap(_communication5.save());

        case 22:
          return _context7.abrupt("return", res.status(200).json({
            message: "Reply updated successfully"
          }));

        case 25:
          _context7.prev = 25;
          _context7.t1 = _context7["catch"](0);
          console.error("Error updating reply:", _context7.t1);
          return _context7.abrupt("return", res.status(500).json({
            error: "Internal server error"
          }));

        case 29:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 25], [3, 7]]);
};

exports.editReply = editReply;

var markAsRead = function markAsRead(req, res, next) {
  var messageId, token, _communication6;

  return regeneratorRuntime.async(function markAsRead$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          messageId = req.params.messageId;
          token = req.body.token;
          _context8.prev = 3;

          _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](3);
          return _context8.abrupt("return", next((0, _error.errorHandler)(401, "Unauthorized")));

        case 10:
          _context8.next = 12;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOneAndUpdate({
            "messages.id": messageId
          }, {
            $set: {
              "messages.$.read": true
            }
          }, {
            "new": true
          }));

        case 12:
          _communication6 = _context8.sent;

          if (_communication6) {
            _context8.next = 15;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            error: "Message not found"
          }));

        case 15:
          return _context8.abrupt("return", res.status(200).json({
            message: "Marked as read successfully"
          }));

        case 18:
          _context8.prev = 18;
          _context8.t1 = _context8["catch"](0);
          console.error("Error marking message as read:", _context8.t1);
          return _context8.abrupt("return", res.status(500).json({
            error: "Internal server error"
          }));

        case 22:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 18], [3, 7]]);
};

exports.markAsRead = markAsRead;

var markReplyAsRead = function markReplyAsRead(req, res, next) {
  var _req$body5, replyId, messageId, token, _communication7, reply;

  return regeneratorRuntime.async(function markReplyAsRead$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body5 = req.body, replyId = _req$body5.replyId, messageId = _req$body5.messageId, token = _req$body5.token;
          _context9.prev = 2;

          _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

          _context9.next = 9;
          break;

        case 6:
          _context9.prev = 6;
          _context9.t0 = _context9["catch"](2);
          return _context9.abrupt("return", next((0, _error.errorHandler)(401, "Unauthorized")));

        case 9:
          _context9.next = 11;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            "messages.id": messageId
          }));

        case 11:
          _communication7 = _context9.sent;

          if (_communication7) {
            _context9.next = 14;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            error: "Message not found"
          }));

        case 14:
          reply = _communication7.messages.find(function (msg) {
            return msg.id === messageId;
          }).replies.find(function (rep) {
            return rep.id === replyId;
          });

          if (reply) {
            _context9.next = 17;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            error: "Reply not found"
          }));

        case 17:
          reply.read = true;
          _context9.next = 20;
          return regeneratorRuntime.awrap(_communication7.save());

        case 20:
          return _context9.abrupt("return", res.status(200).json({
            message: "Reply marked as read successfully"
          }));

        case 23:
          _context9.prev = 23;
          _context9.t1 = _context9["catch"](0);
          console.error("Error updating reply:", _context9.t1);
          return _context9.abrupt("return", res.status(500).json({
            error: "Internal server error"
          }));

        case 27:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 23], [2, 6]]);
};

exports.markReplyAsRead = markReplyAsRead;

var getUnreadMessages = function getUnreadMessages(userId, token) {
  var _communication8, unreadMessagesCount;

  return regeneratorRuntime.async(function getUnreadMessages$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;

          _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET); // Find the communication document for the specific user


          _context10.next = 4;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            _id: userId
          }));

        case 4:
          _communication8 = _context10.sent;

          if (_communication8) {
            _context10.next = 7;
            break;
          }

          throw new Error("User not found");

        case 7:
          // Filter out unread main messages from different users
          unreadMessagesCount = 0;

          _communication8.messages.forEach(function (msg) {
            if (!msg.read && !msg["delete"] && msg.user !== userId) {
              unreadMessagesCount++;
            }
          });

          return _context10.abrupt("return", unreadMessagesCount);

        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](0);
          console.error("Error fetching unread messages:", _context10.t0);
          throw new Error("Internal server error");

        case 16:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getUnreadMessages = getUnreadMessages;

var getUnreadReplies = function getUnreadReplies(req, res, next) {
  var userId, token, messageId, _communication9, message, unreadRepliesCount;

  return regeneratorRuntime.async(function getUnreadReplies$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          userId = req.headers["userid"]; // Retrieve userId from headers

          token = req.headers.authorization;
          messageId = req.query.messageId; // Retrieve messageId from query parameters

          _context11.prev = 4;

          _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

          _context11.next = 11;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](4);
          return _context11.abrupt("return", next((0, _error.errorHandler)(401, "Unauthorized")));

        case 11:
          if (!(!userId || !messageId)) {
            _context11.next = 13;
            break;
          }

          return _context11.abrupt("return", next((0, _error.errorHandler)(500, "Something went wrong")));

        case 13:
          _context11.next = 15;
          return regeneratorRuntime.awrap(_communicationsModel["default"].findOne({
            _id: userId
          }));

        case 15:
          _communication9 = _context11.sent;

          if (_communication9) {
            _context11.next = 18;
            break;
          }

          return _context11.abrupt("return", res.status(404).json({
            error: "User not found"
          }));

        case 18:
          // Find the specific message and count unread replies
          message = _communication9.messages.find(function (msg) {
            return msg.id === messageId;
          });

          if (message) {
            _context11.next = 21;
            break;
          }

          return _context11.abrupt("return", res.status(404).json({
            error: "Message not found"
          }));

        case 21:
          unreadRepliesCount = message.replies.filter(function (reply) {
            return !reply.read && reply.user !== userId;
          }).length;
          res.status(200).json({
            replies: unreadRepliesCount
          });
          _context11.next = 29;
          break;

        case 25:
          _context11.prev = 25;
          _context11.t1 = _context11["catch"](0);
          console.error("Error fetching unread replies:", _context11.t1);
          return _context11.abrupt("return", res.status(500).json({
            error: "Internal server error"
          }));

        case 29:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 25], [4, 8]]);
};

exports.getUnreadReplies = getUnreadReplies;