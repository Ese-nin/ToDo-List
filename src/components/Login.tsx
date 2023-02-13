import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../store/store";
import {Navigate} from "react-router-dom";
import * as Yup from 'yup';
import {login} from "state/auth-reducer";
import {isLoggedInSelector} from "state/selectors";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginPage = () => {

    const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(4, 'Must be 4 characters or more').required('Required'),

        }),
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(login(values))
            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    });

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            variant="standard"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: "crimson"}}>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            variant="standard"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: "crimson"}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}