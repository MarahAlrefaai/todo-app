import React, { useEffect, useState } from 'react';
import Form from '../form/form.js'
import List from '../list/list.js'
import Header from '../header/header.js'
import ReactPaginate from 'react-paginate';
import { v4 as uuid } from 'uuid';
import { ControlContext } from '../../context/control.js';
import { useContext } from 'react';
const ToDo = () => {
  const control=useContext(ControlContext);

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);


  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  //----------------------------------------------
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + control.numberOfItems;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / control.numberOfItems));
  }, [itemOffset, control.numberOfItems , list]);


// Invoke when user click to request another page.
const handlePageClick = (event) => {
  const newOffset = (event.selected * control.numberOfItems) % list.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
};

  return (
    <>
    <Header  incomplete={incomplete}/>
    <div id='holder'>
      <Form addItem={addItem} />
    <List  deleteItem={deleteItem}list={currentItems} toggleComplete={toggleComplete} />
    </div> 
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default ToDo;