import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { onPageChange, pagination } = this.props;

    const pagesCount = Math.ceil(pagination.rowCount / pagination.pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
      <nav>
        <ul className="pagination ">
          {pages.map(page => (
            <li
              key={page}
              className={
                page === pagination.page ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
