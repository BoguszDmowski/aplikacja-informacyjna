import React from "react";
import './Languages.css'
import { Flag, Segment } from 'semantic-ui-react'
console.log(React.version);
const languages = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 
    'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'it', 'jp', 'kr',
    'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs',
     'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']

class Languages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "pl",
        }
    }
    onValueChange = (e) => {
        const value = e.target.value;    
        this.setState({ value});
        this.props.onLanguageChange(value);
    };

   
    render () {       
        const { value } = this.state;

        return( 
            <select value={value} onChange={this.onValueChange}>
                {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}<Segment> <Flag name={lang}/> </Segment> </option>))}   
            </select>
        )
    }
}
  
export default Languages;