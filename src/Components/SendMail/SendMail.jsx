import React from "react";
import "./SendMail.css";
import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { closeSendMessage } from "../../features/mailSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import firebase from "firebase";

function SendMail() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    db.collection("emails").add({
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    dispatch(closeSendMessage());
  };
  const dispatch = useDispatch();

  return (
    <div className='sendMail'>
      <div className='sendMail__header'>
        <h3>New Message</h3>
        <Close
          onClick={() => dispatch(closeSendMessage())}
          className='sendMail__close'
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          name='to'
          type='email'
          placeholder='To'
          {...register("to", {
            required: "To is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.to && <p className='sendMail__error'>{errors.to.message}</p>}

        <input
          name='subject'
          type='text'
          placeholder='Subject'
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className='sendMail__error'>Subject is Required</p>
        )}

        <input
          name='message'
          type='text'
          placeholder='Message..'
          className='sendMail__message'
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className='sendMail__error'>Message is Required</p>
        )}

        <div className='sendMail__options'>
          <button className='sendMail__send' type='submit'>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
