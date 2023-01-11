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
        <Icon to="/"  >Return To Home</Icon>
        <FormContent>
          <Form action="#">
            <FormH1>ساخت حساب کاربری</FormH1>
            <FormLabel htmlfor="for">ایمیل</FormLabel>
            <FormInput type="email" required />
            <FormLabel htmlfor="for">نام</FormLabel>
            <FormInput type="text" required />
            <FormLabel htmlfor="for">گذرواژه</FormLabel>
            <FormInput type="password" required />
            <FormButton type="submit">ساخت حساب</FormButton>
           {/* <Text>Forget Password?</Text> */}
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default RegisterForm;
