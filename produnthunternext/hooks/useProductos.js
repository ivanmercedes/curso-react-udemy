import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';


const useProductos = orden =>{
  
  
    const [productos, guardarProducto] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
   const obtenerProductos = () =>{
      firebase.db.collection('productos').orderBy(orden,'desc').onSnapshot(menejarSnapshot)
   }
   obtenerProductos();

   
  }, []);

  function menejarSnapshot(snapshot){
    const productos = snapshot.docs.map(doc=>{
      return {
       id: doc.id,
       ...doc.data()
      }
    });
    guardarProducto(productos);
   }

   return {
       productos
   }
}

export default useProductos;