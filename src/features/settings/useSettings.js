import {useQuery} from "@tanstack/react-query";
import {getSettings} from "../../services/apiSettings.js";

export function useSettings() {
    const {isLoading, error, data: setting} = useQuery({
        queryFn: getSettings,
        queryKey: ["settings"],
    })
    return {isLoading, setting, error}
}