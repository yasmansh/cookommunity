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

const RegisterForm = () => {
  return (
    <Container>
      <FormWrap>
        <Icon to="/">Return To Home</Icon>
        <FormContent>
          <Form action="#">
            <FormH1>Register your account</FormH1>
            <FormLabel htmlfor="for">Email</FormLabel>
            <FormInput type="email" required />
            <FormLabel htmlfor="for">Name</FormLabel>
            <FormInput type="text" required />
            <FormLabel htmlfor="for">Password</FormLabel>
            <FormInput type="password" required />
            <FormButton type="submit">Sign in</FormButton>
            <Text>Forget Password?</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default RegisterForm;
