import { useState } from "react";
import { useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery, useUpdateProductMutation } from "./store/goodsApi"


export function App() {
  const [count, setCount] = useState<string>('');
  
  const [newProduct, setNewProduct] = useState('');

  const [updatedProduct, setUpdatedProduct] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [idProduct, setIdProduct] = useState<number>(0);

  const { data=[], isFetching } = useGetGoodsQuery(count);
  const [addProduct, {}] = useAddProductMutation();
  const [deleteProduct, {}] = useDeleteProductMutation();
  const [updateProduct, {}] = useUpdateProductMutation();

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({name: newProduct}).unwrap();
      setNewProduct('');
    }
  }

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id).unwrap();
  }

  const handleUpdateProduct = async (id: number) => {
    if(updatedProduct) {
      await updateProduct({id, name: updatedProduct}).unwrap();
      setUpdatedProduct('');
      setInputVisible(false);
      setIdProduct(0);
    }
  }
  const handleCloseInput = () => {
    setInputVisible(false);
    setIdProduct(0);
  }
  const handleOpenInput = (id: number) => {
    setInputVisible(true);
    setIdProduct(id);
    setUpdatedProduct(data.filter((item) => item.id === id)[0].name);
  }

  if (isFetching) return <h1>Loading...</h1>

  return (
    <div className="">

      <div className="">
        <input 
          type="text" 
          value={newProduct} 
          onChange={(event) => setNewProduct(event.target.value)} 
        />
        <button onClick={handleAddProduct}>Add product</button>
      </div>

      <div className="">
        <select value={count} onChange={(event) => setCount(event.target.value)} name="" id="">
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      
      {inputVisible && <div>
        <span className="">
          <input type="text" onChange={(event) => setUpdatedProduct(event.target.value)} value={updatedProduct} />
        </span>
        <button onClick={handleCloseInput}>close</button>
        <button onClick={() => handleUpdateProduct(idProduct)}>update</button>
      </div>}

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <span className="">
              {item.name}
            </span>
            <button
              onClick={() => handleDeleteProduct(item.id)}
            >
              Del
            </button>
            <button onClick={() => handleOpenInput(item.id)}>edit</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
