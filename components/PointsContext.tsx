import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PointsState {
  totalPoints: number;
  pointsToday: number;
}

interface PointsContextProps {
  points: PointsState;
  addPoints: (pointsToAdd: number) => void;
}

const PointsContext = createContext<PointsContextProps | undefined>(undefined);

const POINTS_STORAGE_KEY = '@points';
const LAST_RESET_DATE_KEY = '@lastResetDate';
const DAILY_LIMIT = 150;

const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [points, setPointsState] = useState<PointsState>({ totalPoints: 0, pointsToday: 0 });

  useEffect(() => {
    const loadPoints = async () => {
      try {
        const storedPoints = await AsyncStorage.getItem(POINTS_STORAGE_KEY);
        const lastResetDate = await AsyncStorage.getItem(LAST_RESET_DATE_KEY);
        const today = new Date().toDateString();

        if (storedPoints && lastResetDate === today) {
          setPointsState(JSON.parse(storedPoints));
        } else {
          // Reset points if the date is different
          await AsyncStorage.setItem(LAST_RESET_DATE_KEY, today);
          setPointsState({ totalPoints: 0, pointsToday: 0 });
          await AsyncStorage.setItem(POINTS_STORAGE_KEY, JSON.stringify({ totalPoints: 0, pointsToday: 0 }));
        }
      } catch (error) {
        console.error('Failed to load points from AsyncStorage', error);
      }
    };

    loadPoints();
  }, []);

  const addPoints = async (pointsToAdd: number) => {
    try {
      const today = new Date().toDateString();
      let newPoints = { ...points };

      if (pointsToAdd < 0 && points.totalPoints + pointsToAdd < 0) {
        console.warn('Cannot subtract points; total points cannot be less than 0.');
        return;
      }

      if (pointsToAdd > 0 && points.pointsToday + pointsToAdd > DAILY_LIMIT) {
        console.warn(`Cannot exceed daily limit of ${DAILY_LIMIT} points`);
        pointsToAdd = DAILY_LIMIT - points.pointsToday;
      }

      newPoints = {
        totalPoints: points.totalPoints + pointsToAdd,
        pointsToday: points.pointsToday + (pointsToAdd > 0 ? pointsToAdd : 0),
      };

      setPointsState(newPoints);
      await AsyncStorage.setItem(POINTS_STORAGE_KEY, JSON.stringify(newPoints));
    } catch (error) {
      console.error('Failed to save points to AsyncStorage', error);
    }
  };

  return (
    <PointsContext.Provider value={{ points, addPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

const usePoints = (): PointsContextProps => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

export { PointsProvider, usePoints };
