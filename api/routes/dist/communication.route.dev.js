"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _communicationsController = require("../controllers/communications.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/send", _communicationsController.communication);
router.get("/getMessages", _communicationsController.getMessages);
router.get("/getMessages/:messageId", _communicationsController.getMessagesByMessageId);
router.post("/reply/:messageId", _communicationsController.addReplies);
router.get("/threads/:messageId", _communicationsController.getReplies);
router.post("/editMessage/:messageId", _communicationsController.editMessage);
router.post("/editReply/:messageId", _communicationsController.editReply);
router.post("/markRead/:messageId", _communicationsController.markAsRead);
router.post("/markReplyRead", _communicationsController.markReplyAsRead);
router.get("/getUnreadMessages", _communicationsController.getUnreadMessages);
router.get("/getUnreadReplies", _communicationsController.getUnreadReplies);
var _default = router;
exports["default"] = _default;