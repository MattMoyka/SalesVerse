import { Link } from "react-router-dom"
import './products.css'
import { DateTime } from "luxon"
import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { AZ, ZA, lowestFirst, highestFirst, lowestCostFirst, highestCostFirst } from "../../utils/sort"
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
    id: 'cost',
    label: 'Cost',
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
    id: 'updated',
    label: 'Updated',
    minWidth: 170,
    align: 'right',

  },
];

function createData(name, cost, profit, date, id) {
  const total = cost + profit;
  const margin = profit / (total) * 100;
  const updated = DateTime.fromISO(date).toFormat('D')
  return { name, total, cost, profit, margin, updated, id };
}




export default function Products(props) {
  const { products } = props
  const [applySort, setApplySort] = useState(false);
  const [sortType, setSortType] = useState("name-ascending");
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();
  const handleSort = (type) => {
    if (type !== "" && type !== undefined) {
      setSortType(type);
    }
    switch (type) {
      case "name-ascending":
        setSearchResult(AZ(searchResult));
        break;
      case "name-descending":
        setSearchResult(ZA(searchResult));
        break;
      case "price-ascending":
        setSearchResult(lowestFirst(searchResult));
        break;
      case "price-descending":
        setSearchResult(highestFirst(searchResult));
        break;
      case "cost-ascending":
        setSearchResult(lowestCostFirst(searchResult));
        break;
      case "cost-descending":
        setSearchResult(highestCostFirst(searchResult));
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
    setSearchResult(products)
  }, [products])

  const rows = searchResult.map((product) => {
    return createData(product?.name, product?.cost, product?.profit, product?.updated_at, product?.id)
  })


  const handleSearch = (event) => {
    let results;
    if (event.target.value !== []) {
      results = products.filter((product) =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
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
    <div className="product-page">
      <div className="product-list-header">
        <h3 className='product-list-title'>Product List</h3>
        <Link to='/products/create' className='text-black' id='product-link'>Add Product</Link>
      </div>
      <div className='product-utils'>
        <Search onSubmit={handleSubmit} handleSearch={handleSearch} />
        <Sort onSubmit={handleSubmit} handleSort={handleSort} />
      </div>

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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row?.id} style={{ cursor: 'pointer' }} onClick={() => (history.push(`/products/${row?.id}`))}>
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

