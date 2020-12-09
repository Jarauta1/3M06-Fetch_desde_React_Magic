import './App.css';
import {useState, useEffect} from "react"

function Cartas(props) {
    
  let [cartas,setCartas] = useState([])
    useEffect(function () {
        fetch(`https://api.magicthegathering.io/v1/cards?set=${props.code}`).then(respuesta =>respuesta.json()).then(datos => {
            setCartas(datos.cards)
        })
    }, [props.code])

   

    let mostrarCartas = cartas.map(carta=>{
        return (<div>
            <h1>{carta.name}</h1>
            <p>{carta.text}</p>
            <img className="carta" src={carta.imageUrl} width="100"/>
        </div>)
    })
    
    return mostrarCartas

}

function App() {

    let [data,setData] = useState([])
    let [codeSet, setCodeSet] = useState("")

    useEffect(function () {
        fetch("https://api.magicthegathering.io/v1/sets").then(respuesta =>respuesta.json()).then(datos => {
       setData(datos.sets)
        })
    }, [])

    let mostrarSets = data.map(set=>{
        return <option value={set.code}>{set.name}</option>
    })

    function seleccion(e) {
        setCodeSet(e.target.value)
    }

    return (<>
    <select onChange={seleccion}>
        <option>--</option>
        {mostrarSets}
    </select>
    <div>
        <Cartas code={codeSet}/>
    </div>
    </>)
    
}

export default App;
