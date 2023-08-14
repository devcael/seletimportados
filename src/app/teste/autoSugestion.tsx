import React, { useState } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams, SuggestionSelectedEventData } from 'react-autosuggest';

const suggestions = [
    'Maçã',
    'Banana',
    'Laranja',
    'Abacaxi',
    'Pera',
    // ... adicione mais sugestões aqui
];

const AutoSuggestInput: React.FC = () => {
    const [value, setValue] = useState('');
    const [suggestionsList, setSuggestionsList] = useState<string[]>([]);

    const getSuggestions = (inputValue: string) => {
        return suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const onSuggestionChange = (_: React.FormEvent, { newValue }: Autosuggest.ChangeEvent) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
        setSuggestionsList(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestionsList([]);
    };

    const onSuggestionSelected = (_: React.FormEvent, { suggestion }: SuggestionSelectedEventData<string>) => {
        setValue(suggestion);
    };

    return (
        <Autosuggest
            suggestions={suggestionsList}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={suggestion => suggestion}
            renderSuggestion={suggestion => <div>{suggestion}</div>}
            inputProps={{
                placeholder: 'Digite algo...',
                value,
                onChange: onSuggestionChange,
            }}
            onSuggestionSelected={onSuggestionSelected}
        />
    );
};

export default AutoSuggestInput;
