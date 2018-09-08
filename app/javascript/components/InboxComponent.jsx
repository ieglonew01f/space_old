//Base
import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { fetchConversations, fetchMessages } from "../actions/pageActions";

//UI
import ConversationsComponent from "./inbox/ConversationsComponent";
import ConversationMessages from "./inbox/ConversationMessages";

@connect((store) => {
  return {
    conversations: store.conversations.conversations,
    fetching_conversations: store.conversations.fetching_conversations,
    messages: store.messages.messages,
    fetching_messages: store.messages.fetching_messages
  };
})

export default class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {
      current_conversation: null
    }
  };

  componentDidMount() {
    this.props.dispatch(fetchConversations());
  };

  openConversation(e, conversation) {
    this.props.dispatch(fetchMessages(conversation.user.id));
    this.state.current_conversation = conversation;
  };

  render() {
    const { fetching_conversations, fetching_messages, messages, conversations} = this.props;

    return (
      <div className="ui-block inbox-main">
        <div className="ui-block-title">
          <h6 className="title">Inbox</h6>
        </div>
        <div className="row">
          <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12  padding-r-0">
            <ConversationsComponent conversations={conversations} openConversation={(event, c) => this.openConversation(event, c)}/>
          </div>
          <div className="col col-xl-7 col-lg-6 col-md-12 col-sm-12  padding-l-0">
            <ConversationMessages current_conversation={this.state.current_conversation} messages={messages} fetching_messages={fetching_messages}/>
          </div>
        </div>
      </div>
    );
  };
}
