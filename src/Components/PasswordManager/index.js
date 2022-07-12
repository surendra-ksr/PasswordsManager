import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    updatedList: [],
    hasValues: false,
    isShow: false,
    website: '',
    username: '',
    password: '',
    searchInput: '',
  }

  addItem = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const profileClass = colorList[Math.floor(Math.random() * 5)]
    const newItem = {
      id: uuidv4(),
      initial,
      website,
      username,
      password,
      newClass: profileClass,
    }
    this.setState(prevState => ({
      updatedList: [...prevState.updatedList, newItem],
      website: '',
      username: '',
      password: '',
      hasValues: true,
      searchInput: '',
    }))
  }

  onWebsite = event => {
    this.setState({website: event.target.value})
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onDelete = id => {
    const {updatedList} = this.state
    const filteredList = updatedList.filter(eachItem => eachItem.id !== id)
    const isNotZero = filteredList.length !== 0
    this.setState({updatedList: filteredList, hasValues: isNotZero})
  }

  render() {
    const {
      updatedList,
      website,
      username,
      password,
      searchInput,
      isShow,
    } = this.state

    let {hasValues} = this.state

    const filteredList = updatedList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (filteredList.length === 0) {
      hasValues = false
    } else {
      hasValues = true
    }

    return (
      <div className="mainDiv">
        <div>
          <img
            className="mainLogo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="topDiv">
            <div className="topLeftDiv">
              <h1 className="topH1">Add New Password</h1>
              <form className="formDiv" onSubmit={this.addItem}>
                <div className="inputDiv">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                  <input
                    type="text"
                    className=" input"
                    onChange={this.onWebsite}
                    placeholder="Enter Website"
                    value={website}
                  />
                </div>
                <div className="inputDiv">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <input
                    type="text"
                    className=" input"
                    onChange={this.onUsername}
                    placeholder="Enter Username"
                    value={username}
                  />
                </div>
                <div className="inputDiv">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                  <input
                    type="password"
                    className=" input"
                    onChange={this.onPassword}
                    placeholder="Enter Password"
                    value={password}
                  />
                </div>
                <button type="submit" className="addButton" value={password}>
                  Add
                </button>
              </form>
            </div>

            <img
              className="topRightImg"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
          </div>
          <div className="botDiv">
            <div className="botTopDiv">
              <div className="botLeftDiv">
                <h1 className="botH1">Your Passwords</h1>
                <p className="countP">{updatedList.length}</p>
              </div>
              <div className="searchDiv">
                <img
                  className="searchImg"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onSearch}
                  className="search"
                />
              </div>
            </div>
            <hr />
            <div className="checkBoxDiv">
              <input
                className="checkInput"
                type="checkbox"
                id="checkBox"
                onChange={this.showPassword}
              />
              <label htmlFor="checkBox" className="checkLabel">
                Show Passwords
              </label>
            </div>
            {!hasValues && (
              <div className="botImgDiv">
                <img
                  className="topRightImg"
                  alt="no passwords"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                />
                <p className="noP">No Passwords</p>
              </div>
            )}
            {hasValues && (
              <ul className="ulDiv">
                {filteredList.map(eachItem => (
                  <PasswordItem
                    onDelete={this.onDelete}
                    key={eachItem.id}
                    isShow={isShow}
                    passwordDetails={eachItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
