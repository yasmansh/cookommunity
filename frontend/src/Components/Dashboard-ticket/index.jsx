import React from "react";
import { Container} from "./Dash-promotion";
import DashboardSidebar from "../Dashboard/Dash-sidebar";
import DashboardHeader from "../Dashboard/Dash-header";
import "./dash-promotion.css";
const DashPromotionComponent = () => {
  return (
    <Container>
      <DashboardSidebar />
      <DashboardHeader />
      <div class="content-edit">
      <p class="content-promotion"> DD علی به سایت ما خوش آمدی</p>
      <h2 class="content-promotion">درخواست ارتقای حساب کاربری</h2>
      <p class="content-promotion"> در صورت درخواست هزینه 100 هزار تومن از حساب شما کسر شده و جزو اعضای ویژه ی سایت قرار خواهید گرفت</p>
        <div class="d-button"><button type="button" class="f-button">ثبت نام</button></div>
        </div>
    </Container>
  );
};

export default DashPromotionComponent;
