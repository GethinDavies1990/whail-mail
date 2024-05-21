import React, { useEffect, useState } from "react";
import "./EmailList.css";
import Section from "../MailComponent/Section";
import EmailRow from "./EmailRow";
import {
  ArrowDropDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
  KeyboardHide,
  LocalOffer,
  More,
  People,
  Redo,
  Settings,
} from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { db } from "../../firebase";

function EmailList() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    db.collection("emails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setEmails(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );
  }, []);

  return (
    <div className='emailList'>
      <div className='emailList__settings'>
        <div className='emailList__settingsLeft'>
          <CheckBoxOutlineBlankIcon />
          <ArrowDropDown />
          <Redo />
          <More />
        </div>
        <div className='emailList__settingsRight'>
          <ChevronLeft />
          <ChevronRight />
          <KeyboardHide />
          <Settings />
        </div>
      </div>
      <div className='emailList__sections'>
        <Section Icon={Inbox} title='Primary' color='#5fa8d3' selected />
        <Section Icon={People} title='Social' color='pink' selected />
        <Section
          Icon={LocalOffer}
          title='Promotions'
          color='lightgreen'
          selected
        />
      </div>
      <div className='emailList__list'>
        <EmailRow
          title='Twitch'
          subject='Hello fellow streamer'
          description='This is a test, blah blah blah, This is a test, blah blah blahThis is a test, blah blah blahThis is a test, blah blah blah '
          time='10pm'
        />
      </div>
    </div>
  );
}

export default EmailList;
