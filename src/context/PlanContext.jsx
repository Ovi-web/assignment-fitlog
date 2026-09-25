"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to parse local storage data:", e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [plan, saved, isInitialized]);

  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      toast.error("Cap of 5 lifts reached! Complete or remove some first.");
      return false;
    }
    if (plan.some((item) => item.id === workout.id)) {
      toast.info("This workout is already in today's plan.");
      return false;
    }
    setPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success(`"${workout.name || workout.title}" added to today's plan!`);
    return true;
  };

  const addToSaved = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.info("This workout is already saved.");
      return false;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success(`"${workout.name || workout.title}" saved for later!`);
    return true;
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    toast.info("Workout removed from today's plan.");
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.info("Workout removed from saved.");
  };

  const toggleDone = (id) => {
    setPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedState = !item.isDone;
          toast.success(updatedState ? "Workout marked as done!" : "Marked as incomplete.");
          return { ...item, isDone: updatedState };
        }
        return item;
      })
    );
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);