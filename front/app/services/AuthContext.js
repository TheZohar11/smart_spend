// import React, { createContext, useState, useEffect, useContext } from 'react';
// import api and secure storage files
/*
AuthContext: האובייקט שמחזיק את המידע הגלובלי.

useState (user, isLoading): שומר את פרטי המשתמש ואת מצב הטעינה של האפליקציה.

useEffect (Check if logged in): בטעינה הראשונה של האפליקציה, בודק אם יש accessToken ב-Storage. אם כן – מעדכן את ה-State שהמשתמש מחובר.

signIn(credentials): פונקציה שקוראת ל-API, מקבלת טוקנים, שומרת אותם ב-Storage דרך הקובץ הראשון, ומעדכנת את ה-State.

signOut(): מנקה את ה-Storage ומאפסת את ה-State ל-null.
*/
