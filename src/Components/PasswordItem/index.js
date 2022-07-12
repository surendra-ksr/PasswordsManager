import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDelete, isShow} = props
  const {id, initial, newClass, username, website, password} = passwordDetails
  const deleteItem = () => {
    onDelete(id)
  }

  return (
    <li className="liItem" id={id}>
      <p className={`initial ${newClass}`}>{initial}</p>
      <div className="itemDiv">
        <p className="website">{website}</p>
        <p className="website">{username}</p>
        {!isShow && (
          <img
            className="starsImg"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
        {isShow && <p className="website">{password}</p>}
      </div>
      <button
        type="button"
        className="delBtn"
        onClick={deleteItem}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delImg"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
