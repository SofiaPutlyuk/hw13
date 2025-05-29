import React from 'react'
import axios from 'axios'
import './dress.css'
class Dress extends React.Component{
    state = {
    dresses:JSON.parse(localStorage.getItem("dresses")) || []

}
async componentDidMount(){
    try{
     const response = await axios.get("https://68373295664e72d28e43eebe.mockapi.io/dress/dior")
     this.setState({
        dresses:response.data
     })
     console.log(response.data)
    }catch(error){
        console.log("Error",error.message)
    }
}
async componentDidUpdate(prevProps){
if(prevProps.newBrand !== this.props.newBrand){
try{
const response = await axios.get(`https://68373295664e72d28e43eebe.mockapi.io/dress/${this.props.newBrand}`)
this.setState({
    dresses:response.data
})
localStorage.setItem("dresses", JSON.stringify(response.data));
}catch(error){
console.log("Error",error.message)
}
}
}
    render(){
        return(
            <ul className="list-dress">
               {this.state.dresses.map((elem,index) => {
                const price = elem.price
                const getNumber = price.replace(/[^\d,.-]/g, '').replace(',', '.')
                const priceNumber = parseFloat(getNumber)
                const discount = elem.discountPrice
                const hasDiscount = discount > 0; ; 
                  const discountedPrice = hasDiscount
                    ? (priceNumber * (1 - discount / 100)).toFixed(2)
                    : null;
                return(
                   <li key={index} className="card">
                    <img src={elem.image} alt={elem.name} className="image"/>
                    <p>{elem.name}</p>
                    <p>{elem.description}</p>
                    <p>{priceNumber} EUR</p>
                      <p>Original: {priceNumber} EUR</p>
                        {hasDiscount && (
                            <p>Discounted: {discountedPrice}</p>
                        )}
                   </li>
                )
               })} 
            </ul>
        )
    }
}
export default Dress;