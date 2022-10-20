import Item from "./Item";


function List({ table, modal, remove }) {
  return (
    <>
      {table.map((data) => (
        <Item key={data.id} data={data} modal={modal} remove={remove}></Item>
      ))}
    </>
  );
}

export default List;