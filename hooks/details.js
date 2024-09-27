import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useUser, useAuth } from "@clerk/clerk-react";

export const useDetails = () => {
  const { user, isSignedIn } = useUser();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const retrieveUserDetails = async () => {
      if (!isSignedIn || !user) return;
      try {
        const firebaseToken = await getToken({
          template: "integration_firebase",
        });
        await firebase.auth().signInWithCustomToken(firebaseToken);
        const db = firebase.firestore();
        const userDoc = db.collection("users").doc(user.id);
        const docSnapshot = await userDoc.get();

        if (docSnapshot.exists) {
          setUserData(docSnapshot.data());
        } else {
          // Optional: Create document if it doesn't exist
          const newUserDetails = {
            username: user.username || "New User",
            email: user.primaryEmailAddress?.emailAddress,
            photoURL: user.imageUrl || "",
            hasPhoto: !!user.imageUrl,
            inProgress: [],
            completed: [],
          };
          await userDoc.set(newUserDetails, { merge: true });
          setUserData(newUserDetails);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching user details:", error);
      }
    };

    retrieveUserDetails();
  }, [user, isSignedIn, getToken]);

  return { userData, error };
};
