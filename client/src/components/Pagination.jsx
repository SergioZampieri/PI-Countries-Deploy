import React from "react";
import style from "./Pagination.module.css";
export default function Pagination({countriesPerPage, allCountries, pagination,currentPage,setCountriesPerPage}) {
  
  if (currentPage === 1){setCountriesPerPage(10) }else{setCountriesPerPage(9)}
  const pageNumbers = [];
  
  for (let i =0; i < Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i+1);
  }
 

  return (
    <nav className={style.contpag}>
      <ul className="pagination">
        {/* <li onClick={() => { if (currentPage!==1) {(pagination(currentPage-1))}}}> PREV</li> ESTO ESTA ROTO POR ESO NO LO IMPLEMENTO */}
        {pageNumbers &&
          pageNumbers.map((number) => { return( 
            <button className={current === number? style.botpag:style.botpag2} key={number}>  
              <a onClick={() => {return (pagination(number))}}>{number}</a>
            </button>);
          })}
          {/* <li onClick={() => {if (currentPage!==countriesPerPage) {pagination(currentPage+1)}}} >NEXT</li> */} 
      </ul>
    </nav>
  );
}




