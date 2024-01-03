import {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,} from '@mui/material';
import { useDebounce } from "@uidotdev/usehooks";
import TextField from "@mui/material/TextField";
import useProducts from "./useProducts.ts";


const ProductList = () => {
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 300);
    const {
        isLoading,
        isPending,
        isError,
        error,
        data,
        isFetching,
    } = useProducts(page, debouncedSearch);

    useEffect(() => {
        setPage(0)
    }, [search]);

    if (!data) {
        return null;
    }
    if (isError) {
        return <span>Error: {error.message}</span>
    }
    return (
        <div>
            <TextField id="filled-basic" label="Search" variant="filled" onChange={(e) => setSearch(e.target.value)}/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.total || 0}
                page={page}
                rowsPerPage={10}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPageOptions={[]}
                labelRowsPerPage=""
            />
            {isFetching || isPending || isLoading ? <span>Loading...</span> : null}
        </div>
    );
};

export default ProductList;