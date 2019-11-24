import React, { useState } from 'react';
import { Paper, ListItem, List, Input, ClickAwayListener } from "@material-ui/core";


const AutoComplete = ({data, onSelect}) => {

    const [ text, setText ] = useState('');
    const [ focus, setFocus ] = useState(false);
    data = text.length < 3? [] : data.filter(item => item.title.toLowerCase().includes(text.toLowerCase())).slice(0, 10)

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

    return (
        <div style={{ width: '50%', margin: 'auto'}}>
            {/* <ClickAwayListener onClickAway={handleClickAway}> */}
                <Input type="text" placeholder={'Search...'}
                    style={{width: '100%', fontSize: '1.5rem'}}
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    onFocus={handleClickOn}
                    onBlur={handleClickAway} />
            {/* </ClickAwayListener> */}
            <Paper style={{position: 'absolute', display: focus? 'block' : 'none', zIndex: 1000 }}>
                <List>
                    {data.map((val, i) => (
                        <ListItem key={i} onClick={() => onSelect(val)} style={{cursor: 'pointer'}}>
                            {val.title}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    )
}

export default AutoComplete;