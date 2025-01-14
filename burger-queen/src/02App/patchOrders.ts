import dayjs from "dayjs";

export function completeOrder(id: number, status:string="Completado"){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch(`https://burger-queen-api-mock-h9bp.onrender.com/orders/${id}`,{
         method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
              },
      body: JSON.stringify({
        "status": status,
        "dateProcessed": dayjs().format("YYYY-MM-DD HH:mm:ss"),
      }),
      })
      .then(response=>{
        return response.json();
      })
      .catch(error=>{
        console.error("red error",error)
      })
    )
  }
