import { log } from "console";
import styled from "styled-components"

const SimpleSelection = styled.select`
    background-color: white;
    padding: 8px;
    border-radius: 5px;
    color: black;
    border: 1px solid  var(--gray-color);
`
const SimpleSelectionOp = styled.option`
    height: 30px;
    padding: 30px;
`

export type OptionProps = {
    value: string;
    label: string;
}

export default function DropDown(props: {

    style?: object
    items: OptionProps[]

    selectedId?: (value: string) => boolean
    onChange?: (value: string) => void
}) {


    const handleSelectChange = (event: any) => {
        const selectedValue = event.target.value;

        if (props.onChange != null) {
            props.onChange(selectedValue);
        }
    };


    return (<SimpleSelection style={props.style ?? {}} onChange={handleSelectChange} >
        {props.items.map((option: OptionProps, index) => {

            let selected: boolean = props.selectedId == null ? false : props.selectedId(option.value);
            if (selected) {

                return <SimpleSelectionOp key={index} selected value={option.value}>{option.label}</SimpleSelectionOp>
            } else {

                return <SimpleSelectionOp key={index} value={option.value}>{option.label}</SimpleSelectionOp>
            }
        })}
    </SimpleSelection>)
}
