const { ticketRepository } = require("../repositories/ticket-repository");
const ApplicationError = require("../errors/ApplicationError");


exports.createTicket = async (airplane_name, class_id, location_from, location_to, departure_time, arrival_time, airplane_image, status, passengers) => {
    try {
        const ticketPayload = {
            airplane_name,
            class_id,
            location_from,
            location_to,
            departure_time,
            arrival_time,
            airplane_image,
            status,
            passengers,
        };

        const payload = await ticketRepository.createTicket(ticketPayload);

        return {
            id: payload?.id,
            airplane_name: payload?.airplane_name,
            class_id: payload?.class_id,
            location_from: payload?.location_from,
            location_to: payload?.location_to,
            departure_time: payload?.departure_time,
            arrival_time: payload?.arrival_time,
            airplane_image: payload?.airplane_image,
            status: payload?.status,
            passengers: payload?.passengers,
        }
    } catch (error) {
        throw  new ApplicationError(500, "failed insert ticket!");
    }
};

exports.getAllTicket = async () => {
    
    try {
        const payload = await ticketRepository.getAllTicket();
        const ticketPayload = 
            (await payload.length) < 1 ? [] : payload.map((ticket) => {
                return {
                    id: ticket?.dataValues?.id,
                    airplane_name: ticket?.dataValues?.airplane_name,
                    class_id: ticket?.dataValues?.class_id,
                    location_from: ticket?.dataValues?.location_from,
                    location_to: ticket?.dataValues?.location_to,
                    departure_time: ticket?.dataValues?.departure_time,
                    arrival_time: ticket?.dataValues?.arrival_time,
                    airplane_image: ticket?.dataValues?.airplane_image,
                    status: ticket?.dataValues?.status,
                    passengers: ticket?.dataValues?.passengers,
                };
            });
        return ticketPayload;
    } catch (error) {
        throw new ApplicationError(500, "failed get ticket!");
    }
};

exports.getTicketById = async (id) => {
    try {
      const payload = await ticketRepository.getTicketById(id);
      const ticketPayload = {
        id: payload?.id,
        airplane_name: payload?.airplane_name,
        class_id: payload?.class_id,
        location_from: payload?.location_from,
        location_to: payload?.location_to,
        departure_time: payload?.departure_time,
        arrival_time: payload?.arrival_time,
        airplane_image: payload?.airplane_image,
        status: payload?.status,
        passengers: payload?.passengers,
      };
      return ticketPayload;
    } catch (error) {
      throw new ApplicationError(500, "failed get Ticket!");
    }
  };

  // search ticket
//   
exports.getTicketBySearch = async (location_from,location_to, departure_time, arrival_time, passengers) => {
    try{
       const payload = await ticketRepository.getTicketBySearch(location_from,location_to, departure_time, arrival_time, passengers);
       console.log(payload);
       const ticketPayload = 
            (await payload.length) < 1 ? [] : payload.map((ticket) => {
                return {
                    id: ticket?.dataValues?.id,
                    airplane_name: ticket?.dataValues?.airplane_name,
                    class_id: ticket?.dataValues?.class_id,
                    location_from: ticket?.dataValues?.location_from,
                    location_to: ticket?.dataValues?.location_to,
                    departure_time: ticket?.dataValues?.departure_time,
                    arrival_time: ticket?.dataValues?.arrival_time,
                    airplane_image: ticket?.dataValues?.airplane_image,
                    status: ticket?.dataValues?.status,
                    passengers: ticket?.dataValues?.passengers,
                };
            });
        console.log(ticketPayload);
        return ticketPayload;
    } catch (error) {
        throw new ApplicationError(500, "failed get ticket");
    }
};

exports.getDetailTicket = async (ticketId) => {
        try {
          const payload = await ticketRepository.getDetailTicket(ticketId);
          const ticketPayload = {
            id: payload?.id,
            airplane_name: payload?.airplane_name,
            class_id: payload?.class_id,
            location_from: payload?.location_from,
            location_to: payload?.location_to,
            departure_time: payload?.departure_time,
            arrival_time: payload?.arrival_time,
            airplane_image: payload?.airplane_image,
            status: payload?.status,
            passengers: payload?.passengers,
          };
          return ticketPayload;
        } catch (error) {
          throw new ApplicationError(500, "failed get ticket!");
        }
      };
      exports.tes = async (id) => {
        return id;
        }