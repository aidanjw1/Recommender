import React, { useState } from 'react';
import { Paper, ListItem, List, Input, ClickAwayListener } from "@material-ui/core";


const AutoComplete = ({onSelect}) => {

    const [ data, setData ] = useState([]);
    const [ text, setText ] = useState('');
    const [ focus, setFocus ] = useState(false);
    // data = text.length < 3? [] : data.filter(item => item.title.toLowerCase().includes(text.toLowerCase())).slice(0, 10)

    function handleClickAway() {
        // Hacky way of making it work on mobile
        setTimeout(() => {
            setText('');
            setFocus(false)
        },500);
    }
    function handleClickOn() {
        setFocus(true);
    }

    async function queryTMDB(query) {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=7cc441d4c80dc500e03786e94fd81402&language=en-US&query=${query}&page=1&include_adult=false1`);
        const body = await response.json();
        return body['results']; 
    }

    async function handleOnChange(e) {
        setText(e.target.value);
        const matches = await queryTMDB(e.target.value);
        setData(matches);
    }

    return (
        <div style={{ width: '50%', margin: 'auto'}}>
            {/* <ClickAwayListener onClickAway={handleClickAway}> */}
                <Input type="text" placeholder={'Search...'}
                    style={{width: '100%', fontSize: '1.5rem'}}
                    value={text} 
                    onChange={handleOnChange} 
                    onFocus={handleClickOn}
                    onBlur={handleClickAway} />
            {/* </ClickAwayListener> */}
            <Paper style={{position: 'absolute', display: focus? 'block' : 'none', zIndex: 1000 }}>
                <List>
                    {data.map((val, i) => (
                        <ListItem key={i} onClick={() => onSelect(val)} style={{cursor: 'pointer'}}>
                            {val.original_title}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    )
}

export default AutoComplete;