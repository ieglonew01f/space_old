App.cable.subscriptions.create({
  channel: "ChatChannel",
  room: "Best Room"
}, {
  received: function(data) {
    return this.appendLine(data);
  },
  appendLine: function(data) {
    var html;
    html = this.createLine(data);
    return $("[data-chat-room='Best Room']").append(html);
  },
  createLine: function(data) {
    return "<article class=\"chat-line\">\n  <span class=\"speaker\">" + data["sent_by"] + "</span>\n  <span class=\"body\">" + data["body"] + "</span>\n</article>";
  }
});
