import styled from "styled-components";
import {useCreateCabin} from "../../hooks/useCreateCabin.js";
import {useEditCabin} from "../../hooks/useEditCabin.js";
import {useForm} from "react-hook-form";


import Input from "../../ui/Input";
import Form from "../../ui/Form.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import Button from "../../ui/Button.jsx";
import FormInputs from "../../ui/FormInputs.jsx";


const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;


function CreateCabinForm({cabinToEdit = {}, onClose}) {
    const {id: editId, ...editValue} = cabinToEdit;
    const {isCreating, createCabin} = useCreateCabin()
    const {isEditing, editCabin} = useEditCabin()
    const isEditSession = Boolean(editId);

    const {register, handleSubmit, reset, getValues, formState}
        = useForm({
        defaultValues: isEditSession ? editValue : {},
    })
    const {errors} = formState;

    const isWorking = isCreating || isEditing

    function submitHandle(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0]

        if (isEditSession) editCabin({newCabinData: {...data, image}, id: editId}, {
            onSuccess: () => {
                reset();
                onClose?.()

            }

        });
        else createCabin({...data, image: image}, {
            onSuccess: () => {
                reset();
                onClose?.()
            }
        })
    }

    function onError(err) {
        //     console.log(err)
    }

    return (
        <Form onSubmit={handleSubmit(submitHandle, onError)} type={onClose ? "modal" : "regular"}>
            <FormInputs error={errors?.name?.message} label="Cabin name">
                <Input type="text" id="name" {...register("name", {required: "This field is required"})}
                       disabled={isWorking}/>
            </FormInputs>

            <FormInputs error={errors?.maxCapacity?.message} label="Max Capacity">
                <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", {
                    required: "This field is required", min: {
                        value: 1,
                        message: "Capacity should be al least 1"
                    }
                })}/>
            </FormInputs>

            <FormInputs label="Regular price" error={errors?.regularPrice?.message}>
                <Input type="number" disabled={isWorking}
                       id="regularPrice" {...register("regularPrice", {
                    required: "This field is required", min: {
                        value: 1,
                        message: "Capacity should be at least 1"
                    }
                })}/>
            </FormInputs>

            <FormInputs error={errors?.discount?.message} label="Discount">
                <Input type="number" id="discount" disabled={isWorking}
                       defaultValue={0} {...register("discount", {
                    required: "This field is required",
                    validate: (value) => value <= getValues().regularPrice || "Discount should be less then regular price"

                })}/>
            </FormInputs>

            <FormInputs label="Description for website" error={errors?.description?.message}>
                <Textarea type="number" id="description"
                          defaultValue="" {...register("description", {required: "This field is required"})}/>
            </FormInputs>

            <FormInputs label="Cabin photo">
                <FileInput id="image" disabled={isWorking}
                           accept="image/*" {...register("image", {required: isEditSession ? false : "This field is required"})}/>
            </FormInputs>

            <FormRow>
                <Button onClick={() => onClose?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? `Edit Cabin` : `Create new cabin`}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
