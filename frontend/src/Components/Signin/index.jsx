import React from "react";
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon, Text } from "./SigninElements";

const SigninForm = () => {
  return (
    <Container>
      <FormWrap>
        <Icon to="/" >بازگشت به صفحه اصلی</Icon>
        <FormContent>
          <Form action="#">
            <FormH1>ورود به حساب کاربری</FormH1>
            <FormLabel htmlfor="for">ایمیل</FormLabel>
            <FormInput type="email" required />
            <FormLabel htmlfor="for">گذرواژه</FormLabel>
            <FormInput type="password" required />
            <FormButton type="submit">ورود</FormButton>
            <Text>گذرواژه خود را فراموش کردید؟</Text>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SigninForm;
