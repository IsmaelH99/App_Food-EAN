export default function CarBtn({nom,supprimer}){
    return (
        <div className="row row-cols-1 row-cols-md-4 g-4">
            <div className="col-md-12">
                <div className="card h-100">
                    <img src= {nom.product.image_front_small_url} style={{width:"225px",height:"250px"}} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title"> {nom.product.generic_name_fr} </h5>
                        <p className="card-text"> {nom.product.brands} </p>
                        <p className="card-text"> {nom.product.nutriscore_score} </p>
                        <button onClick={()=>supprimer(nom)} className="btn btn-danger"> Supprimer </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
