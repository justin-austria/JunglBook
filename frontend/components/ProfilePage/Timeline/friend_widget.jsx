import React from 'react'
import FriendWidgetItem from './friend_widget_item'
import { Link } from 'react-router-dom'
import values from 'lodash/values'

class FriendWidget extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let idReg = /\d+/g;
    let currentProfId = this.props.location.pathname.match( idReg )[0];
    this.props.fetchUserFriends(currentProfId)
  }

  componentWillReceiveProps() {
    let idReg = /\d+/g;
    let currentProfId = this.props.location.pathname.match( idReg )[0];
    if (this.props.bios.id != currentProfId) {
      this.props.fetchUserFriends(currentProfId)
    }
  }

  render() {
    let friendsListArr = values(this.props.friends)

    let friendsList = friendsListArr.map((friend) => {
      let pathId
      if (friend.sender_id === this.props.bios.id) {
        pathId = friend.recipient_id
      } else {
        pathId = friend.sender_id
      }
      if (pathId === undefined) {
        return <h4> </h4>
      }
      return( <li key={friend.id}> <Link to={`/user/${pathId}`}><FriendWidgetItem friend={friend}/> </Link></li>)
    })

    return (
      <div className="prof-subcomponent"  id="friend-widget">
        <div className="prof-subcomponent-header">
          <div className="prof-subcomponent-icon-container">
            <i className="fa fa-group"></i>
          </div>
          <Link to={`/user/${this.props.profId}/friends/`}> Friends </Link>
        </div>
        <div className="widget-grid">
          <ul>
            {friendsList}
          </ul>

        </div>
      </div>
    )
  }
}

export default FriendWidget
