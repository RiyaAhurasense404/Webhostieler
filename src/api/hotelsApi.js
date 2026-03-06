import axiosInstance from "./axiosInstance"

export const fetchAutoComplete = async (query) => {
  const response = await axiosInstance.get("/hotels/search/autocomplete", {
    params: {
      query: query,
    },
  });
  return response.data;
};

export const fetchHotels = async ({
  dest_id,
  dest_type,
  checkin_date,
  checkout_date,
}) => {
  const response = await axiosInstance.get("/hotels/search/by-dest", {
    params: {
      dest_id,
      dest_type,
      checkin_date,
      checkout_date,
      adults: 2,
      currency_code: "USD",
    },
  });
  return response.data;
};


export const fetchHotelDetail = async ({ hotel_id, checkin_date, checkout_date }) => {
  const response = await axiosInstance.get("/hotels/detail", {
    params: {
      hotel_id,
      checkin_date,
      checkout_date,
      adults: 2,
      currency_code: "USD"
    }
  })
  return response.data
}

export const bookHotel = async ({ hotel_id, blockIds, checkin_date, checkout_date }) => {
  const response = await axiosInstance.get("/hotels/detail/book-process-info", {
    params: {
      hotel_id,
      blockIds,
      checkin_date,
      checkout_date,
      adults: 2,
      currency_code: "USD"
    }
  })
  return response.data
}