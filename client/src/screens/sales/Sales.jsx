import { Link } from "react-router-dom"
import './Sales.css'
import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { AZ, ZA, lowestFirst, highestFirst } from "../../utils/sortsale"
import Search from "../../components/Search"
import Sort from "../../components/Sort"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'total', label: 'Total', minWidth: 100, format: (value) => `$${value}` },
  {
    id: 'buyer',
    label: 'Buyer',
    minWidth: 170,
    align: 'right',
    format: (value) => `$${value}`,
  },
  {
    id: 'profit',
    label: 'Profit',
    minWidth: 170,
    align: 'right',
    format: (value) => `$${value}`
  },
  {
    id: 'margin',
    label: 'Margin',
    minWidth: 170,
    align: 'right',
    format: (value) => `%${value.toFixed(2)}`,
  },
  {
    id: 'sold',
    label: 'Sold',
    minWidth: 170,
    align: 'right',

  },
];

function createData(name, cost, profit, buyer, sold, id) {
  const total = cost + profit;
  const margin = profit / (total) * 100;
  return { name, total, buyer, profit, margin, sold, id };
}


export default function Sales(props) {
  const { sales, products, toggle1 } = props
  const history = useHistory();

  const [applySort, setApplySort] = useState(false);
  const [sortType, setSortType] = useState("name-ascending");
  const [searchResult, setSearchResult] = useState([]);

  const handleSort = (type) => {
    if (type !== "" && type !== undefined) {
      setSortType(type);
    }
    switch (type) {
      case "buyer-ascending":
        setSearchResult(AZ(searchResult));
        break;
      case "buyer-descending":
        setSearchResult(ZA(searchResult));
        break;
      case "price-ascending":
        setSearchResult(lowestFirst(searchResult));
        break;
      case "price-descending":
        setSearchResult(highestFirst(searchResult));
        break;

      default:
        break;
    }
  };

  if (applySort) {
    handleSort(sortType);
    setApplySort(false);
  }

  useEffect(() => {
    setSearchResult(sales)
  }, [sales])

  const rows = searchResult.map((sale) => {
    return createData(sale.product?.name, sale.product?.cost, sale.product?.profit, sale?.buyer, sale?.sold_date, sale?.id)
  })


  const handleSearch = (event) => {
    let results;
    if (event.target.value !== []) {
      results = sales.filter((sale) =>
        sale.buyer.toLowerCase().includes(event.target.value.toLowerCase())
      );
    } else {
      results = [...products]
    }
    setSearchResult(results);
    setApplySort(true);
  };

  const handleSubmit = (event) => event.preventDefault();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="sale-page">
      <div className="sale-list-header">
        <h3 className='sale-list-title'>Sales List</h3>

      </div>
      <div className='sale-utils'>
        <Search onSubmit={handleSubmit} handleSearch={handleSearch} />
        <Sort onSubmit={handleSubmit} handleSort={handleSort} />
      </div>
      {/* <div className='sale-containers-title'>

        <div>Name</div>
        <div>Total</div>
        <div>Buyer</div>
        <div>Profit</div>
        <div>Margin</div>
        <div>Sold</div>

      </div>
      <div className='sale-list-container'>
        {searchResult.map((sale) => (
          <Link to={`/sales/${sale.id}`} className='sale-containers' id='sale-link' key={sale.id}>

            <div>{sale.product?.name}</div>
            <div>${sale.product?.cost + sale.product?.profit}</div>
            <div>{sale?.buyer}</div>
            <div>${sale.product?.profit}</div>
            <div>%{Math.round(sale.product?.profit / (sale.product?.cost + sale.product?.profit) * 100)}</div>
            <div>{sale?.sold_date}</div>

          </Link>
        ))}</div> */}
      <Paper sx={{ width: '100%', overflow: 'hidden', margin: '80px 0' }}>
        <TableContainer sx={{ height: '70vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row?.id} style={{ cursor: 'pointer' }} onClick={() => (history.push(`/sales/${row?.id}`))}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (

                          <TableCell key={column.id} align={column.align}  >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>

                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </div>
  )
}
