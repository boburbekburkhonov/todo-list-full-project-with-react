import React, { useRef, useState } from 'react';

function index(props) {

  const val = useRef()
  const checked = useRef()

  const local = JSON.parse(window.localStorage.getItem('data'));

  console.log(local);

  const[data, setDate] = useState(local || [])

  function obj (e) {
    e.preventDefault();

    const item = {
      id: Date.now(),
      text: val.current.value,
      isCompleted: false
    }

    setDate([...data, item])

  }
  window.localStorage.setItem('data', JSON.stringify(data))

  function remove(item){
    const filter = data.filter(element => element.id !== item)

    setDate(filter)

    window.localStorage.setItem('data', JSON.stringify(data))

  }

  if(data.length < 1){
    window.localStorage.removeItem('data')
  }

  function ozgar(item){
    const desc = prompt('Nima yozay');
    const filter = data.find(element => element.id === item);
    filter.text = desc

    setDate([...data])

    window.localStorage.setItem('data', JSON.stringify(data))

  }

  function check(item) {
    const find = data.find(element => element.id ===item);
    find.isCompleted = !find.isCompleted

    setDate([...data])

    window.localStorage.setItem('data', JSON.stringify(data))
  }

  return (
    <>
    <form onSubmit={(e) => obj(e)}>
     <input ref={val} className='form-control w-50' type="text" placeholder='biror narsa'  />
      </form>

      {data.map((item, index) => {
        return (
          <li key={index + 1} className='card'>
          <table className='table table-hover'>
          <thead>
          <tr>
            <th>Id</th>
            <th>Text</th>
            <th>O'zgartirish</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <th>{index + 1}</th>
              <td className={`${item.isCompleted ? 'text-decoration-line-through' : 'text-dark'}`}>{item.text}</td>
              <td>
                <input onClick={() => check(item.id)} ref={checked} type='checkbox' />
              </td>
              <td>
                <button onClick={() => ozgar(item.id)} className='btn btn-info'>O'zgartirish</button>
              </td>
              <td>
              <button onClick={() => remove(item.id)} className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          </tbody>
          </table>
          </li>
        )
      })}
    </>
  );
}

export default index;
