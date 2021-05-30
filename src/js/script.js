{'use strict';

  const template= Handlebars.compile(document.querySelector('#template-book').innerHTML);
 
  const list = document.querySelector('.books-list');


  function render(){

    for (let book of dataSource.books ){
      const temp=template(book);
      const generatedDOM= utils.createDOMFromHTML(temp);
      list.appendChild(generatedDOM);
    }


  }
  render();




}