import React from "react";
import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormWrap,
  Icon,
  Text,
  LoginLink,
} from "./RegisterElements";
import { useForm } from "react-hook-form";
import {useNavigate}  from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("http://127.0.0.1:8000/api/accounts/", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        setIsShown(true);
      });
  };

  return (
    <Container>
      <FormWrap>
        <Icon to="/">Return To Home</Icon>
        <div className="eror-notif">
          <Stack sx={{ width: "100%" }} spacing={2} className="eror">
            <Alert severity="success" sx={{ margin: "20px auto" }}>
              ثبتنام با موفقیت انجام شد
            </Alert>
          </Stack>
        </div>
        <FormContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormH1>ساخت حساب کاربری</FormH1>
            <FormLabel htmlfor="for">ایمیل</FormLabel>
            <FormInput type="email" {...register("username")} required />
            <FormLabel htmlfor="for">First Name</FormLabel>
            <FormInput type="text" {...register("first_name")} required />
            <FormLabel htmlfor="for">Last نام</FormLabel>
            <FormInput type="text" {...register("last_name")} required />
            <FormLabel htmlfor="for">گذرواژه</FormLabel>
            <FormInput type="password" {...register("password")} required />
            <FormButton type="submit">ساخت حساب</FormButton>
            <LoginLink to="/login">ورود</LoginLink>

          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default RegisterForm;
