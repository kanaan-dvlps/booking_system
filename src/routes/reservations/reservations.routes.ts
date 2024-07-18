import { Router } from "express";
import { getReservationByIdController, getReservationsByGuestIdController, getReservationsByPropertyIdController, getReservationsController, updateReservationDateController, createReservationController, deleteReservationController } from "../../controllers/reservations/reservations.controller";
import { ApiMessages } from "../../constants/api.messages";
import { IReturnReservation, IReservation, IReturnReservations } from "../../interfaces/reservations.interface";
import Joi from "joi";
import { authenticateJWT } from "../../middleware/auth";
import { IExtendedRequest } from "../../interfaces/extendedRequest.interface";


const router = Router();

router.get("/", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const reservations = await getReservationsController();
    res.status(200).json({
      type: ApiMessages.SUCCESS,
      response: reservations
    });
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.get("/:id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Id is required"
      });
    } else {
      const reservation = await getReservationByIdController(id);
      if (!reservation) {
        res.status(404).json({
          type: ApiMessages.NOT_FOUND,
          response: "Reservation not found"
        });
      } else {
        res.status(200).json({
          type: ApiMessages.SUCCESS,
          response: reservation
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.get("/guest/:user_id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "User id is required"
      });
    } else {
      const reservations = await getReservationsByGuestIdController(user_id);
      res.status(200).json({
        type: ApiMessages.SUCCESS,
        response: reservations
      });
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.get("/property/:property_id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { property_id } = req.params;
    if (!property_id) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Property id is required"
      });
    } else {
      const reservations = await getReservationsByPropertyIdController(property_id);
      res.status(200).json({
        type: ApiMessages.SUCCESS,
        response: reservations
      });
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.post("/", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { start_date, end_date, property_id, user_id } = req.body;
    const schema = Joi.object({
      property_id: Joi.string().required(),
      user_id: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: error.message
      });
    } else {

      const reservationBody = { 
        start_date, 
        end_date, 
        property_id, 
        user_id 
      } as IReservation;

      const createdReservation = await createReservationController(reservationBody);
      res.status(201).json({
        type: ApiMessages.SUCCESS,
        response: createdReservation
      });
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.put("/:id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { id } = req.params;
    const { start_date, end_date } = req.body;

    const schema = Joi.object({
      start_date: Joi.date().required(),
      end_date: Joi.date().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: error.message
      });
    } else {
      const updatedReservationDate = { 
        start_date, 
        end_date 
      } as Partial<IReservation>;

      const updatedReservation = await updateReservationDateController(id, updatedReservationDate);
      res.status(200).json({
        type: ApiMessages.SUCCESS,
        response: updatedReservation
      });
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.delete("/:id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { id } = req.params;
    await deleteReservationController(id);
    res.status(204).json({
      type: ApiMessages.SUCCESS,
      response: "Reservation deleted"
    });
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

export default router;
