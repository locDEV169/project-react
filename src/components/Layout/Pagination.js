import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Pagination extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="pagination-area">
			    <ul className="pagination">
					<li><a href="" className="active">1</a></li>
					<li><a href="">2</a></li>
					<li><a href="">3</a></li>
                    <li><a href=""><i className="fa fa-angle-double-right"></i></a></li>
				</ul>
			</div>				
        )
    }
}
export default Pagination