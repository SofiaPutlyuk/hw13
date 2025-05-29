import React from "react";
import Dress from "../Dress/Dress";
import "./newbrand.css"
import chanel from '../../images/chanel.svg'
import dior from '../../images/dior.svg'
class NewBrand extends React.Component {
    state = {
        selectedBrand:"dior"
    }
    handleChange = () => {
       this.setState(prevState => ({
        selectedBrand:prevState.selectedBrand === "dior" ? "chanel" : "dior"
       }))
    }
    render(){
        return(
            <div>
                <button onClick={this.handleChange} className="btnBrand">
                   {this.state.selectedBrand === "dior" ?
                   <img src={chanel} alt="chanel" />
                   : 
                   <img src={dior} alt="dior" />
                   }
                    </button>
                <Dress newBrand={this.state.selectedBrand}/>
            </div>
        )
    }
}
export default NewBrand;