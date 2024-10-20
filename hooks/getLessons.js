import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";

export const GetLessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("lessons")
      .get()
      .then((snapshot) => {
        const lessonsData = snapshot.docs.map((doc) => doc.data());
        setLessons(lessonsData);
      })
      .catch((error) => {
        console.error("Error fetching lessons:", error);
      });
  }, []);

  return lessons;
};
