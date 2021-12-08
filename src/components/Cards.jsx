import styled from "styled-components"

const ImgPro = styled.img 
`
width:100%;
height:200px;
object-fit: scale-down;
transform: scale(0.8);
transition: all ease-in-out 0.5s;
overflow:hidden;
cursor:pointer;

&:hover{
    transform: scale(1.5);
}
`
export default function CarBtn({nom,supprimer}){
    return (
        <div className="card border-info mb-3 toto" >
            <div className="card-header">🔳 "{nom.code}"</div>
            <div className="card-body">
                <ImgPro src= {nom.product.image_front_small_url} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title"> {nom.product.generic_name_fr} </h5>
                    <p className="card-text"> {nom.product.brands} </p>
                    <p className= "card-text "> <b> {nom.product.nutriscore_grade.toUpperCase()} </b></p>
                    <button onClick={()=>supprimer(nom)} className="btn btn-danger btn-supp"> Supprimer </button>
                </div>
            </div>
        </div>
    )
}
