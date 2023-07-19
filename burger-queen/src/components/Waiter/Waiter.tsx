import React, { useEffect, useState } from 'react';
import burgerQueen from "../../Images/logoWithBG.gif";
import burger from "../../Images/burger.png";
import trash from "../../Images/trash.png";
import {GetProducts} from "../../functions/GetProduct"
import {toCart} from "../../functions/toCart"

const OrderSelectionItem= ({name, price}) => {
  return (
    
    <div id="buttom1" className="bg-notPress h-[90px] w-[200px] rounded-25 flex flex-row border-2 border-borderNotPress drop-shadow-productUnpress">        
    <div id="product" className="bg-notPress h-[90px] w-[140px] rounded-tl-25 rounded-bl-25">{name}</div>
      <div id="price" className="bg-crema h-[90px] w-[60px] rounded-tr-25 rounded-br-25"> {price}</div>
    </div>
  )
}

export const Waiter: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productType, setProductType] = useState("Desayuno");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  useEffect(()=>{
    GetProducts()
    .then((data)=>{
      setProducts(data);
    })
    .catch((error)=>{
      console.error("Error fetching products", error);
    })
  },[])


  const handleSelectProductType = (type: string) => {
    setProductType(type);
  };
  const handleAddToCart = (product:Product)=>{
    setCartItems((prevCartItems)=>[...prevCartItems, product]);
  };
 
  return (
    <article className="h-[97vh] flex flex-col m-[20px]">

      {/* ---Header(LOGO + MESERO)--- */}
      <header className=" z-1 w-[100%] h-[25%] bg-colorButton mb-[20px] flex flex-">
        <img id="logo" src={burgerQueen} alt="burgerQueenLogo" className="w-auto h-[25%] absolute top-0 left-0 z-1" />
        <label id="waiterPg" className="text-[100px] text-crema border-[brownText] font-bold">MESERO</label>
      </header>

      {/* ---Main section--- */}
      <main id="content" className=" z-1 h-[100%] w-[100%]">

        {/* ---Desayuno - Almuerzo/Cena--- */}
        <section id="desayunoOalmuerzoCena" className=" h-[10%] w-[100%] flex flex-row justify-end">
          <div className={`h-[100%] w-[250px] bg-crema rounded-tl-[25px] text-3xl font-bold flex items-center justify-center ${
            productType === "Desayuno" ? "textTransform: uppercase" : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
          }`}
          onClick={() => handleSelectProductType("Desayuno")} // Manejador para seleccionar desayuno
        >
          <label>Desayuno</label>
        </div>
        <div
          className={`h-[100%] w-[250px] bg-crema rounded-tr-[25px] text-3xl font-bold flex items-center justify-center ${
            productType === "Almuerzo" ? "textTransform: uppercase" : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
          }`}
          onClick={() => handleSelectProductType("Almuerzo")} // Manejador para seleccionar Almuerzo
        >
            <label>Almuerzo/Cena</label>
          </div>
        </section>

        {/* ---Menu&Cart--- */}
        <section id="menuYCompra" className=" h-[90%] w-[100%] bg-crema p-[4%]">

          {/* ---Name + Table--- */}
          <div id="nameAndTable" className="bg-green-200 h-[10%] w-[100%] p-[1%] flex flex-row justify-evenly items-center gap-1">
            <label>Nombre:</label>
            <input type="text" className="bg-skin h-[50%] w-[40%] rounded-5" ></input>
            <label>Mesa:</label>
            <input type="text" className="bg-skin h-[50%] w-[40%] rounded-5" ></input>
          </div>
       
          {/* ---Order Selection--- */}
          <div id="orderSelection" className="h-auto w-[100%] p-[1%] flex flex-wrap justify-center justify-evenly text-center gap-y-4">
            {/* ---Buttoms--- */}
            {products.filter((product)=> product.type === productType)
            .map((product) => (
                <OrderSelectionItem key={product.id} name={product.name} price={product.price} />
              ))}
             </div>

          {/* ---Shopping Cart--- */}

          <div id="cart" className="h-auto w-[100%] p-[5%] text-[1.5rem] font-bold">
            {/* ---Titles--- */}
            <div id="titles" className="h-[50px] w-[100%] grid grid-cols-10 gap-1 text-center">
              <div id="product" className="bg-yellow col-span-3 rounded-tl-[15px]">Producto</div>
              <div id="quantity" className="bg-yellow col-span-4">Cantidad</div>
              <div id="price" className="bg-yellow col-span-2 rounded-tr-[15px]">Precio</div>
              <div id="delete" className="col-span-1"></div>
            </div>
            {/* ---Products added--- */}
            <div id="productsTable" className="h-[65px] w-[100%] grid grid-cols-10 gap-1 text-center">
              <div id="product" className="bg-skin col-span-3">Café</div>
              <div id="quantity" className="bg-skin col-span-4 grid grid-cols-3">
                <div id="minus" className="bg-minusButtom">-</div>
                <div id="number">2</div>
                <div id="plus" className="bg-plusButtom">+</div>
              </div>
              <div id="price" className="bg-skin col-span-2 ">10$</div>
              <img id="delete" src={trash} alt="delete" className="w-[80%] col-span-1 object-fit" />
            </div>
            {/* ---Total--- */}
            <div id="total" className=" h-[50px] mt-[25px] grid grid-cols-10 gap-1 text-center">
              <div className="bg-skin col-span-3 rounded-tl-[15px] rounded-bl-[15px]">Total</div>
              <div className="bg-skin col-span-6 rounded-tr-[15px] rounded-br-[15px]">10$</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {/* ---Send Buttom--- */}
          <div id="SendButtom" className="h-[10%] w-[100%] flex justify-center items-center">
            <button type="submit" className="bg-colorButton h-[65px] w-[500px] items-center rounded-[45px]">Enviar a Cocina</button>
          </div>
        </section>
      </main>

      {/* ---Background--- */}
      <section id="background" className="z-0">
        <img src={burger} alt="burger" className=" h-auto	w-9/12 absolute top-[-34px] right-[-196px] -rotate-135 opacity-50	" />
        <img src={burger} alt="burger" className="h-auto	w-9/12 absolute bottom-[-71px] left-[-180px] rotate-45 opacity-50	" />
      </section>
    </article>
  )
}