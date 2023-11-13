import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import * as suppliesService from "../../services/medical_supplies/MedicalSupplyService";
import CircularProgress from '@mui/material/CircularProgress';
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function SupplyPagination() {
    const [oldItems, setOldItems] = useState([]);
    // const [newItems, setNewItems] = useState([]);

    // const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [currPage, setCurrPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // const handleNextPage = () => {
    //     setPage((prev) => prev + 1);
    // };
    // const handlePreviousPage = () => {
    //     setPage((prev) => prev - 1);
    // };

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            setLoading(true);
            const newData = await getOldSupplies(currPage);
            setOldItems(newData);
            setLoading(false);
        };

        fetchDataAndSetState();
    }, [currPage]);

    const getOldSupplies = async () => {
        const list = await suppliesService.getOldSupplies();
        setOldItems(list);
    }

    const handleChange = (event, value) => {
        setCurrPage(value);
    };

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : (
                <ul>
                    {oldItems.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}

            {/* Pagination component */}
            <Stack spacing={2}>
                <Pagination
                    count={totalPages}  // Replace with the total number of pages
                    page={currPage}
                    onChange={handleChange}
                    renderItem={(oldItems) =>
                        <PaginationItem
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...oldItems}
                        />
                    }
                />
            </Stack>
        </div>
    );
}

        // <nav aria-label="Page navigation example">
        //     <ul className="pagination">
        //         <li className="page-item">

        //         </li>
        //         <li className="page-item">
        //             <span className="page-link">{page + 1}</span>
        //         </li>
        //         <li className="page-item">
        //             <span className="page-link">/</span>
        //         </li>
        //         <li className="page-item">
        //             <span className="page-link">{totalPage}</span>
        //         </li>
        //         <li className="page-item">
        //             {page + 1 !== totalPage && (
        //                 <button className="page-link" onClick={handleNextPage}>
        //                     Next
        //                 </button>
        //             )}
        //         </li>
        //     </ul>
        // </nav>

