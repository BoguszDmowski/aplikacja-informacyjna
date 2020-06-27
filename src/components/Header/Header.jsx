import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
// import NewsFiltersBar from '../Main/HomePage/NewsFiltersBar/NewsFiltersBar';
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
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted secondary>
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