import React,{Component} from 'react';
import axios from 'axios';

class DetailProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: ""
        }
    }
    componentDidMount(){
        const getId = this.props.match.params.id
        this.setState({
            id: getId
        })
    }
    render(){
        return(
            <div>
                this is Detail page of {this.state.id}
            </div>
        )
    }
}
export default DetailProduct