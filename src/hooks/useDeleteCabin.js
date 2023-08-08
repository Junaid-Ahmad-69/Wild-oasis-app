import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../services/apiCabins.js";
import {toast} from "react-toastify";


export function useDeleteCabin() {
    const queryClient = useQueryClient()
    const {isLoading: isDeleted, mutate: deleteCabin} = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success("Cabin deleted successfully")
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: (err) => toast.error(err.message)
    })
    return {isDeleted, deleteCabin}
}