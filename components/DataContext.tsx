import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DataContext = createContext<any>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState({ imageUri: "", dustbinInfo: null });
  const [lcURL, setlcURL] = useState("192.168.1.2:8000");

  useEffect(() => {
    const loadLcURL = async () => {
      try {
        const storedURL = await AsyncStorage.getItem("lcURL");
        if (storedURL) {
          setlcURL(storedURL);
        }
      } catch (error) {
        console.error("Failed to load lcURL from storage", error);
      }
    };

    loadLcURL();
  }, []);

  useEffect(() => {
    const saveLcURL = async () => {
      try {
        await AsyncStorage.setItem("lcURL", lcURL);
      } catch (error) {
        console.error("Failed to save lcURL to storage", error);
      }
    };

    saveLcURL();
  }, [lcURL]);

  return (
    <DataContext.Provider value={{ data, setData, lcURL, setlcURL }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);