import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function UserInfoId() {
  const { id } = useSelector((state) => ({
    id: state.user.id,
  }));
  return <b> {id} 님 </b>;
}

export default UserInfoId;
