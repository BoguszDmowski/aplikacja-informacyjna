import React, { Component } from 'react'
import { Menu, Dropdown, Segment } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom';
import Languages from './Languages';
import './Header.css';

export default class Header extends Component {
  state = { activeItem: 'home', layoutType: 'LANDSCAPE' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  reportWindowSize = () => {
    if (window.innerWidth < 768) {this.setState({ layoutType: "MOBILE" })}
    else {this.setState({ layoutType: "LANDSCAPE" })}
  }; 

  componentDidMount() {
    window.addEventListener("resize", this.reportWindowSize);
    this.reportWindowSize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.reportWindowSize);
    this.reportWindowSize();
  }
  render() {
    const { activeItem, layoutType } = this.state
  
    return (
      <Segment inverted>
        <Menu class="hamburger" inverted secondary>
          {layoutType === 'MOBILE' ? (
                <Dropdown class="hamburger" item icon="">
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/" exact>
                      Home
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/hobby">
                      HobbyPage
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/help">
                      Help
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
            <>    
              <Menu.Item
                as= {NavLink}
                to='/'
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as= {NavLink}
                to='/hobby'
                name='hobby'
                active={activeItem === 'hobby'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as= {NavLink}
                to='/help'
                name='help'
                active={activeItem === 'help'}
              />
            </>
              )
            }
          <Menu.Menu position='right'>
            <Menu.Item>
              <Languages onLanguageChange={this.props.onLanguageChange} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}