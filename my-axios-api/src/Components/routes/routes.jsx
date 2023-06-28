export const myRoutes = {
    routeBody: "http://localhost:3001",
    routeUser: "/user",
    routeLogin: "/login",
    routeProtect: "/protect",
    routeCreateTickets: "/create-tickets",
    routeTickets: "/tickets",
    routeMyTickets: "/my-tickets",

    routeTicketsId: (id) => {
        return `/tickets/${id}`
    },
    routeMyTicketsId: (id) => {
        return `/my-tickets/${id}`
    },
    routeUpdate: (id) => {
        return `/update/${id}`
    }
};

export default myRoutes;