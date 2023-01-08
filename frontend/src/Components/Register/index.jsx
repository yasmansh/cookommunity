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
} from "./RegisterElements";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert(data.username);

    axios
      .post("http://127.0.0.1:8000/api/accounts/", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  return (
    <Container>
      <FormWrap>
        <Icon to="/">Return To Home</Icon>
        <Stack sx={{ width: "100%" }} spacing={2} class="eror">
          <Alert severity="success" sx={{ margin: "20px auto" }}>
            Register Success
          </Alert>
        </Stack>
        <FormContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormH1>Register your account</FormH1>
            <FormLabel htmlfor="for">Email</FormLabel>
            <FormInput type="email" {...register("username")} required />
            <FormLabel htmlfor="for">First Name</FormLabel>
            <FormInput type="text" {...register("first_name")} required />
            <FormLabel htmlfor="for">Last Name</FormLabel>
            <FormInput type="text" {...register("last_name")} required />
            <FormLabel htmlfor="for">Password</FormLabel>
            <FormInput type="password" {...register("password")} required />
            <FormButton type="submit">Sign in</FormButton>
            <Text>Forget Password?</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default RegisterForm;
