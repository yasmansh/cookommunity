import { useEffect, useState, React } from "react";
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
} from "./SigninElements";
import axios from "axios";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const SigninForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert(data.username);

    axios
      .post("http://127.0.0.1:8000/api/accounts/login", JSON.stringify(data), {
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
            Login Success
          </Alert>
        </Stack>
        <FormContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormH1>Sign in to your account</FormH1>
            <FormLabel htmlfor="for">Email</FormLabel>
            <FormInput
              type="email"
              name="email"
              {...register("username")}
              required
            />
            <FormLabel htmlfor="for">Password</FormLabel>
            <FormInput
              type="password"
              name="password"
              {...register("password")}
              required
            />
            <FormButton type="submit">Sign in</FormButton>
            <Text>Forget Password?</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SigninForm;
