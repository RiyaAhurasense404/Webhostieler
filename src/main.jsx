import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WishListProvider } from "./context/WishListContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WishListProvider>
          <App />
        </WishListProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

// import { fetchHotelDetail } from "./api/hotelsApi"

// fetchHotels({
//   dest_id: "-2092174",
//   dest_type: "city"
// }).then(data => console.log(data))

// fetchHotelDetail({ hotel_id: "15914332" })
//   .then(data => console.log(data?.data?.block[0]?.block_id))