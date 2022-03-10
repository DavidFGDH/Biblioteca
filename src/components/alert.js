import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector,useDispatch } from 'react-redux'
import {setClose} from '../features/alert/AlertSlice'
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const alert = useSelector((state) => state.alert.status)
    const msg = useSelector((state) => state.alert.msg)
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);

    function change() {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, 6000);
        }).then(function() {
            setOpen(false)
            dispatch(setClose())
        });
    }

    React.useEffect(()=>{
        if(alert!==0){
            setOpen(true)
        }else{
            setOpen(false)
        }
        change()
    },[alert])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        dispatch(setClose())

    };

    return (
        <>
        {alert === 1 && (
        <Stack spacing={2} sx={{width: '100%'}}>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>

                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        {msg}
                    </Alert>

            </Snackbar>

        </Stack>
        )}
            {alert === 2 && (
                <Stack spacing={2} sx={{width: '100%'}}>

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>

                        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                            {msg}
                        </Alert>

                    </Snackbar>

                </Stack>
            )}
        </>
    );
}