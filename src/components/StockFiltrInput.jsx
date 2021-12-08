import axios from "axios"
import { useState, useEffect } from "react"
import CarBtn from "./Cards";
import productExist from "./ProductExist";

export default function StockFiltrInput(){
    const [cartes, setCartes] = useState ([])
    const [input, setInput] = useState("");
    const [rech, setRech] = useState("")

    useEffect(()=>{
        let stockBDD = localStorage.getItem("cartes");
        if(stockBDD === null ){
            localStorage.setItem("cartes", JSON.stringify([]));
            stockBDD = [];
        }
        setCartes(JSON.parse(stockBDD))
    }, []);

    useEffect(()=>{
        localStorage.setItem("cartes", JSON.stringify(cartes));       
    }, [cartes])

    function rechercher(strRech, liste){
        let tmpRech = strRech.toLowerCase();
        let res = liste.filter(carte => {
            let lowerCarte = carte.product.generic_name_fr.toLowerCase();
            let lowerCarte1 = carte.product.brands.toLowerCase();
            let lowerCarte2 = carte.product.nutriscore_grade.toLowerCase();
            let lowerCarte3 = carte.code.toLowerCase();

            if(lowerCarte.indexOf(tmpRech) > - 1) return carte;
            if(lowerCarte1.indexOf(tmpRech) > - 1) return carte;
            if(lowerCarte2.indexOf(tmpRech) > - 1) return carte;
            if(lowerCarte3.indexOf(tmpRech) > - 1) return carte;
        });
        return(res)
    }

    function scan(input){
        axios.get(`https://fr.openfoodfacts.org/api/v0/product/${input}.json`).then(datas=>{
            if(datas.status === 200 && datas.data.status === 1) {
                setInput("");
            }
            
            if(datas.data.status === 0){
                alert("Produit non trouvé");
                setInput("")
                return false;
            }
            
            const product = datas.data;
            if(productExist(product, cartes)){
                alert("Produit déjà existant");
                return false;
            }
            let tmp = [...cartes];
                tmp.push(datas.data);
                setCartes(tmp);
                setInput("");
        })
    }

    function supprimer(carte){
        let tmp = [...cartes];
        const indice = cartes.indexOf(carte);
        if(indice > -1) tmp.splice(indice,1);
        setCartes(tmp);
    }
         
    const lignesImages = rechercher(rech, cartes).map((carte, i)=>{
        return (
           <CarBtn key={"carte-" +i} nom={carte} supprimer={supprimer}/>
        )
    })

    return (
        <div>
            <div className="input-group mb-3">
                <input type="number" value = {input} onChange={(e)=>{setInput(e.target.value)}} className="form-control" placeholder="Saisir..." />
                <button onClick={()=>scan(input)} className="btn btn-outline-primary" type="button" id="button-addon2">Enregistrer</button>
            </div>
            {cartes.length > 0 &&
                <div className="input-group mb-3">
                    <input type="text" value = {rech} onChange={(e)=>{setRech(e.target.value)}} className="form-control" placeholder="Rechercher..." />
                    <button className="btn btn-outline-primary" type="button" id="button-addon2">Rechercher</button>
                </div>
            }

            { cartes.length > 0 &&
               <div  className = "mb-4 mt-3">
                    <b>Nombre de Produits </b> 
                    <span className="nb-pro badge rounded-pill bg-info text-dark">
                        {cartes.length}
                    </span>
                </div> 
            }
            <div className="ligIma">{lignesImages}</div>
        </div>
    )
}