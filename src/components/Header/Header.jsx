import React, { Component } from 'react'
import { Menu, Dropdown, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Languages from './Languages';

export default class Header extends Component {
  state = { activeItem: 'home', layoutType: 'LANDSCAPE' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  reportWindowSize = () => {
    if (window.innerWidth < 768) return this.layoutType = 'MOBILE';
    else return this.layoutType = 'LANDSCAPE';
  }
  componentDidMount() {
    window.addEventListener("resize", this.reportWindowSize);
  }
  render() {
    const { activeItem, layoutType } = this.state

    return (
      <Segment inverted>
        <Menu inverted secondary>
          {layoutType !== layoutType.LANDSCAPE ? (
                <Dropdown item icon="align justify">
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/" exact>
                      Home
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/hobby">
                      HobbyPage
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/help">
                      Help
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
            <>    
              <Menu.Item
                as= {Link}
                to='/'
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as= {Link}
                to='/hobby'
                name='hobby'
                active={activeItem === 'hobby'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as= {Link}
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
