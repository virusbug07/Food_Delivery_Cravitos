import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import foodItemsData from "./fooditems.json"; // Update the path
import { actionType } from "./context/reducer";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {
    // Simulate fetching data from JSON file
    dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems: foodItemsData.foodItems,
    });
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
