function Item({ data, modal,Delete }) {
    const showEdit = () => {
      modal(data);
    };
  
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.price}</td>
        <td>{data.color}</td>
        <button className="btn btn-primary" onClick={showEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={()=>Delete(data)}>
         Delete
        </button>
      </tr>
    );
  }
  
  export default Item;