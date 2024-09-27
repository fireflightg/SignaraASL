import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useEffect, useState } from "react";

export const GetLessons = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const db = firebase.firestore();
        
        const retrieveUserDetails = async () => {
            const tempDetails = [];
            try {
                const querySnapshot = await db.collection("lessons").get();
                querySnapshot.forEach((doc) => {
                    tempDetails.push({ id: doc.id, ...doc.data() });
                    console.log(doc.id, " => ", doc.data());
                });
                setLessons(tempDetails);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            }
        };

        retrieveUserDetails();
    }, []);

    return lessons;
};
