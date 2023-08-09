import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/constants.js";

export function useBooking() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams()
    const filterValue = searchParams.get("status")
    //FILTER
    const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue}

    // SORT
    const sortByData = searchParams.get("sortBy") || 'startDate-desc'
    const [field, direction] = sortByData.split('-')
    const sortBy = {field, direction}


    //PAGINATE
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const {isLoading, data: {data: bookings, count} = {}} =
        useQuery({
            queryFn: () => getBookings({filter, sortBy, page}),
            queryKey: ['bookings', filter, sortBy, page],
        });


    const pageCount  = Math.ceil(count / PAGE_SIZE);
    //PRE-FETCHING
    if (page < pageCount)
     queryClient.prefetchQuery({
        queryFn: () => getBookings({filter, sortBy, page: page + 1}),
        queryKey: ['bookings', filter, sortBy, page + 1],
    })
    if (page > 1)
     queryClient.prefetchQuery({
        queryFn: () => getBookings({filter, sortBy, page: page - 1}),
        queryKey: ['bookings', filter, sortBy, page - 1],
    })
    return {isLoading, bookings, count}
}