import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateSetting as UpdateSettingApi} from "../../services/apiSettings.js";

export function useUpdateSetting() {

    const queryClient = useQueryClient()
    const {mutate: updateSettings, isLoading: isUpdated} = useMutation({
        mutationFn: UpdateSettingApi,
        onSuccess: () => {
            toast.success("Setting successfully edited");
            queryClient.invalidateQueries({
                queryKey: ["settings"]
            });
        },
        onError: error => toast.error(error.message)
    });
    return {isUpdated , updateSettings}
}