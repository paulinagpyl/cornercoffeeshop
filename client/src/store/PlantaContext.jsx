import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const PlantaProvider = ({ children }) => {
  const [plantas, setPlantas] = useState([]);
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const getPlantas = async()=>{
      try {
        const response = await fetch("/plantas.json")
        const data =await response.json()
        console.log(data)
        setPlantas(data)
      } catch (error){
        console.error ('error en fetch de plantas:', error)
      }
    } 
    getPlantas()
  },[])

  const setDeveloper = (develop) => setUser(develop)

  const addCart=(planta)=>{
    const foundPlanta =cart.findIndex((cartPlanta)=>cartPlanta.id === planta.id)
    if (foundPlanta<0){
      planta.count=1;
      setCart([...cart,planta])
    }else {
      cart[foundPlanta].count++
      setCart([...cart])
    }
  }

  const increaseCount =(index)=>{
    cart[index].count++
    setCart([...cart])
  }

  const decreaseCount =(index)=>{
    if (cart[index].count ===1){
      cart.splice(index,1);
    }else {
      cart[index].count--
    }
    setCart([...cart])
  }

  const totalCart = cart.reduce(
    (acumulador, {price, count})=> acumulador + price*count,0
  )

  // const globalState = { plantas,cart,setCart,addCart,decreaseCount, increaseCount, totalCart};
  const globalState = { plantas,cart,setCart,addCart,decreaseCount, increaseCount, totalCart, getDeveloper: user, setDeveloper};

  return (
    <Context.Provider value={globalState}>
      {children}
    </Context.Provider>
  );
};

export default PlantaProvider;
