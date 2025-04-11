export const API_URL = {
    SLOTTIME: {
      GET_SLOT: "/api/slots/list/",
      POST_SLOT: "/api/slots/create/",
      SLOT_PATCH: (id) => `/api/slots/${id}/`,
      SLOT_DELETE: (id) => `/api/slots/${id}/`,
    },
    BOOKING: {
      GET_BOOKING: "/api/bookings/",
      POST_BOOKING: "/api/bookings/create/",
      BOOKING_PATCH: (id) => `/api/bookings/${id}/`,
      BOOKING_DELETE: (id) => `/api/bookings/${id}/`,
    }
}