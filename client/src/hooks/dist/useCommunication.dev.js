"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCommunication = void 0;

var _reactRedux = require("react-redux");

var _communication_api = require("../services/communication_api");

var _react = require("react");

var _anonuser = _interopRequireDefault(require("../images/home/anonuser.png"));

var _user_api = require("../services/user_api");

var _commSlice = require("../redux/communications/commSlice");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useCommunication = function useCommunication() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      replyThread = _useState2[0],
      setReplyThread = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showReplies = _useState4[0],
      setShowReplies = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      count = _useState6[0],
      setCount = _useState6[1];

  var _useSelector = (0, _reactRedux.useSelector)(function (state) {
    return state.user;
  }),
      currentUser = _useSelector.currentUser,
      token = _useSelector.token;

  var _useSelector2 = (0, _reactRedux.useSelector)(function (state) {
    return state.comm;
  }),
      messageId = _useSelector2.messageId,
      activatedMessage = _useSelector2.activatedMessage,
      communicationUserId = _useSelector2.communicationUserId,
      messageThread = _useSelector2.messageThread;

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      message = _useState8[0],
      setMessage = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      user = _useState10[0],
      setUser = _useState10[1];

  var _useState11 = (0, _react.useState)(_anonuser["default"]),
      _useState12 = _slicedToArray(_useState11, 2),
      userImage = _useState12[0],
      setUserImage = _useState12[1];

  var _useState13 = (0, _react.useState)(""),
      _useState14 = _slicedToArray(_useState13, 2),
      newReply = _useState14[0],
      setNewReply = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      postedMessage = _useState16[0],
      setPostedMessage = _useState16[1];

  var _useState17 = (0, _react.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      edit = _useState18[0],
      setEdit = _useState18[1];

  var _useState19 = (0, _react.useState)(false),
      _useState20 = _slicedToArray(_useState19, 2),
      editReply = _useState20[0],
      setEditReply = _useState20[1];

  var _useState21 = (0, _react.useState)(""),
      _useState22 = _slicedToArray(_useState21, 2),
      editMessage = _useState22[0],
      setEditMessage = _useState22[1];

  var _useState23 = (0, _react.useState)(""),
      _useState24 = _slicedToArray(_useState23, 2),
      editReplyText = _useState24[0],
      setEditReplyText = _useState24[1];

  var _useState25 = (0, _react.useState)(false),
      _useState26 = _slicedToArray(_useState25, 2),
      sync = _useState26[0],
      setSync = _useState26[1];

  var dispatch = (0, _reactRedux.useDispatch)();

  var handleReplies = function handleReplies(messageId) {
    var replies;
    return regeneratorRuntime.async(function handleReplies$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _commSlice.setErrorText)(""));
            setShowReplies(true);
            setReplyThread(null);
            dispatch((0, _commSlice.setActiveMessage)(messageId));
            setCount(count + 1); // const data = await getMessagesById(messageId, token);

            _context.prev = 5;
            _context.next = 8;
            return regeneratorRuntime.awrap((0, _communication_api.getRepliesByMessageId)(messageId, token));

          case 8:
            replies = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(replies);

          case 11:
            _context.t0 = _context.sent;

            if (!_context.t0) {
              _context.next = 14;
              break;
            }

            setReplyThread(replies);

          case 14:
            setPostedMessage(true);
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context["catch"](5);
            dispatch((0, _commSlice.setErrorText)(_context.t1.message));
            setReplyThread([]);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[5, 17]]);
  }; //This is to get whether user has started the edit process, if yes, then we set it to true


  var handleEdit = function handleEdit(messageId, message) {
    return regeneratorRuntime.async(function handleEdit$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            setEdit(true);
            setEditMessage(message);
            dispatch((0, _commSlice.setActiveMessage)(messageId));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  var handleReplyEdit = function handleReplyEdit(replyId, defaultText) {
    return regeneratorRuntime.async(function handleReplyEdit$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            setEditReply(true);
            setEditReplyText(defaultText);
            dispatch((0, _commSlice.setLoading)(false));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  }; //To save the main message after editing


  var handleEditSave = function handleEditSave(messageId, message) {
    return regeneratorRuntime.async(function handleEditSave$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            message === editMessage && setEdit(false);
            dispatch((0, _commSlice.setActiveMessage)(""));
            _context4.t0 = message !== editMessage;

            if (!_context4.t0) {
              _context4.next = 7;
              break;
            }

            _context4.next = 7;
            return regeneratorRuntime.awrap((0, _communication_api.postEditMessage)(messageId, token, editMessage));

          case 7:
            _context4.next = 9;
            return regeneratorRuntime.awrap(getAllMessages());

          case 9:
            setEdit(false); // setShowReplies(false);

            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t1 = _context4["catch"](0);
            dispatch((0, _commSlice.setErrorText)(_context4.t1.message));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 12]]);
  }; // To save a reply after editing


  var handleEditReplySave = function handleEditReplySave(replyId) {
    var res;
    return regeneratorRuntime.async(function handleEditReplySave$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            setEditReply(false);
            dispatch((0, _commSlice.setLoading)(true));
            _context5.next = 5;
            return regeneratorRuntime.awrap((0, _communication_api.postEditReply)(replyId, token, editReplyText, messageId));

          case 5:
            res = _context5.sent;
            _context5.t0 = res;

            if (!_context5.t0) {
              _context5.next = 10;
              break;
            }

            _context5.next = 10;
            return regeneratorRuntime.awrap(handleReplies(messageId));

          case 10:
            dispatch((0, _commSlice.setLoading)(false));
            dispatch((0, _commSlice.setReplyId)(""));
            _context5.next = 17;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t1 = _context5["catch"](0);
            dispatch((0, _commSlice.setErrorText)(_context5.t1.message));

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 14]]);
  }; // Post a message - main message


  var handleSubmit = function handleSubmit() {
    return regeneratorRuntime.async(function handleSubmit$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(message.trim().length <= 0)) {
              _context6.next = 4;
              break;
            }

            dispatch((0, _commSlice.setErrorText)("Message cannot be empty"));
            setCount(count + 1);
            return _context6.abrupt("return");

          case 4:
            _context6.prev = 4;
            dispatch((0, _commSlice.setErrorText)(""));
            setCount(count + 1);
            _context6.next = 9;
            return regeneratorRuntime.awrap((0, _communication_api.postMessage)(communicationUserId, currentUser._id, token, message.trim()));

          case 9:
            dispatch((0, _commSlice.setErrorText)(null));
            setMessage([""]);
            _context6.next = 13;
            return regeneratorRuntime.awrap(getAllMessages(true, false));

          case 13:
            _context6.next = 18;
            break;

          case 15:
            _context6.prev = 15;
            _context6.t0 = _context6["catch"](4);
            dispatch((0, _commSlice.setErrorText)(_context6.t0.message));

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[4, 15]]);
  };

  var postAReply = function postAReply() {
    return regeneratorRuntime.async(function postAReply$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            setNewReply([""]);
            dispatch((0, _commSlice.setErrorText)(""));
            dispatch((0, _commSlice.setLoading)(true));
            _context7.next = 6;
            return regeneratorRuntime.awrap((0, _communication_api.postReply)(newReply, token, messageId, currentUser._id));

          case 6:
            _context7.next = 8;
            return regeneratorRuntime.awrap(handleReplies(messageId));

          case 8:
            dispatch((0, _commSlice.setErrorText)(null));
            dispatch((0, _commSlice.setLoading)(false));
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](0);
            dispatch((0, _commSlice.setLoading)(false));
            dispatch((0, _commSlice.setErrorText)(_context7.t0.message));

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 12]]);
  };

  var clearReplyText = function clearReplyText() {
    return regeneratorRuntime.async(function clearReplyText$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            setNewReply([""]);

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    });
  };

  var getAllMessages = function getAllMessages() {
    var loading,
        syncing,
        data,
        _args9 = arguments;
    return regeneratorRuntime.async(function getAllMessages$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            loading = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : false;
            syncing = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : true;
            _context9.prev = 2;
            dispatch((0, _commSlice.setLoading)(loading));
            dispatch((0, _commSlice.setErrorText)(""));
            setCount(count + 1);
            setSync(syncing);
            _context9.next = 9;
            return regeneratorRuntime.awrap((0, _communication_api.getMessages)(communicationUserId || currentUser._id, token));

          case 9:
            data = _context9.sent;

            if (data) {
              dispatch((0, _commSlice.setMessageThread)(data.messages));
              setUser(data.user);
              setUserImage(data.user && data.user[0].photoURL || _anonuser["default"]);
            } else {
              dispatch((0, _commSlice.setMessageThread)(""));
            }

            dispatch((0, _commSlice.setLoading)(false));
            setSync(false);
            _context9.next = 20;
            break;

          case 15:
            _context9.prev = 15;
            _context9.t0 = _context9["catch"](2);
            dispatch((0, _commSlice.setErrorText)(_context9.t0.message));
            dispatch((0, _commSlice.setLoading)(false));
            setSync(false);

          case 20:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[2, 15]]);
  };

  var getUserDetails = function getUserDetails(id, token) {
    var res, userInfo;
    return regeneratorRuntime.async(function getUserDetails$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return regeneratorRuntime.awrap((0, _user_api.getUserInfo)(currentUser._id, token));

          case 3:
            res = _context10.sent;
            _context10.next = 6;
            return regeneratorRuntime.awrap(res.json());

          case 6:
            userInfo = _context10.sent;
            setUser(userInfo);
            _context10.next = 13;
            break;

          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](0);
            dispatch((0, _commSlice.setErrorText)(_context10.t0.message));

          case 13:
          case "end":
            return _context10.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };

  (0, _react.useEffect)(function () {
    getAllMessages(true, true);
  }, []);

  var handleCancelEdit = function handleCancelEdit() {
    setEdit(false);
    showReplies || dispatch((0, _commSlice.setActiveMessage)(""));
  };

  var handleCancelReplyEdit = function handleCancelReplyEdit() {
    setEditReply(false);
    dispatch((0, _commSlice.setReplyId)(""));
  };

  var backToCommUsers = function backToCommUsers() {
    dispatch((0, _commSlice.setShowMessagesToAdmin)(false));
    dispatch((0, _commSlice.setMessageThread)(""));
  };

  var markMessageAsRead = function markMessageAsRead(msgId) {
    return regeneratorRuntime.async(function markMessageAsRead$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            setCount(function (prev) {
              return prev + 1;
            });
            _context11.next = 4;
            return regeneratorRuntime.awrap((0, _communication_api.markAsRead)(token, msgId));

          case 4:
            dispatch((0, _commSlice.setErrorText)(null));
            _context11.next = 7;
            return regeneratorRuntime.awrap(getAllMessages(false, false));

          case 7:
            _context11.next = 12;
            break;

          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11["catch"](0);
            dispatch((0, _commSlice.setErrorText)(_context11.t0.message));

          case 12:
          case "end":
            return _context11.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };

  var markReplyRead = function markReplyRead(replyId, msgId, token) {
    return regeneratorRuntime.async(function markReplyRead$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            setCount(function (prev) {
              return prev + 1;
            });
            _context12.next = 4;
            return regeneratorRuntime.awrap((0, _communication_api.markReplyAsRead)(replyId, msgId, token));

          case 4:
            dispatch((0, _commSlice.setErrorText)(null));
            _context12.next = 7;
            return regeneratorRuntime.awrap(handleReplies(msgId));

          case 7:
            _context12.next = 12;
            break;

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](0);
            dispatch((0, _commSlice.setErrorText)(_context12.t0.message));

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, null, null, [[0, 9]]);
  }; // const getCountUnreadMessages = async () => {
  //   // try{
  //   //   setCount(prev => prev + 1);
  //   //   const unreadMessagesCount  = await getUnreadMessagesCount(token, currentUser._id);
  //   //   dispatch(setUnreadMessagesCount(unreadMessagesCount.messages));
  //   // }catch (error) {
  //   //   dispatch(setErrorText(error.message));
  //   // }
  // };


  return {
    token: token,
    messageId: messageId,
    handleReplies: handleReplies,
    showReplies: showReplies,
    setShowReplies: setShowReplies,
    replyThread: replyThread,
    handleSubmit: handleSubmit,
    count: count,
    setCount: setCount,
    message: message,
    setMessage: setMessage,
    userImage: userImage,
    user: user,
    getUserDetails: getUserDetails,
    newReply: newReply,
    setNewReply: setNewReply,
    postAReply: postAReply,
    clearReplyText: clearReplyText,
    postedMessage: postedMessage,
    activatedMessage: activatedMessage,
    handleEdit: handleEdit,
    edit: edit,
    handleEditSave: handleEditSave,
    setEditMessage: setEditMessage,
    editMessage: editMessage,
    handleCancelEdit: handleCancelEdit,
    handleReplyEdit: handleReplyEdit,
    editReply: editReply,
    editReplyText: editReplyText,
    setEditReplyText: setEditReplyText,
    handleCancelReplyEdit: handleCancelReplyEdit,
    handleEditReplySave: handleEditReplySave,
    getAllMessages: getAllMessages,
    messageThread: messageThread,
    setMessageThread: _commSlice.setMessageThread,
    backToCommUsers: backToCommUsers,
    markMessageAsRead: markMessageAsRead,
    markReplyRead: markReplyRead,
    sync: sync,
    setSync: setSync // getCountUnreadMessages,

  };
};

exports.useCommunication = useCommunication;