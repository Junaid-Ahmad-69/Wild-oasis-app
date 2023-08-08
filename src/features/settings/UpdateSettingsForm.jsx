import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useSettings} from "./useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useUpdateSetting} from "./useUpdateSetting.js";

function UpdateSettingsForm() {
    const {
        isLoading, setting: {
            maxBookingLength,
            minBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {}
    } = useSettings()
    const {isUpdated, updateSettings} = useUpdateSetting()


    if (isLoading) return <Spinner/>

    function handleUpdate(e, field) {
        const {value} = e.target;
        if (!value) return;
        updateSettings({[field]: value})
    }

    // This time we are using UNCONTROLLED fields, so we will NOT store state
    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input
                    type='number' id='min-nights' onBlur={(e) => handleUpdate(e, "minBookingLength")}
                    disabled={isUpdated} defaultValue={minBookingLength}/>
            </FormRow>

            <FormRow label='Maximum nights/booking'>
                <Input
                    type='number' id='max-nights' onBlur={(e) => handleUpdate(e, "maxBookingLength")}
                    disabled={isUpdated} defaultValue={maxBookingLength}/>
            </FormRow>

            <FormRow label='Maximum guests/booking'>
                <Input
                    type='number' id='max-guests' onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
                    disabled={isUpdated} defaultValue={maxGuestsPerBooking}/>
            </FormRow>

            <FormRow label='Breakfast price'>
                <Input
                    type='number' id='breakfast-price' onBlur={(e) => handleUpdate(e, "breakfastPrice")}
                    disabled={isUpdated} defaultValue={breakfastPrice}/>
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
