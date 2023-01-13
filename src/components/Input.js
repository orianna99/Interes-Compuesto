import styled from "styled-components";
import { useField } from "formik";
const Control = styled.div`
    margin-bottom: 20px;
`
const Label = styled.label`
    color: #000;
    display: block;
    margin-bottom: 5px;
`
const MyInput = styled.input`
    outline: none;
    padding: 8px;
    border: solid 1px #ccc;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 5px;
`
const ErrorMesage = styled.div`
    color: red;
`
const Input = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <Control>
            <Label>{label}</Label>
            <MyInput {...field} {...props} />
            {meta.touched && meta.error ? (
                <ErrorMesage>{meta.error}</ErrorMesage>
            ) : null}
        </Control>
    )
}
export default Input