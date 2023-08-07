import styled from "styled-components"

const SimpleSelection = styled.select`
    background-color: white;
    padding: 8px;
    border-radius: 5px;
    color: black;
    border: 1px solid  var(--gray-color);
`
const SimpleSelectionOp = styled.option``

type OptionProps<T> = {
    value: T;
    label: string;
}

export default function DropDown<T>(props: {
    items: OptionProps<T>[]
    onChange?: (value: T) => void
}) {

    function handleChanges(value: T) {
        if (props.onChange != null) {
            props.onChange(value);
        }
    }

    return (<SimpleSelection >
        {props.items.map((option: OptionProps<T>, index) => {
            return <SimpleSelectionOp key={index} onClick={() => console.log("Teset")
            } value={option.label}>{option.label}</SimpleSelectionOp>
        })}
    </SimpleSelection>)
}
