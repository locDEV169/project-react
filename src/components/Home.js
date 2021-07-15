import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Layout/Header';
import Slider from './Layout/Slider';
import MenuLeft from './Layout/MenuLeft_Blog';

class Home extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            // <Slider />,
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="col-md-8">
                            <div>
                                This is homepage
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}
export default Home