import axios from "axios"
import { useState, useEffect } from "react"
import CarBtn from "./Cards";

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
            if(lowerCarte.indexOf(tmpRech) > - 1) return carte;
        });
        return(res)
    }

    function scan(input){
        axios.get(`https://world.openfoodfacts.org/api/v0/product/${input}.json`).then(datas=>{
            if(datas.status === 200 && datas.data.status === 1) {
                let tmp = [...cartes]
                tmp.push(datas.data)
                setCartes(tmp)
                setInput("")
            }
            console.log(datas)
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
            <div className="ligIma">{lignesImages}</div>
        </div>
    )
}